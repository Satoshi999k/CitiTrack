const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const User = require('../models/User');

// Get dashboard statistics
router.get('/dashboard-stats', async (req, res) => {
  try {
    // Total issues count
    const totalIssues = await Issue.countDocuments();

    // Issues by status
    const issuesByStatus = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Issues by category
    const issuesByCategory = await Issue.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Issues by priority
    const issuesByPriority = await Issue.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    // Total users count
    const totalUsers = await User.countDocuments();

    // Users by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent issues (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentIssues = await Issue.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Issues trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const issuesTrend = await Issue.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Status breakdown percentage
    const statusBreakdown = issuesByStatus.map((item) => ({
      name: item._id || 'unknown',
      value: item.count,
    }));

    // Category breakdown
    const categoryBreakdown = issuesByCategory.map((item) => ({
      name: item._id || 'unknown',
      value: item.count,
    }));

    // Priority breakdown
    const priorityBreakdown = issuesByPriority.map((item) => ({
      name: item._id || 'unknown',
      value: item.count,
    }));

    // Role breakdown
    const roleBreakdown = usersByRole.map((item) => ({
      name: item._id || 'unknown',
      count: item.count,
    }));

    res.json({
      totalIssues,
      totalUsers,
      recentIssues,
      statusBreakdown,
      categoryBreakdown,
      priorityBreakdown,
      roleBreakdown,
      issuesTrend: issuesTrend.map((item) => ({
        date: item._id,
        issues: item.count,
      })),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Get all issues with filters
router.get('/issues', async (req, res) => {
  try {
    const { status, category, priority, limit = 10, page = 1 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const skip = (page - 1) * limit;

    const issues = await Issue.find(filter)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Issue.countDocuments(filter);

    res.json({
      issues,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { role, limit = 10, page = 1 } = req.query;
    const filter = {};

    if (role) filter.role = role;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update issue status
router.put('/issues/:id', async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const issue = await Issue.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate('submittedBy', 'name email');

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ error: 'Failed to update issue' });
  }
});

// Get issue details
router.get('/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('submittedBy', 'name email phone address')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email');

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Error fetching issue:', error);
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
});

module.exports = router;
