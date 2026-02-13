import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import {
  Send as SendIcon,
  Visibility as VisibilityIcon,
  Phone as PhoneIcon,
  FlashOn as FlashOnIcon,
  SmartToy as SmartToyIcon,
  Dashboard as DashboardIcon,
  Lock as LockIcon,
  Groups as GroupsIcon,
  Construction as RoadsIcon,
  WaterDrop as WaterDropIcon,
  Lightbulb as LightbulbIcon,
  LocationOn as LocationOnIcon,
  LocationCity as LocationCityIcon,
  BarChart as BarChartIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  LocationCity as OfficeIcon,
} from '@mui/icons-material';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleElements, setVisibleElements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="homepage">      {isLoading && <Loading />}
      <div className="home-page-content">      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>CitiTrack Infrastructure Monitoring</h1>
            <p>
              Empower your community to report, track, and resolve infrastructure
              issues in real-time. Build a better city together.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/report')}>
                <SendIcon style={{ fontSize: '1.2rem' }} />
                Report an Issue
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/issues')}>
                <VisibilityIcon style={{ fontSize: '1.2rem' }} />
                View Issues
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="illustration">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div 
            className={`stat-card slide-right ${visibleElements['stat-1'] ? 'visible' : ''}`}
            id="stat-1"
            data-scroll-animate="true"
          >
            <BarChartIcon className="stat-icon" />
            <div className="stat-number">1,240</div>
            <div className="stat-label">Issues Reported</div>
          </div>
          <div 
            className={`stat-card slide-right ${visibleElements['stat-2'] ? 'visible' : ''}`}
            id="stat-2"
            data-scroll-animate="true"
          >
            <CheckCircleIcon className="stat-icon" />
            <div className="stat-number">856</div>
            <div className="stat-label">Issues Resolved</div>
          </div>
          <div 
            className={`stat-card slide-right ${visibleElements['stat-3'] ? 'visible' : ''}`}
            id="stat-3"
            data-scroll-animate="true"
          >
            <SettingsIcon className="stat-icon" />
            <div className="stat-number">284</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div 
            className={`stat-card slide-right ${visibleElements['stat-4'] ? 'visible' : ''}`}
            id="stat-4"
            data-scroll-animate="true"
          >
            <GroupsIcon className="stat-icon" />
            <div className="stat-number">100</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <div className="workflow-content">
            <div className="workflow-text">
              <h2>How CitiTrack Works</h2>
              <p className="workflow-tagline">Smart Infrastructure Reporting Made Simple</p>

              <div className="workflow-steps-list">
                <div 
                  className={`workflow-item ${visibleElements['workflow-1'] ? 'visible' : ''}`}
                  id="workflow-1"
                  data-scroll-animate="true"
                >
                  <div className="workflow-item-number">1</div>
                  <div className="workflow-item-content">
                    <h3>Report an Issue</h3>
                    <p>
                      Snap a photo, describe the problem, and pin the location through our website. Simple and accessible to everyone in your community.
                    </p>
                  </div>
                </div>

                <div 
                  className={`workflow-item ${visibleElements['workflow-2'] ? 'visible' : ''}`}
                  id="workflow-2"
                  data-scroll-animate="true"
                >
                  <div className="workflow-item-number">2</div>
                  <div className="workflow-item-content">
                    <h3>Track & Collaborate</h3>
                    <p>
                      View your report on the live map, upvote similar issues, and collaborate with other citizens. Get real-time updates as authorities review and prioritize the report.
                    </p>
                  </div>
                </div>

                <div 
                  className={`workflow-item ${visibleElements['workflow-3'] ? 'visible' : ''}`}
                  id="workflow-3"
                  data-scroll-animate="true"
                >
                  <div className="workflow-item-number">3</div>
                  <div className="workflow-item-content">
                    <h3>Resolve & Verify</h3>
                    <p>
                      The right department gets assigned, updates happen in real-time, and issues are marked resolved after verification. Earn credits for verified fixes!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="workflow-visualization">
              <svg className="workflow-svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet">
                {/* Wavy path */}
                <path
                  d="M 80 80 Q 120 50 150 90 Q 180 130 210 100 Q 240 70 270 120 Q 300 170 280 250 Q 270 290 310 320 Q 350 350 280 380 Q 210 410 180 450"
                  stroke="#2B7A78"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Step 1 - Top Left */}
                <circle cx="80" cy="80" r="15" fill="#2B7A78" />
                <circle cx="80" cy="80" r="10" fill="white" strokeWidth="2" stroke="#2B7A78" />
                <text x="80" y="81" textAnchor="middle" dominantBaseline="middle" className="step-label">1</text>

                {/* Step 2 - Middle Right */}
                <circle cx="280" cy="250" r="15" fill="#2B7A78" />
                <circle cx="280" cy="250" r="10" fill="white" strokeWidth="2" stroke="#2B7A78" />
                <text x="280" y="251" textAnchor="middle" dominantBaseline="middle" className="step-label">2</text>

                {/* Step 3 - Bottom Left */}
                <circle cx="180" cy="450" r="15" fill="#2B7A78" />
                <circle cx="180" cy="450" r="10" fill="white" strokeWidth="2" stroke="#2B7A78" />
                <text x="180" y="451" textAnchor="middle" dominantBaseline="middle" className="step-label">3</text>

                {/* Decorative background numbers */}
                <text x="320" y="120" className="bg-number">1</text>
                <text x="100" y="320" className="bg-number">2</text>
                <text x="280" y="520" className="bg-number">3</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why CitiTrack?</h2>
        <div className="features-grid">
          <div 
            className={`feature-card slide-left ${visibleElements['feature-1'] ? 'visible' : ''}`}
            id="feature-1"
            data-scroll-animate="true"
          >
            <PhoneIcon className="feature-icon" />
            <h3>Easy Reporting</h3>
            <p>
              Simple, intuitive interface to report infrastructure issues
              with photos and location details.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-2'] ? 'visible' : ''}`}
            id="feature-2"
            data-scroll-animate="true"
          >
            <FlashOnIcon className="feature-icon" />
            <h3>Real-Time Tracking</h3>
            <p>
              Monitor issue status in real-time and receive updates as
              authorities work on resolution.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-3'] ? 'visible' : ''}`}
            id="feature-3"
            data-scroll-animate="true"
          >
            <SmartToyIcon className="feature-icon" />
            <h3>AI Assistance</h3>
            <p>
              Get help from our intelligent chatbot that guides you through
              the reporting process and answers questions.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-4'] ? 'visible' : ''}`}
            id="feature-4"
            data-scroll-animate="true"
          >
            <DashboardIcon className="feature-icon" />
            <h3>Comprehensive Dashboard</h3>
            <p>
              View analytics and reports on infrastructure issues across
              the city for better decision-making.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-5'] ? 'visible' : ''}`}
            id="feature-5"
            data-scroll-animate="true"
          >
            <LockIcon className="feature-icon" />
            <h3>Secure & Transparent</h3>
            <p>
              Your data is protected with industry-standard security while
              maintaining full transparency.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-6'] ? 'visible' : ''}`}
            id="feature-6"
            data-scroll-animate="true"
          >
            <GroupsIcon className="feature-icon" />
            <h3>Community Driven</h3>
            <p>
              Collaborate with other citizens and government agencies to
              create a cleaner, better city.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-7'] ? 'visible' : ''}`}
            id="feature-7"
            data-scroll-animate="true"
          >
            <LocationOnIcon className="feature-icon" />
            <h3>GPS Tagging</h3>
            <p>
              Automatic location tagging ensures accurate issue reporting without manual address entry.
            </p>
          </div>
          <div 
            className={`feature-card slide-left ${visibleElements['feature-8'] ? 'visible' : ''}`}
            id="feature-8"
            data-scroll-animate="true"
          >
            <CheckCircleIcon className="feature-icon" />
            <h3>Verified Reporting</h3>
            <p>
              Our verification system ensures reports are accurate and prevents spam or duplicate submissions.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Report Issues In These Categories</h2>
        <div className="categories-grid">
          <div 
            className={`category-item slide-up ${visibleElements['cat-1'] ? 'visible' : ''}`}
            id="cat-1"
            data-scroll-animate="true"
          >
            <RoadsIcon className="category-icon" />
            <h3>Road Damage</h3>
            <p>Potholes, cracks, and road hazards</p>
          </div>
          <div 
            className={`category-item slide-up ${visibleElements['cat-2'] ? 'visible' : ''}`}
            id="cat-2"
            data-scroll-animate="true"
          >
            <WaterDropIcon className="category-icon" />
            <h3>Drainage Issues</h3>
            <p>Clogged drains and flooding</p>
          </div>
          <div 
            className={`category-item slide-up ${visibleElements['cat-3'] ? 'visible' : ''}`}
            id="cat-3"
            data-scroll-animate="true"
          >
            <LightbulbIcon className="category-icon" />
            <h3>Streetlight Problems</h3>
            <p>Broken or malfunctioning lights</p>
          </div>
          <div 
            className={`category-item slide-up ${visibleElements['cat-4'] ? 'visible' : ''}`}
            id="cat-4"
            data-scroll-animate="true"
          >
            <LocationCityIcon className="category-icon" />
            <h3>Public Facilities</h3>
            <p>Damaged parks and public amenities</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`cta-section ${visibleElements['cta-section'] ? 'visible' : ''}`}
        id="cta-section"
        data-scroll-animate="true"
      >
        <div className="cta-inner">
          <h2 className="cta-heading">Ready to Make a Difference?</h2>
          <p className="cta-description">Start reporting issues and help improve our city infrastructure today</p>
          <button className="cta-button">Get Started Now</button>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="get-in-touch">
        <div className="get-in-touch-container">
          <div 
            className={`get-in-touch-heading ${visibleElements['get-in-touch-title'] ? 'visible' : ''}`}
            id="get-in-touch-title"
            data-scroll-animate="true"
          >
            <h2>Get in Touch With Us</h2>
            <p className="section-subtitle">Have questions? We'd love to hear from you</p>
          </div>
          
          <div className="contact-content">
            <div 
              className={`contact-info-box ${visibleElements['contact-box'] ? 'visible' : ''}`}
              id="contact-box"
              data-scroll-animate="true"
            >
              <h3 className="contact-box-title">Contact Information</h3>
              
              <div className="contact-item">
                <EmailIcon className="contact-item-icon" />
                <div className="contact-item-details">
                  <h4>Email Us</h4>
                  <p>info@cititrack.com</p>
                  <p className="contact-item-subtext">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-item">
                <PhoneIcon className="contact-item-icon" />
                <div className="contact-item-details">
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                  <p className="contact-item-subtext">Monday - Friday, 9AM - 6PM</p>
                </div>
              </div>

              <div className="contact-item">
                <OfficeIcon className="contact-item-icon" />
                <div className="contact-item-details">
                  <h4>Visit Us</h4>
                  <p>Mati City, Philippines</p>
                  <p className="contact-item-subtext">Available by appointment</p>
                </div>
              </div>
            </div>

            <div 
              className={`contact-form-wrapper ${visibleElements['contact-form'] ? 'visible' : ''}`}
              id="contact-form"
              data-scroll-animate="true"
            >
              <form className="contact-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    placeholder="Your Message" 
                    rows="5" 
                    required 
                    className="form-input form-textarea"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-submit">
                  <SendIcon style={{ fontSize: '1.1rem', marginRight: '0.5rem' }} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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

export default HomePage;
