import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckIcon,
  Bolt as BoltIcon,
  Security as SecurityIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import './LoginPage.css';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleElements, setVisibleElements] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
  }, [location]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Gradient */}
      <div className="login-bg"></div>

      {/* Floating Objects */}
      <div className="floating-object obj-1"></div>
      <div className="floating-object obj-2"></div>
      <div className="floating-object obj-3"></div>

      {/* Main Container */}
      <div className="login-main-container">
        {/* Left Section - Benefits */}
        <div
          className={`login-benefits ${visibleElements['benefits'] ? 'visible' : ''}`}
          id="benefits"
          data-scroll-animate="true"
        >
          <div className="benefits-header">
            <div className="logo-section-small">
              <img src="/images/cititracklogo.png" alt="CitiTrack" className="logo-sm" />
              <h1>CitiTrack</h1>
            </div>
            <h2>Monitor Your City</h2>
            <p>Manage infrastructure issues in real-time</p>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Real-time Tracking</h4>
                <p>Monitor issues as they happen</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>AI-Powered Analysis</h4>
                <p>Smart prioritization systems</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Community Driven</h4>
                <p>Crowdsourced intelligence</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Instant Reports</h4>
                <p>Get alerts and updates</p>
              </div>
            </div>
          </div>

          <div className="features-highlight">
            <div className="highlight-item">
              <BoltIcon className="highlight-icon" />
              <h4>Lightning Fast</h4>
              <p>Real-time notifications</p>
            </div>
            <div className="highlight-item">
              <SecurityIcon className="highlight-icon" />
              <h4>Secure</h4>
              <p>Enterprise-grade security</p>
            </div>
            <div className="highlight-item">
              <PublicIcon className="highlight-icon" />
              <h4>Always Available</h4>
              <p>24/7 monitoring</p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div
          className={`login-form-section ${visibleElements['form'] ? 'visible' : ''}`}
          id="form"
          data-scroll-animate="true"
        >
          <div className="form-card">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your CitiTrack account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {errors.submit && <div className="error-alert">{errors.submit}</div>}

              {/* Email Input */}
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-field">
                  <EmailIcon className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'error-input' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Password Input */}
              <div className="input-group">
                <label>Password</label>
                <div className="input-field">
                  <LockIcon className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={errors.password ? 'error-input' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide' : 'Show'}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {/* Remember & Forgot */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Sign Up */}
            <div className="form-footer">
              <p>Don't have an account? <a href="/signup">Create one here</a></p>
            </div>

            {/* Divider */}
            <div className="divider">
              <span>or continue with</span>
            </div>

            {/* Social Buttons */}
            <button type="button" className="social-btn-google">
              <span className="social-icon">G</span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
