// Comprehensive knowledge base for CitiTrack System
const cititrackKnowledgeBase = {
  system: {
    purpose:
      'CitiTrack is a comprehensive web-based platform designed for Mati City residents and government agencies to report, monitor, and track public infrastructure issues with AI-assisted support. It aims to improve community issue reporting and infrastructure management.',
    benefits: [
      'Faster issue resolution through centralized reporting',
      'Real-time tracking of infrastructure problems',
      'Better communication between citizens and government',
      'Data-driven infrastructure management',
      'Community engagement and transparency',
      'Reduction in response time to public infrastructure concerns',
    ],
    targetUsers: [
      'Mati City residents',
      'Government agencies and officials',
      'Infrastructure maintenance teams',
      'Community leaders',
    ],
  },
  whatCanReport: [
    'Road damage and potholes',
    'Drainage and flooding problems',
    'Broken or non-functional streetlights',
    'Public facility maintenance issues',
    'Water system problems',
    'Debris and litter accumulation',
    'Traffic and safety concerns',
    'Other infrastructure concerns',
  ],
  howToUse: [
    '1. Sign up or log in to your account',
    '2. Navigate to "Report Issue" page',
    '3. Select the issue type from the dropdown menu',
    '4. Click on the map to mark the exact location or use "Use Current Location" button',
    '5. Provide a detailed description of the issue',
    '6. Upload photos of the problem (optional but recommended)',
    '7. Click "Submit Report" to send your report',
    '8. Track your issue status in real-time',
  ],
  features: {
    gpsMapping:
      'Real-time GPS mapping feature allows you to pinpoint the exact location of infrastructure issues. You can either click on the map or use your device\'s GPS.',
    imageUpload:
      'Upload photos of the infrastructure issue to provide visual evidence. This helps officials understand the problem better and respond more effectively.',
    realTimeTracking:
      'Monitor the status of your reported issues in real-time. See updates from government agencies as they work on resolution.',
    notifications:
      'Receive notifications when your reported issue is acknowledged, being worked on, or resolved.',
    communityImpact:
      'Your reports help the city prioritize infrastructure maintenance and allocate resources where they are needed most.',
  },
  issues: {
    howToReportIssue: 'Go to "Report Issue" page, select issue type, mark location on map, add description and photos, then submit.',
    trackStatus:
      'After reporting, you can track your issue status on the dashboard. Look for the issue ID to find updates.',
    issueTypes: 'Roads, drainage, streetlights, public facilities, water systems, and other infrastructure concerns.',
    photos:
      'Include clear, well-lit photos showing the problem. Multiple angles help officials better assess and address the issue.',
  },
  account: {
    signUp: 'Click "Sign Up" on the home page, fill in your details (name, email, password), verify your email, and start reporting issues.',
    login: 'Enter your registered email and password on the Login page to access your account.',
    resetPassword:
      'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your email.',
    updateProfile: 'Go to your account settings to update your profile information and preferences.',
  },
  community: {
    improve:
      'CitiTrack helps improve your community by enabling faster infrastructure problem resolution, ensuring government resources are directed to areas with the greatest need.',
    transparency:
      'All reports and their statuses are tracked transparently, allowing citizens to see how their concerns are being addressed.',
    engagement:
      'The platform fosters community engagement by giving citizens a voice in infrastructure management and maintenance.',
    collaboration:
      'CitiTrack enables better collaboration between residents and government agencies, working together to maintain quality public infrastructure.',
  },
};

