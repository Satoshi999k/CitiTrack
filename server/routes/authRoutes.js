const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Signup - Create new user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      role: 'citizen',
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Hardcoded admin for testing (bypass database)
    if (email === 'admin@cititrack.com' && password === 'Admin@123') {
      const token = jwt.sign(
        { userId: 'admin_001', email: 'admin@cititrack.com', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: 'admin_001',
          name: 'Admin User',
          email: 'admin@cititrack.com',
          role: 'admin',
        },
      });
    }

    // Try database if available
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbError) {
      // Database error - use hardcoded fallback only for admin
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Seed admin account (for development)
router.post('/seed-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@cititrack.com' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@cititrack.com',
      password: 'Admin@123',
      role: 'admin',
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin account created successfully',
      credentials: {
        email: 'admin@cititrack.com',
        password: 'Admin@123',
      },
    });
  } catch (error) {
    console.error('Seed admin error:', error);
    res.status(500).json({ error: 'Failed to create admin account' });
  }
});

module.exports = router;
