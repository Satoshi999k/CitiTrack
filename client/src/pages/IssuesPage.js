import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import {
  Construction as RoadsIcon,
  Lightbulb as LightbulbIcon,
  WaterDrop as WaterDropIcon,
  LocationCity as LocationCityIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import './IssuesPage.css';

function IssuesPage() {
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleElements, setVisibleElements] = useState({});
  
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Scroll animation observer
  useEffect(() => {
    setVisibleElements({});
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-scroll-animate="true"]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [location.pathname]);
  
  // Mock data
  const issues = [
    {
      id: 1,
      title: 'Large pothole on Main Street',
      category: 'road_damage',
      status: 'in_progress',
      priority: 'high',
      submittedBy: 'Juan Dela Cruz',
      date: '2026-02-10',
      location: 'Main St, Mati City',
    },
    {
      id: 2,
      title: 'Broken streetlight near plaza',
      category: 'streetlight',
      status: 'resolved',
      priority: 'medium',
      submittedBy: 'Maria Santos',
      date: '2026-02-05',
      location: 'Plaza Area, Mati City',
    },
    {
      id: 3,
      title: 'Clogged drainage system',
      category: 'drainage',
      status: 'submitted',
      priority: 'critical',
      submittedBy: 'Pedro Garcia',
      date: '2026-02-11',
      location: 'Residential Area, Mati City',
    },
    {
      id: 4,
      title: 'Damaged park bench',
      category: 'public_facility',
      status: 'in_progress',
      priority: 'low',
      submittedBy: 'Anna Reyes',
      date: '2026-02-08',
      location: 'City Park, Mati City',
    },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road_damage':
        return <RoadsIcon style={{ fontSize: '2rem' }} />;
      case 'drainage':
        return <WaterDropIcon style={{ fontSize: '2rem' }} />;
      case 'streetlight':
        return <LightbulbIcon style={{ fontSize: '2rem' }} />;
      case 'public_facility':
        return <LocationCityIcon style={{ fontSize: '2rem' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return '#00d084';
      case 'in_progress':
        return '#ff9800';
      case 'submitted':
        return '#3498db';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'resolved':
        return 'Resolved';
      case 'in_progress':
        return 'In Progress';
      case 'submitted':
        return 'Submitted';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#e74c3c';
      case 'high':
        return '#e67e22';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#666';
    }
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === filter);

  return (
    <div className="issues-page">
      {isLoading && <Loading />}
      <div className="issues-page-content">
      <div className="issues-container">
        <h1>All Reported Issues</h1>
        <p>Track and monitor infrastructure issues in Mati City</p>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Issues
          </button>
          <button
            className={`filter-btn ${filter === 'submitted' ? 'active' : ''}`}
            onClick={() => setFilter('submitted')}
          >
            Submitted
          </button>
          <button
            className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setFilter('in_progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
            onClick={() => setFilter('resolved')}
          >
            Resolved
          </button>
        </div>

        <div className="issues-grid">
          {filteredIssues.map(issue => (
            <div
            key={issue.id}
            className={`issue-card ${visibleElements[`issue-${issue.id}`] ? 'visible' : ''}`}
            id={`issue-${issue.id}`}
            data-scroll-animate="true"
          >
              <div className="issue-header">
                <div className="issue-image">{getCategoryIcon(issue.category)}</div>
                <div className="issue-badges">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {getStatusLabel(issue.status)}
                  </span>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(issue.priority) }}
                  >
                    {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                  </span>
                </div>
              </div>
              <h3>{issue.title}</h3>
              <p className="issue-location">📍 {issue.location}</p>
              <p className="issue-category">{issue.category.replace('_', ' ')}</p>
              <div className="issue-footer">
                <span className="issue-date">{issue.date}</span>
                <span className="issue-submitter">by {issue.submittedBy}</span>
              </div>
              <button className="btn-view">View Details</button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About CitiTrack</h4>
            <p>
              CitiTrack is a smart platform designed to connect citizens and
              authorities for efficient infrastructure management.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/report">Report Issue</a></li>
              <li><a href="/issues">View Issues</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@cititrack.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: Mati City, Philippines</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Follow us on Facebook">
                <FacebookIcon style={{ fontSize: '1.8rem' }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Follow us on Twitter">
                <TwitterIcon style={{ fontSize: '1.8rem' }} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Follow us on Instagram">
                <InstagramIcon style={{ fontSize: '1.8rem' }} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CitiTrack. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default IssuesPage;