// Enhanced AI Response Generator with better context understanding
function generateAIResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();

  // ===== SIMPLE GREETINGS (Must check first) =====
  if (message.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)[\s!.?]*$/)) {
    return "Hello! Welcome to CitiTrack. I'm here to help you with any questions about our infrastructure reporting system. What would you like to know?";
  }

  // ===== FAREWELLS =====
  if (message.match(/^(bye|goodbye|exit|see you|farewell|thanks|thank you)[\s!.?]*$/)) {
    return "Thank you for using CitiTrack! We hope you'll report any infrastructure issues you encounter. Have a great day!";
  }

  // ===== ONE-WORD HELP QUERIES =====
  if (message === 'help' || message === 'help?') {
    return `I can help you with:\n\n• How to use CitiTrack\n• How to report an issue\n• How to track your report\n• Account and login help\n• Sign up for CitiTrack\n• Features (GPS, photos, notifications)\n• What issues can be reported\n• How CitiTrack helps your community\n\nJust ask me any question about CitiTrack!`;
  }

  // ===== TRACKING / STATUS (CHECK BEFORE REPORTING) =====
  if (message.match(/\b(track|status|check|progress|follow|my report|monitor)\b/i) && !message.match(/\b(report|submit|file|make|create).{0,20}(new|issue)\b/i)) {
    return `CitiTrack provides real-time tracking:\n• View all your reported issues in your dashboard\n• Check the current status of each report\n• Receive notifications when officials work on your issues\n• See resolution updates as they happen\n\nTransparency is core to our system!`;
  }

  // ===== WHAT IS CITITRACK / PURPOSE / ABOUT =====
  if (message.match(/^(what is|what's|tell me about|explain|about|purpose).{0,30}(cititrack|this system|the system|the platform)?[\s!.?]*$/i)) {
    return `CitiTrack is a comprehensive web-based platform for Mati City that allows residents and government agencies to report, monitor, and track public infrastructure issues in real-time.\n\nOur mission is to improve community engagement and accelerate infrastructure maintenance through centralized reporting and transparent tracking. Every report you submit helps make Mati City's infrastructure better!`;
  }

  // ===== HOW TO REPORT ISSUE (VERY SPECIFIC) =====
  if (message.match(/\b(how|what).{0,25}(report|submit|file|make|create).{0,25}(issue|problem|report)\b/i)) {
    return `To report an issue:\n\n1. Click on "Report Issue" page\n2. Select issue type (road, drainage, streetlight, etc.)\n3. Click map to mark location\n4. Add description of the problem\n5. Upload photos (optional)\n6. Click "Submit Report"\n\nThat's it! Authorities will review it right away.`;
  }

  // ===== ACCOUNT-RELATED QUERIES =====
  if (message.match(/\b(sign up|register|create.*account|how.*join|new.*account)\b/i)) {
    return `Signing up for CitiTrack is easy:\n1. Click the "Sign Up" button on the home page\n2. Enter your name, email, and create a password\n3. Verify your email address\n4. You're ready to start reporting!\n\nYou'll immediately be able to submit infrastructure issues and track their progress.`;
  }

  if (message.match(/\b(login|log in|sign in|password reset|forgot password)\b/i)) {
    return `To access your CitiTrack account:\n1. Click "Login" on the home page\n2. Enter your registered email and password\n3. You'll be directed to your dashboard\n\nIf you forgot your password, click "Forgot Password" and follow the email instructions to reset it securely.`;
  }

  // ===== PROFILE AND ACCOUNT MANAGEMENT =====
  if (message.match(/\b(profile|update profile|account settings|manage account|change password)\b/i)) {
    return `You can manage your account in Settings:\n• Update your personal information\n• Change your password\n• Manage notification preferences\n• View your reporting history\n• Track all your submitted issues\n\nKeeping your profile updated helps ensure important notifications reach you!`;
  }

  // ===== WHAT CAN BE REPORTED =====
  if (message.match(/\b(what.{0,15}can|what.{0,15}type|issue type|report what|can i report)\b/i)) {
    return `You can report these infrastructure issues:\n• Road damage and potholes\n• Drainage and flooding problems\n• Broken streetlights\n• Public facility maintenance issues\n• Water system problems\n• Debris and litter accumulation\n• Traffic and safety concerns\n• Other infrastructure concerns\n\nJust describe the issue with location and photos on the Report Issue page.`;
  }

  // ===== HOW TO USE CITITRACK (GENERAL) =====
  if (message.match(/\b(how|how to).{0,20}(use|start|begin|get started).{0,20}cititrack\b/i)) {
    return `Here's how to use CitiTrack:\n\n1. Sign up or log in to your account\n2. Navigate to "Report Issue" page\n3. Select the issue type from the dropdown menu\n4. Click on the map to mark the exact location\n5. Provide a detailed description\n6. Upload photos (optional)\n7. Click "Submit Report"\n8. Track your issue status in real-time\n\nIt only takes a few minutes!`;
  }

  // ===== GPS MAPPING / LOCATION =====
  if (message.match(/\b(gps|map|location|coordinates|marker|pin)\b/i)) {
    return `Our GPS Mapping feature is powerful:\n• Pinpoint the exact location of infrastructure issues on an interactive map\n• Use your device's GPS for automatic location detection\n• Click on the map to adjust the location\n\nAccurate location data helps officials respond faster to your reports!`;
  }

  // ===== PHOTO UPLOAD =====
  if (message.match(/\b(photo|image|upload|picture|attach)\b/i)) {
    return `Photo uploads help your reports:\n• Provides visual evidence of the problem\n• Helps officials understand the severity\n• Speeds up response and resolution time\n• Include clear, well-lit photos from multiple angles\n\nWhile optional, photos significantly increase resolution chances!`;
  }

  // ===== NOTIFICATIONS =====
  if (message.match(/\b(notification|alert|update|get notified|stay informed|notify me)\b/i)) {
    return `Enable notifications in your account settings to stay updated on:\n• New comments on your reports\n• Status changes (acknowledged, in progress, resolved)\n• Messages from government agencies\n• Infrastructure issues near you\n\nThis helps you stay informed throughout the resolution process.`;
  }

  // ===== COMMUNITY / TRANSPARENCY =====
  if (message.match(/\b(community|transparency|how.*help|benefit|improve|helps city)\b/i)) {
    return `CitiTrack helps your community:\n• Faster issue resolution through centralized reporting\n• Real-time tracking of infrastructure problems\n• Better communication between citizens and government\n• Data-driven infrastructure management\n• Community engagement and transparency\n• Reduced response time to public concerns\n\nEvery report you submit makes Mati City better!`;
  }

  // ===== EMERGENCY =====
  if (message.match(/\b(urgent|emergency|critical|danger|hazard|life threat)\b/i)) {
    return `For life-threatening emergencies, please call emergency services (911) immediately!\n\nCitITrack handles non-emergency infrastructure issues. For urgent infrastructure hazards:\n1. Report it on CitiTrack for documentation\n2. Contact local authorities directly for immediate response\n3. Take photos if it's safe\n\nYour safety is the priority!`;
  }

  // ===== GENERAL FEATURES =====
  if (message.match(/\b(feature|features|what can you|capability|tool)\b/i)) {
    return `CitiTrack includes these features:\n\n• GPS Mapping - Pinpoint issue locations\n• Photo Upload - Provide visual evidence\n• Real-time Tracking - Monitor progress\n• Notifications - Stay updated\n• Dashboard - View your reports\n• Community Reports - See other issues\n\nWhich feature would you like to know more about?`;
  }

  // ===== DEFAULT HELPFUL RESPONSE =====
  return `I'm here to help! I can assist you with:\n\n• How to use CitiTrack\n• How to report an issue\n• How to track your reports\n• Account and login help\n• Sign up information\n• Features and tools\n• What issues can be reported\n• Community and transparency\n\nJust ask me anything about CitiTrack!`;
}

module.exports = { generateAIResponse, cititrackKnowledgeBase };

