import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import {
  Flag as MissionIcon,
  Visibility as VisionIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Groups as PeopleIcon,
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckCircleIcon,
  BugReport as BugReportIcon,
  TaskAlt as TaskAltIcon,
  BarChart as BarChartIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import './AboutPage.css';

function AboutPage() {
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
    // Reset visible elements on route change
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
  }, [location]);

  return (
    <div className="about-page">
      {isLoading && <Loading />}
      <div className="about-page-content">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About CitiTrack</h1>
          <p>Building smarter cities through community collaboration and real-time infrastructure monitoring</p>
        </div>
      </section>

      {/* Background Section */}
      <section className="about-background">
        <div 
          className={`about-container ${visibleElements['background-section'] ? 'visible' : ''}`}
          id="background-section"
          data-scroll-animate="true"
        >
          <h2>Our Story</h2>
          <div className="background-content">
            <p>
              CitiTrack was born from a simple observation: citizens often spot infrastructure problems before authorities do. Yet there's no efficient way to report and track these issues. We created CitiTrack to bridge this gap.
            </p>
            <p>
              Our platform empowers communities to take action, turning every citizen into an infrastructure guardian. By combining real-time reporting, AI-powered priority analysis, and transparent tracking, we're transforming how cities maintain and improve their infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="mission-vision-container">
          <div 
            className={`mission-card ${visibleElements['mission-card'] ? 'visible' : ''}`}
            id="mission-card"
            data-scroll-animate="true"
          >
            <MissionIcon className="mission-vision-icon" />
            <h3>Our Mission</h3>
            <p>
              To empower citizens and government agencies to work together in maintaining and improving city infrastructure through transparent, efficient, and collaborative reporting and resolution.
            </p>
          </div>
          <div 
            className={`vision-card ${visibleElements['vision-card'] ? 'visible' : ''}`}
            id="vision-card"
            data-scroll-animate="true"
          >
            <VisionIcon className="mission-vision-icon" />
            <h3>Our Vision</h3>
            <p>
              A world where every city is smart, responsive, and citizen-centric. Where infrastructure problems are reported, tracked, and resolved in real-time, creating safer and more livable communities for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div 
            className={`value-card slide-up ${visibleElements['value-1'] ? 'visible' : ''}`}
            id="value-1"
            data-scroll-animate="true"
          >
            <CheckCircleIcon className="value-icon" />
            <h3>Transparency</h3>
            <p>We believe in open communication between citizens and authorities. Every report and resolution is tracked transparently.</p>
          </div>
          <div 
            className={`value-card slide-up ${visibleElements['value-2'] ? 'visible' : ''}`}
            id="value-2"
            data-scroll-animate="true"
          >
            <PeopleIcon className="value-icon" />
            <h3>Community</h3>
            <p>We empower collective action. Together, our voices are stronger and our cities become better.</p>
          </div>
          <div 
            className={`value-card slide-up ${visibleElements['value-3'] ? 'visible' : ''}`}
            id="value-3"
            data-scroll-animate="true"
          >
            <TrendingIcon className="value-icon" />
            <h3>Innovation</h3>
            <p>We leverage cutting-edge technology like AI and real-time mapping to solve infrastructure challenges efficiently.</p>
          </div>
          <div 
            className={`value-card slide-up ${visibleElements['value-4'] ? 'visible' : ''}`}
            id="value-4"
            data-scroll-animate="true"
          >
            <SecurityIcon className="value-icon" />
            <h3>Accountability</h3>
            <p>Every issue reported is tracked. Every resolution is verified. We hold ourselves and authorities accountable.</p>
          </div>
          <div 
            className={`value-card slide-up ${visibleElements['value-5'] ? 'visible' : ''}`}
            id="value-5"
            data-scroll-animate="true"
          >
            <LightbulbIcon className="value-icon" />
            <h3>Sustainability</h3>
            <p>We prioritize long-term solutions that benefit our communities and the environment for generations to come.</p>
          </div>
          <div 
            className={`value-card slide-up ${visibleElements['value-6'] ? 'visible' : ''}`}
            id="value-6"
            data-scroll-animate="true"
          >
            <SpeedIcon className="value-icon" />
            <h3>Rapid Response</h3>
            <p>We understand urgency. Our platform enables quick reporting and fast-tracked resolution of critical infrastructure issues.</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="about-features">
        <h2>What Makes CitiTrack Different</h2>
        <div className="features-list">
          <div 
            className={`feature-item ${visibleElements['feature-item-1'] ? 'visible' : ''}`}
            id="feature-item-1"
            data-scroll-animate="true"
          >
            <div className="feature-number">1</div>
            <h3>AI-Powered Priority Analysis</h3>
            <p>Our intelligent system analyzes report descriptions to automatically assess priority levels, ensuring critical issues get immediate attention.</p>
          </div>
          <div 
            className={`feature-item ${visibleElements['feature-item-2'] ? 'visible' : ''}`}
            id="feature-item-2"
            data-scroll-animate="true"
          >
            <div className="feature-number">2</div>
            <h3>Real-Time GPS Tracking</h3>
            <p>Precise location tagging ensures reports are accurately mapped and assigned to the right departments for faster resolution.</p>
          </div>
          <div 
            className={`feature-item ${visibleElements['feature-item-3'] ? 'visible' : ''}`}
            id="feature-item-3"
            data-scroll-animate="true"
          >
            <div className="feature-number">3</div>
            <h3>Live Status Updates</h3>
            <p>Track your report from submission to resolution. Receive real-time notifications as authorities work on fixing issues.</p>
          </div>
          <div 
            className={`feature-item ${visibleElements['feature-item-4'] ? 'visible' : ''}`}
            id="feature-item-4"
            data-scroll-animate="true"
          >
            <div className="feature-number">4</div>
            <h3>Community Collaboration</h3>
            <p>Upvote similar issues, add comments, and collaboratively identify patterns to improve city planning and maintenance.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="about-impact">
        <div 
          className={`impact-container ${visibleElements['impact-section'] ? 'visible' : ''}`}
          id="impact-section"
          data-scroll-animate="true"
        >
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat" id="impact-stat-1">
              <div className="impact-icon">
                <BugReportIcon />
              </div>
              <h3>1,240+</h3>
              <p>Issues Reported</p>
            </div>
            <div className="impact-stat" id="impact-stat-2">
              <div className="impact-icon">
                <TaskAltIcon />
              </div>
              <h3>856</h3>
              <p>Resolved</p>
            </div>
            <div className="impact-stat" id="impact-stat-3">
              <div className="impact-icon">
                <BarChartIcon />
              </div>
              <h3>69%</h3>
              <p>Resolution Rate</p>
            </div>
            <div className="impact-stat" id="impact-stat-4">
              <div className="impact-icon">
                <PeopleIcon />
              </div>
              <h3>100+</h3>
              <p>Active Users</p>
            </div>
          </div>
          <p className="impact-description">
            Through CitiTrack, we've enabled our community to report, track, and resolve infrastructure issues more effectively than ever before. Our growing user base continues to make Mati City safer and more livable.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div 
          className={`cta-content ${visibleElements['about-cta-section'] ? 'visible' : ''}`}
          id="about-cta-section"
          data-scroll-animate="true"
        >
          <h2>Join Us in Building Better Cities</h2>
          <p>Be part of the infrastructure revolution. Start reporting issues and making a difference today.</p>
          <button className="btn btn-primary btn-large">Get Started</button>
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
              <li><a href="/about">About</a></li>
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

export default AboutPage;
