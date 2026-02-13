const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection - Optional (won't block server startup)
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cititrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection warning (proceeding without database):', err.message));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'CitiTrack server is running' });
});

// Routes
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
// TODO: Add routes here
// app.use('/api/issues', require('./routes/issueRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Chatbot API available at: http://localhost:${PORT}/api/chatbot');
});
