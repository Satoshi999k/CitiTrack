import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Publish as PublishIcon,
  Visibility as VisibilityIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
} from '@mui/icons-material';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  // Hide navbar on login and signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/images/cititracklogo.png" alt="CitiTrack Logo" className="logo-image" />
          <span className="logo-text">CitiTrack</span>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <HomeIcon style={{ fontSize: '1.1rem', marginRight: '0.3rem', verticalAlign: 'middle' }} />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/report" className={`nav-link ${isActive('/report')}`}>
              <PublishIcon style={{ fontSize: '1.1rem', marginRight: '0.3rem', verticalAlign: 'middle' }} />
              Report Issue
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/issues" className={`nav-link ${isActive('/issues')}`}>
              <VisibilityIcon style={{ fontSize: '1.1rem', marginRight: '0.3rem', verticalAlign: 'middle' }} />
              View Issues
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              <InfoIcon style={{ fontSize: '1.1rem', marginRight: '0.3rem', verticalAlign: 'middle' }} />
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              <ContactMailIcon style={{ fontSize: '1.1rem', marginRight: '0.3rem', verticalAlign: 'middle' }} />
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
