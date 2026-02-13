import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  SendOutlined as SendIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import './ContactPage.css';

function ContactPage() {
  const location = useLocation();
  const [visibleElements, setVisibleElements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      {isLoading && <Loading />}
      <div className="contact-page-content">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>Have questions or feedback? We'd love to hear from you. Reach out to our team today.</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="contact-container">
          <h2>Contact Information</h2>
          <div className="info-cards">
            <div 
              className={`info-card ${visibleElements['info-card-1'] ? 'visible' : ''}`}
              id="info-card-1"
              data-scroll-animate="true"
            >
              <div className="info-icon email-icon">
                <EmailIcon />
              </div>
              <h3>Email</h3>
              <p>contact@cititrack.com</p>
              <a href="mailto:contact@cititrack.com" className="info-link">Send Email</a>
            </div>

            <div 
              className={`info-card ${visibleElements['info-card-2'] ? 'visible' : ''}`}
              id="info-card-2"
              data-scroll-animate="true"
            >
              <div className="info-icon phone-icon">
                <PhoneIcon />
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <a href="tel:+15551234567" className="info-link">Call Us</a>
            </div>

            <div 
              className={`info-card ${visibleElements['info-card-3'] ? 'visible' : ''}`}
              id="info-card-3"
              data-scroll-animate="true"
            >
              <div className="info-icon location-icon">
                <LocationIcon />
              </div>
              <h3>Address</h3>
              <p>Mati City, Davao Oriental, Philippines</p>
              <a href="#map" className="info-link">View Map</a>
            </div>

            <div 
              className={`info-card ${visibleElements['info-card-4'] ? 'visible' : ''}`}
              id="info-card-4"
              data-scroll-animate="true"
            >
              <div className="info-icon hours-icon">
                <ClockIcon />
              </div>
              <h3>Business Hours</h3>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Sat - Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="form-wrapper">
            <div 
              className={`form-content ${visibleElements['contact-form'] ? 'visible' : ''}`}
              id="contact-form"
              data-scroll-animate="true"
            >
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully. We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <SendIcon style={{ marginRight: '0.5rem' }} />
                  Send Message
                </button>
              </form>
            </div>

            <div 
              className={`contact-benefits ${visibleElements['contact-benefits'] ? 'visible' : ''}`}
              id="contact-benefits"
              data-scroll-animate="true"
            >
              <h3>Why Contact Us?</h3>
              <ul className="benefits-list">
                <li>
                  <span className="benefit-icon">✓</span>
                  Get expert support for your questions
                </li>
                <li>
                  <span className="benefit-icon">✓</span>
                  Report urgent infrastructure issues
                </li>
                <li>
                  <span className="benefit-icon">✓</span>
                  Join our community of change-makers
                </li>
                <li>
                  <span className="benefit-icon">✓</span>
                  Provide feedback to improve CitiTrack
                </li>
                <li>
                  <span className="benefit-icon">✓</span>
                  Quick response time (24-48 hours)
                </li>
                <li>
                  <span className="benefit-icon">✓</span>
                  Multiple support channels available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div 
              className={`faq-item ${visibleElements['faq-1'] ? 'visible' : ''}`}
              id="faq-1"
              data-scroll-animate="true"
            >
              <h3>What is the fastest way to report an issue?</h3>
              <p>Use our mobile app or website to report issues instantly. Critical issues get priority attention from local authorities.</p>
            </div>
            <div 
              className={`faq-item ${visibleElements['faq-2'] ? 'visible' : ''}`}
              id="faq-2"
              data-scroll-animate="true"
            >
              <h3>How long does it take to get a response?</h3>
              <p>We typically respond to inquiries within 24-48 business hours. Urgent matters may be prioritized sooner.</p>
            </div>
            <div 
              className={`faq-item ${visibleElements['faq-3'] ? 'visible' : ''}`}
              id="faq-3"
              data-scroll-animate="true"
            >
              <h3>Can I track my reported issue?</h3>
              <p>Yes! Once submitted, you can track your issue status in real-time through your CitiTrack dashboard.</p>
            </div>
            <div 
              className={`faq-item ${visibleElements['faq-4'] ? 'visible' : ''}`}
              id="faq-4"
              data-scroll-animate="true"
            >
              <h3>Is my information secure?</h3>
              <p>We use industry-standard encryption to protect your personal data. Your privacy is our priority.</p>
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

export default ContactPage;
