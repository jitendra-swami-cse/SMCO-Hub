const Client = require('../models/Client');
const Content = require('../models/Content');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

const globalSearch = async (req, res) => {
  try {
    const query = req.query.q;
    
    // Safety check: minimum 2 characters (also enforced on frontend, but good defensive coding)
    if (!query || query.length < 2) {
      return res.json({ success: true, data: { clients: [], content: [], accounts: [] } });
    }

    // Build the regex for case-insensitive search
    const regex = new RegExp(query, 'i');

    // 1. Resolve Categories and Tags first (for Client search)
    const [matchingCategories, matchingTags] = await Promise.all([
      Category.find({ name: regex }).select('_id'),
      Tag.find({ name: regex }).select('_id')
    ]);

    const categoryIds = matchingCategories.map(c => c._id);
    const tagIds = matchingTags.map(t => t._id);

    // 2. Parallel Search
    //    We separate Client and Accounts logic slightly during processing, 
    //    but they both come from the Client model.
    const [clientsRaw, content] = await Promise.all([
      Client.find({
        $or: [
          { 'personalInfo.fullName': regex },
          { 'personalInfo.email': regex },
          { 'personalInfo.phone': regex },
          { categoryId: { $in: categoryIds } },
          { tagIds: { $in: tagIds } },
          // Match accounts for account search extraction
          { 'accounts.username': regex },
          { 'accounts.credential.recoveryEmail': regex }
        ],
        isArchived: false // Don't search archived clients by default
      })
      .populate('categoryId', 'name')
      .populate('tagIds', 'name')
      .populate('accounts.platformId', 'name icon'),

      Content.find({
        $or: [
          { title: regex },
          { caption: regex },
          { 'hashtags': regex },
          { 'source.value': regex },
          { type: regex }
        ],
        deletedAt: { $exists: false } // Don't search recycle bin
      })
      .populate({ path: 'clientId', select: 'personalInfo.fullName' })
      .populate({ path: 'platforms.platformId', select: 'name icon' })
      .limit(20) // Cap results for performance
    ]);

    // 3. Process Client Results (Split into Clients vs Accounts)
    const clients = [];
    const accounts = [];

    clientsRaw.forEach(client => {
      let isClientMatch = false;

      // Check if the client itself matches
      if (
        regex.test(client.personalInfo.fullName) ||
        (client.personalInfo.email && regex.test(client.personalInfo.email)) ||
        (client.personalInfo.phone && regex.test(client.personalInfo.phone)) ||
        (client.categoryId && regex.test(client.categoryId.name)) ||
        (client.tagIds && client.tagIds.some(t => regex.test(t.name)))
      ) {
        isClientMatch = true;
      }

      if (isClientMatch) {
        clients.push({
          _id: client._id,
          name: client.personalInfo.fullName,
          category: client.categoryId?.name || null,
          status: client.status
        });
      }

      // Check for account matches
      if (client.accounts && client.accounts.length > 0) {
        client.accounts.forEach(account => {
          if (
            regex.test(account.username) ||
            (account.credential?.recoveryEmail && regex.test(account.credential.recoveryEmail))
          ) {
            accounts.push({
              _id: account.accountId,
              clientId: client._id,
              clientName: client.personalInfo.fullName,
              username: account.username,
              platformName: account.platformId?.name || 'Unknown',
              platformIcon: account.platformId?.icon || '📱'
            });
          }
        });
      }
    });

    // 4. Format Content Results
    const formattedContent = content.map(c => {
      const platformNames = c.platforms.length > 0 
        ? c.platforms.map(p => p.platformId?.name).filter(Boolean).join(', ')
        : 'No Platforms';

      return {
        _id: c._id,
        title: c.title,
        clientName: c.clientId?.personalInfo?.fullName || 'Unknown',
        platforms: platformNames,
        type: c.type
      };
    });

    res.json({
      success: true,
      data: {
        clients: clients.slice(0, 10), // Limit arrays
        content: formattedContent,
        accounts: accounts.slice(0, 10)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  globalSearch
};
