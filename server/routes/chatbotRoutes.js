const express = require('express');
const { generateAIResponse } = require('../controllers/chatbotController');

const router = express.Router();

// Chatbot endpoint
router.post('/', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = generateAIResponse(message);

    res.json({
      success: true,
      reply: reply,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your message',
    });
  }
});

module.exports = router;
