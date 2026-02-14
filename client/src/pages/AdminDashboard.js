import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Assessment,
  TrendingUp,
  CheckCircle,
  People,
  Menu,
  Close,
  Logout,
  Search,
  DarkMode,
  Brightness7,
} from '@mui/icons-material';
import './AdminDashboard.css';

// Mock data for development
const mockStats = {
  totalIssues: 156,
  totalUsers: 48,
  inProgress: 67,
  resolved: 44,
  statusBreakdown: [
    { name: 'Submitted', value: 45 },
    { name: 'In Progress', value: 67 },
    { name: 'Resolved', value: 44 },
  ],
  categoryBreakdown: [
    { name: 'Road Damage', value: 52 },
    { name: 'Drainage', value: 38 },
    { name: 'Streetlight', value: 41 },
    { name: 'Public Facility', value: 25 },
  ],
  priorityBreakdown: [
    { name: 'Low', value: 28 },
    { name: 'Medium', value: 61 },
    { name: 'High', value: 45 },
    { name: 'Critical', value: 22 },
  ],
  roleBreakdown: [
    { name: 'Citizen', value: 38 },
    { name: 'Staff', value: 7 },
    { name: 'Admin', value: 3 },
  ],
  issuesTrend: [
    { date: 'Feb 8', issues: 8 },
    { date: 'Feb 9', issues: 12 },
    { date: 'Feb 10', issues: 5 },
    { date: 'Feb 11', issues: 15 },
    { date: 'Feb 12', issues: 9 },
    { date: 'Feb 13', issues: 18 },
    { date: 'Feb 14', issues: 11 },
  ],
  issues: [
    { id: 1, title: 'Pothole on Main Street', status: 'In Progress', priority: 'High', category: 'Road Damage', date: '2026-02-12', reporter: 'John Smith' },
    { id: 2, title: 'Broken drainage pipe', status: 'Resolved', priority: 'Critical', category: 'Drainage', date: '2026-02-10', reporter: 'Jane Doe' },
    { id: 3, title: 'Street light not working', status: 'Submitted', priority: 'Medium', category: 'Streetlight', date: '2026-02-14', reporter: 'Bob Johnson' },
    { id: 4, title: 'Damaged park bench', status: 'In Progress', priority: 'Low', category: 'Public Facility', date: '2026-02-13', reporter: 'Alice Brown' },
    { id: 5, title: 'Deep hole in sidewalk', status: 'Submitted', priority: 'High', category: 'Road Damage', date: '2026-02-14', reporter: 'Carol White' },
    { id: 6, title: 'Flooding near bridge', status: 'In Progress', priority: 'Critical', category: 'Drainage', date: '2026-02-11', reporter: 'David Lee' },
    { id: 7, title: 'Multiple lights out', status: 'Resolved', priority: 'Medium', category: 'Streetlight', date: '2026-02-09', reporter: 'Eva Martinez' },
    { id: 8, title: 'Graffiti on public walls', status: 'Submitted', priority: 'Low', category: 'Public Facility', date: '2026-02-14', reporter: 'Frank Wilson' },
  ],
  users: [
    { id: 1, name: 'John Smith', email: 'john@gmail.com', role: 'Citizen', joinDate: '2025-12-15', status: 'Active', issuesReported: 5 },
    { id: 2, name: 'Jane Doe', email: 'jane@gmail.com', role: 'Citizen', joinDate: '2025-11-20', status: 'Active', issuesReported: 8 },
    { id: 3, name: 'Bob Johnson', email: 'bob@gmail.com', role: 'Staff', joinDate: '2025-10-10', status: 'Active', issuesAssigned: 12 },
    { id: 4, name: 'Alice Brown', email: 'alice@gmail.com', role: 'Citizen', joinDate: '2026-01-05', status: 'Active', issuesReported: 3 },
    { id: 5, name: 'Carol White', email: 'carol@gmail.com', role: 'Staff', joinDate: '2025-09-15', status: 'Active', issuesAssigned: 18 },
    { id: 6, name: 'David Lee', email: 'david@gmail.com', role: 'Citizen', joinDate: '2025-12-25', status: 'Inactive', issuesReported: 2 },
    { id: 7, name: 'Eva Martinez', email: 'eva@gmail.com', role: 'Citizen', joinDate: '2026-01-10', status: 'Active', issuesReported: 6 },
    { id: 8, name: 'Frank Wilson', email: 'frank@gmail.com', role: 'Admin', joinDate: '2025-08-01', status: 'Active', issuesAssigned: 25 },
  ],
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(mockStats);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIssueModal, setSelectedIssueModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilterRole, setUserFilterRole] = useState('All');
  const [userFilterStatus, setUserFilterStatus] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('adminTheme');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('adminTheme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStatusUpdate = (issueId, newStatus) => {
    setStats(prevStats => ({
      ...prevStats,
      issues: prevStats.issues.map(issue =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    }));
  };

  const getFilteredIssues = () => {
    return stats.issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.reporter.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || issue.status === filterStatus;
      const matchesPriority = filterPriority === 'All' || issue.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return '#f59e0b';
      case 'In Progress': return '#3b82f6';
      case 'Resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return '#dc2626';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getFilteredUsers = () => {
    return stats.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
      const matchesRole = userFilterRole === 'All' || user.role === userFilterRole;
      const matchesStatus = userFilterStatus === 'All' || user.status === userFilterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return '#dc2626';
      case 'Staff': return '#3b82f6';
      case 'Citizen': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getUserStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#10b981';
      case 'Inactive': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`admin-dashboard-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <img src="/images/cititracklogo.png" alt="CitiTrack Logo" className="sidebar-logo" />
            CitiTrack
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('overview');
              setSidebarOpen(false);
            }}
          >
            <Assessment />
            Overview
          </button>
          <button
            className={`sidebar-item ${activeTab === 'issues' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('issues');
              setSidebarOpen(false);
            }}
          >
            <TrendingUp />
            Issues
          </button>
          <button
            className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('users');
              setSidebarOpen(false);
            }}
          >
            <People />
            Users
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item logout-btn" onClick={handleLogout}>
            <Logout />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {/* Header */}
        <header className="admin-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <Close /> : <Menu />}
          </button>
          <h1 className="page-title">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'issues' && 'Issues Management'}
            {activeTab === 'users' && 'Users Management'}
          </h1>
          <div className="header-spacer"></div>
          <button className="theme-toggle-btn" onClick={toggleTheme} title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
            {isDarkMode ? <Brightness7 /> : <DarkMode />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="admin-main-area">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-container">
              {/* KPI Cards */}
              <div className="kpi-grid">
                <div className="kpi-card kpi-1">
                  <div className="kpi-icon">
                    <Assessment />
                  </div>
                  <div className="kpi-content">
                    <div className="kpi-value">{stats.totalIssues}</div>
                    <div className="kpi-label">Total Issues</div>
                  </div>
                </div>

                <div className="kpi-card kpi-2">
                  <div className="kpi-icon">
                    <TrendingUp />
                  </div>
                  <div className="kpi-content">
                    <div className="kpi-value">{stats.inProgress}</div>
                    <div className="kpi-label">In Progress</div>
                  </div>
                </div>

                <div className="kpi-card kpi-3">
                  <div className="kpi-icon">
                    <CheckCircle />
                  </div>
                  <div className="kpi-content">
                    <div className="kpi-value">{stats.resolved}</div>
                    <div className="kpi-label">Resolved</div>
                  </div>
                </div>

                <div className="kpi-card kpi-4">
                  <div className="kpi-icon">
                    <People />
                  </div>
                  <div className="kpi-content">
                    <div className="kpi-value">{stats.totalUsers}</div>
                    <div className="kpi-label">Total Users</div>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="charts-container">
                {/* Issues Trend - Area Chart */}
                <div className="chart-card">
                  <div className="chart-header">Issues Trend (7 Days)</div>
                  <div className="chart-body">
                    <ResponsiveContainer width="100%" height={380}>
                      <AreaChart data={stats.issuesTrend}>
                        <defs>
                          <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="issues"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorIssues)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Status Distribution - Pie Chart */}
                <div className="chart-card">
                  <div className="chart-header">Status Distribution</div>
                  <div className="chart-body">
                    <ResponsiveContainer width="100%" height={380}>
                      <PieChart>
                        <Pie
                          data={stats.statusBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={110}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#ff9800" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#10b981" />
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Distribution - Bar Chart */}
                <div className="chart-card">
                  <div className="chart-header">Issues by Category</div>
                  <div className="chart-body">
                    <ResponsiveContainer width="100%" height={380}>
                      <BarChart data={stats.categoryBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Priority Distribution - Bar Chart */}
                <div className="chart-card">
                  <div className="chart-header">Issues by Priority</div>
                  <div className="chart-body">
                    <ResponsiveContainer width="100%" height={380}>
                      <BarChart data={stats.priorityBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Users by Role - Pie Chart */}
                <div className="chart-card">
                  <div className="chart-header">Users by Role</div>
                  <div className="chart-body">
                    <ResponsiveContainer width="100%" height={380}>
                      <PieChart>
                        <Pie
                          data={stats.roleBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={110}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#8b5cf6" />
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="issues-container">
              <div className="table-card">
                <div className="chart-header" style={{ marginBottom: '24px' }}>Issues Management</div>
                
                {/* Filters and Search */}
                <div className="issues-controls">
                  <div className="search-box">
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="text"
                      placeholder="Search by title or reporter..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Status</option>
                      <option value="Submitted">Submitted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Priority</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                {/* Issues Table */}
                <div className="issues-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Issue Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Category</th>
                        <th>Reporter</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredIssues().map(issue => (
                        <tr key={issue.id}>
                          <td className="issue-title">{issue.title}</td>
                          <td>
                            <select
                              value={issue.status}
                              onChange={(e) => handleStatusUpdate(issue.id, e.target.value)}
                              className="status-select"
                              style={{
                                backgroundColor: getStatusColor(issue.status),
                                color: 'white',
                              }}
                            >
                              <option value="Submitted">Submitted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td>
                            <span
                              className="priority-badge"
                              style={{ backgroundColor: getPriorityColor(issue.priority) }}
                            >
                              {issue.priority}
                            </span>
                          </td>
                          <td>{issue.category}</td>
                          <td>{issue.reporter}</td>
                          <td className="date-cell">{issue.date}</td>
                          <td>
                            <button
                              className="view-btn"
                              onClick={() => setSelectedIssueModal(issue)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {getFilteredIssues().length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#999' }}>
                      No issues found matching your filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="users-container">
              <div className="table-card">
                <div className="chart-header" style={{ marginBottom: '24px' }}>Users Management</div>
                
                {/* Filters and Search */}
                <div className="issues-controls">
                  <div className="search-box">
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <select
                      value={userFilterRole}
                      onChange={(e) => setUserFilterRole(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Citizen">Citizen</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <select
                      value={userFilterStatus}
                      onChange={(e) => setUserFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="issues-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Activity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredUsers().map(user => (
                        <tr key={user.id}>
                          <td className="issue-title">{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span
                              className="priority-badge"
                              style={{ backgroundColor: getRoleColor(user.role) }}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className="priority-badge"
                              style={{ backgroundColor: getUserStatusColor(user.status) }}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="date-cell">{user.joinDate}</td>
                          <td>
                            {user.role === 'Citizen' ? (
                              <span>{user.issuesReported} issues reported</span>
                            ) : (
                              <span>{user.issuesAssigned} issues assigned</span>
                            )}
                          </td>
                          <td>
                            <button className="view-btn">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {getFilteredUsers().length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#999' }}>
                      No users found matching your filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
