import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GPSMap from '../components/GPSMap';
import Loading from '../components/Loading';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import './ReportIssuePage.css';

function ReportIssuePage() {
  const location = useLocation();
  const [locationData, setLocationData] = useState({ latitude: 14.3520, longitude: 121.1814 });
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [visibleElements, setVisibleElements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Scroll to top and show loading animation when route changes
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    
    // Hide loading after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Scroll animation observer - re-runs when location changes (navigation)
  useEffect(() => {
    // Reset animation state on route change
    setVisibleElements({});
    
    // Delay to ensure DOM renders with initial state first
    const timer = setTimeout(() => {
      setVisibleElements({ 'report-container': true });
    }, 50);
    
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
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [location]);
  
  
  // AI-based priority analysis
  const analyzePriority = (text) => {
    const lowerText = text.toLowerCase();
    
    // Critical keywords - life threatening, immediate danger
    const criticalKeywords = [
      'collapsed', 'collapse', 'danger', 'dangerous', 'life threatening', 'death',
      'accident', 'injured', 'injury', 'severe', 'emergency', 'immediate',
      'blocking traffic', 'hazard', 'hazardous', 'fallen tree', 'power line',
      'gas leak', 'explosion', 'fire', 'flooding', 'landslide', 'unstable'
    ];
    
    // High keywords - significant damage, health risks
    const highKeywords = [
      'broken', 'damage', 'damaged', 'pothole', 'crack', 'deep', 'large hole',
      'water leak', 'sewage', 'sewerage', 'flooding', 'blocked', 'congestion',
      'debris', 'garbage', 'broken light', 'broken road', 'dangerous', 'risk'
    ];
    
    // Medium keywords - noticeable issues but not urgent
    const mediumKeywords = [
      'small hole', 'minor crack', 'loose', 'worn', 'need repair', 'repair needed',
      'maintenance', 'minor damage', 'slight damage', 'uneven', 'dirty', 'broken pipe'
    ];
    
    // Check for critical keywords
    if (criticalKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'Critical';
    }
    
    // Check for high keywords
    if (highKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'High';
    }
    
    // Check for medium keywords
    if (mediumKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'Medium';
    }
    
    // Default to Low if no keywords match
    return 'Low';
  };
  
  // Update priority whenever description changes
  useEffect(() => {
    if (description.trim()) {
      const analyzedPriority = analyzePriority(description);
      setPriority(analyzedPriority);
    }
  }, [description]);
  
  const handleLocationSelect = (locationData) => {
    setLocationData(locationData);
  };
  
  const handleAddressUpdate = (newAddress) => {
    setAddress(newAddress);
  };
  return (
    <div className="report-issue-page">
      {isLoading && <Loading />}
      <div className="report-page-content">
      <div 
        className={`report-container ${visibleElements['report-container'] ? 'visible' : ''}`}
        id="report-container"
        data-scroll-animate="true"
      >
        <h1>Report an Infrastructure Issue</h1>
        <p>Help us improve Mati City by reporting infrastructure problems</p>

        <form className="report-form">
          <div className="form-group">
            <label htmlFor="category">Issue Category *</label>
            <select id="category" required>
              <option value="">Select a category</option>
              <option value="road_damage">Road Damage</option>
              <option value="drainage">Drainage Issues</option>
              <option value="streetlight">Streetlight Problems</option>
              <option value="public_facility">Public Facility</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Issue Title *</label>
            <input
              type="text"
              id="title"
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Provide more details about the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              <LightbulbIcon sx={{ fontSize: '1rem' }} />
              <span>AI will analyze your description to determine the priority level automatically</span>
            </div>
          </div>

          <GPSMap onLocationSelect={handleLocationSelect} onAddressUpdate={handleAddressUpdate} />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                id="latitude" 
                step="0.0001" 
                value={locationData.latitude}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                id="longitude" 
                step="0.0001" 
                value={locationData.longitude}
                readOnly
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Location Address *</label>
            <input
              type="text"
              id="address"
              placeholder="Street address or landmark"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level (Auto-Analyzed)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="text"
                id="priority"
                value={priority.charAt(0).toUpperCase() + priority.slice(1)}
                disabled
                readOnly
                style={{ 
                  backgroundColor: '#f5f5f5', 
                  cursor: 'not-allowed',
                  borderColor: '#ddd',
                  flex: 1
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#2D9B6E', whiteSpace: 'nowrap' }}>
                <AutoAwesomeIcon sx={{ fontSize: '1.1rem' }} />
                <span>AI analyzed</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Upload Images (Optional)</label>
            <input type="file" id="images" multiple accept="image/*" />
          </div>

          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input type="text" id="name" placeholder="Full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" placeholder="Your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="+63 9XX XXX XXXX" />
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Submit Report
          </button>
        </form>
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

export default ReportIssuePage;
