const fs = require('fs');
const path = require('path');
const Client = require('../models/Client');
const Content = require('../models/Content');
const ActivityLog = require('../models/ActivityLog');
const { STORAGE_ROOT } = require('../utils/storageUtils');

// Helper: Calculate directory size recursively
const getDirSize = (dirPath) => {
  let size = 0;
  if (!fs.existsSync(dirPath)) return 0;
  
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }
  return size;
};

// Helper: Format bytes to human readable
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // 1. Fetch raw data in parallel
    const [
      activeClients,
      allContent,
      recentActivity
    ] = await Promise.all([
      Client.find({ status: 'Active' }).populate('accounts.platformId', 'name icon'),
      Content.find({ deletedAt: { $exists: false } })
        .populate('clientId', 'personalInfo.fullName')
        .populate('platforms.platformId', 'name icon'),
      ActivityLog.find().sort({ createdAt: -1 }).limit(10).populate('clientId', 'personalInfo.fullName')
    ]);

    // 2. Process KPIs & Widgets
    let readyContentCount = 0;
    let scheduledThisWeekCount = 0;
    
    const upcomingContent = [];
    const missedPosts = [];
    const agingContent = {
      '0-7 days': 0,
      '8-30 days': 0,
      '30+ days': 0
    };

    allContent.forEach(content => {
      // Ready Content = globalStatus is Approved OR any platform is Scheduled
      const isApproved = content.globalStatus === 'Approved';
      const hasScheduled = content.platforms.some(p => p.status === 'Scheduled');
      
      if (isApproved || hasScheduled) {
        readyContentCount++;
      }

      // Content Aging (Received but not uploaded)
      if (content.globalStatus === 'Received') {
        const diffTime = Math.abs(today - new Date(content.receivedDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) agingContent['0-7 days']++;
        else if (diffDays <= 30) agingContent['8-30 days']++;
        else agingContent['30+ days']++;
      }

      // Process timeline events for Upcoming, Scheduled This Week, and Missed
      content.platforms.forEach(platform => {
        if (!platform.scheduledDate) return;
        
        const eventDate = new Date(platform.scheduledDate);
        eventDate.setHours(0, 0, 0, 0);

        const event = {
          contentId: content._id,
          title: content.title,
          clientId: content.clientId?._id,
          clientName: content.clientId?.personalInfo?.fullName || 'Unknown',
          platformId: platform.platformId?._id,
          platformName: platform.platformId?.name || 'Unknown',
          platformIcon: platform.platformId?.icon || '📱',
          status: platform.status,
          scheduledDate: platform.scheduledDate,
        };

        if (eventDate < today && platform.status !== 'Uploaded') {
          missedPosts.push(event);
        } else if (eventDate >= today && platform.status === 'Scheduled') {
          upcomingContent.push(event);
          if (eventDate < nextWeek) {
            scheduledThisWeekCount++;
          }
        }
      });
    });

    // Sort timeline widgets chronologically
    upcomingContent.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
    missedPosts.sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate)); // Most recently missed first

    // 3. Process Client Health & Platform Completion
    const healthAlerts = [];
    const platformCounts = {}; // platformName -> count
    
    activeClients.forEach(client => {
      // Health Alerts
      if (client.rating < 5) {
        healthAlerts.push({
          clientId: client._id,
          name: client.personalInfo.fullName,
          score: client.rating
        });
      }

      // Platform Completion Matrix
      // Track which unique platforms this client has configured
      const configuredPlatforms = new Set();
      client.accounts.forEach(acc => {
        if (acc.platformId && acc.platformId.name) {
          configuredPlatforms.add(acc.platformId.name);
        }
      });

      configuredPlatforms.forEach(pName => {
        platformCounts[pName] = (platformCounts[pName] || 0) + 1;
      });
    });

    // Format Platform Completion
    const platformCompletion = Object.keys(platformCounts).map(name => ({
      name,
      configured: platformCounts[name],
      total: activeClients.length
    })).sort((a, b) => b.configured - a.configured); // Sort highest first

    healthAlerts.sort((a, b) => a.score - b.score); // Lowest health first

    // 4. Calculate Storage
    const totalBytes = getDirSize(STORAGE_ROOT);
    const storageUsed = formatBytes(totalBytes);

    // 5. Build Response
    res.json({
      success: true,
      data: {
        kpis: {
          activeClients: activeClients.length,
          readyContent: readyContentCount,
          scheduledThisWeek: scheduledThisWeekCount,
          missedPosts: missedPosts.length,
          storageUsed
        },
        upcomingContent: upcomingContent.slice(0, 10), // Limit dashboard view to next 10
        missedPosts: missedPosts.slice(0, 10),
        healthAlerts: healthAlerts.slice(0, 10),
        agingContent: [
          { label: '0-7 days', count: agingContent['0-7 days'] },
          { label: '8-30 days', count: agingContent['8-30 days'] },
          { label: '30+ days', count: agingContent['30+ days'] }
        ],
        platformCompletion: platformCompletion.slice(0, 6),
        recentActivity: recentActivity.map(log => ({
          _id: log._id,
          type: log.type,
          description: log.description,
          clientName: log.clientId?.personalInfo?.fullName,
          createdAt: log.createdAt
        }))
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getDashboardStats
};
