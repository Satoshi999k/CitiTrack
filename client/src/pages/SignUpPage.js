import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Bolt as BoltIcon,
  Security as SecurityIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import Loading from '../components/Loading';
import TermsModal from '../components/TermsModal';
import './SignUpPage.css';

function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleElements, setVisibleElements] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setErrors({ submit: 'Email already registered' });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {isLoading && <Loading />}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <div className="signup-bg"></div>

      <div className="floating-object obj-1"></div>
      <div className="floating-object obj-2"></div>
      <div className="floating-object obj-3"></div>

      <div className="signup-main-container">
        {/* Left Section - Benefits */}
        <div
          className={`signup-benefits ${visibleElements['benefits'] ? 'visible' : ''}`}
          id="benefits"
          data-scroll-animate="true"
        >
          <div className="benefits-header">
            <div className="logo-section-small">
              <img src="/images/cititracklogo.png" alt="CitiTrack" className="logo-sm" />
              <h1>CitiTrack</h1>
            </div>
            <h2>Join Our Community</h2>
            <p>Help improve your city's infrastructure</p>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Easy Reporting</h4>
                <p>Report issues in seconds</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Real-time Updates</h4>
                <p>Track issue progress instantly</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Make a Difference</h4>
                <p>Help build better cities</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckIcon className="check-icon" />
              <div>
                <h4>Community Power</h4>
                <p>Join thousands of citizens</p>
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

        {/* Right Section - Signup Form */}
        <div
          className={`signup-form-section ${visibleElements['form'] ? 'visible' : ''}`}
          id="form"
          data-scroll-animate="true"
        >
          <div className="form-card">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Join CitiTrack and start reporting issues</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              {errors.submit && <div className="error-alert">{errors.submit}</div>}

              {/* First Name */}
              <div className="input-group">
                <label>First Name</label>
                <div className="input-field">
                  <PersonIcon className="input-icon" />
                  <input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) setErrors({ ...errors, firstName: '' });
                    }}
                    className={errors.firstName ? 'error-input' : ''}
                  />
                </div>
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="input-group">
                <label>Last Name</label>
                <div className="input-field">
                  <PersonIcon className="input-icon" />
                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors({ ...errors, lastName: '' });
                    }}
                    className={errors.lastName ? 'error-input' : ''}
                  />
                </div>
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-field">
                  <EmailIcon className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'error-input' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="input-group">
                <label>Password</label>
                <div className="input-field">
                  <LockIcon className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
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

              {/* Confirm Password */}
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-field">
                  <LockIcon className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={errors.confirmPassword ? 'error-input' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? 'Hide' : 'Show'}
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>

              {/* Terms & Conditions */}
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: '' });
                  }}
                />
                <label htmlFor="terms">
                  I agree to the <button
                    type="button"
                    className="terms-link-btn"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
              {errors.terms && <span className="error-text">{errors.terms}</span>}

              {/* Submit Button */}
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="form-footer">
              <p>Already have an account? <a href="/login">Sign In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
