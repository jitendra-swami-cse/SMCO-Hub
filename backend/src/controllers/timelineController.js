const Content = require('../models/Content');

const getTimelineEvents = async (req, res) => {
  try {
    const { clientId, platformId, status } = req.query;

    // Build the query for Content
    const query = {
      deletedAt: { $exists: false }
    };

    if (clientId) {
      query.clientId = clientId;
    }

    // Fetch matching content, populate required fields
    const contents = await Content.find(query)
      .populate('clientId', 'personalInfo.fullName')
      .populate('platforms.platformId', 'name icon');

    // Unwind platforms into individual events
    const events = [];

    contents.forEach(content => {
      content.platforms.forEach(platform => {
        // Skip platforms without a scheduled date unless they are uploaded 
        // (but even uploaded should have an uploadedDate, we can use that as fallback)
        const eventDate = platform.scheduledDate || platform.uploadedDate;
        
        if (!eventDate) return;

        // Apply filters
        if (platformId && platform.platformId?._id.toString() !== platformId) return;
        if (status && platform.status !== status) return;

        events.push({
          contentId: content._id,
          title: content.title,
          clientId: content.clientId?._id,
          clientName: content.clientId?.personalInfo?.fullName || 'Unknown',
          platformId: platform.platformId?._id,
          platformName: platform.platformId?.name || 'Unknown',
          platformIcon: platform.platformId?.icon || '📱',
          status: platform.status,
          scheduledDate: eventDate,
        });
      });
    });

    // Sort chronologically (oldest to newest, or newest to oldest?)
    // Let's sort oldest to newest since it's a calendar/timeline
    events.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getTimelineEvents
};
