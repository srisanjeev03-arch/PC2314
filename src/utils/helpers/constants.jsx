export const HELPER_PROMPTS = {
  study: [
    "Help me create a study schedule for my upcoming exams",
    "I'm struggling with time management, can you help?",
    "Explain effective note-taking techniques",
    "How can I improve my focus while studying?",
    "Help me break down this complex topic into manageable parts"
  ],
  mindfulness: [
    "Guide me through a quick breathing exercise",
    "I'm feeling anxious, help me calm down",
    "Share a mindfulness technique I can practice",
    "Help me practice gratitude today",
    "Guide me through a body scan meditation"
  ],
  wellness: [
    "I'm feeling stressed about school, can you help?",
    "Help me develop better sleep habits",
    "I'm struggling with motivation, any advice?",
    "How can I build better daily routines?",
    "Help me manage my anxiety about the future"
  ]
};

export const MOOD_OPTIONS = ['😊', '😢', '😠', '😴', '😰', '😌', '🤔', '🎉'];

export const COUNSELING_STYLES = [
  { value: 'compassionate', label: 'Compassionate', description: 'Warm and empathetic' },
  { value: 'practical', label: 'Practical', description: 'Action-oriented advice' },
  { value: 'clinical', label: 'Clinical', description: 'Professional and direct' },
  { value: 'supportive', label: 'Supportive', description: 'Encouraging and positive' }
];

export const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Small', size: '14px' },
  { value: 'medium', label: 'Medium', size: '16px' },
  { value: 'large', label: 'Large', size: '18px' },
  { value: 'xlarge', label: 'Extra Large', size: '20px' }
];

export const AI_PROVIDERS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI GPT models',
    docsUrl: 'https://platform.openai.com/api-keys',
    placeholder: 'sk-...'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google AI models',
    docsUrl: 'https://aistudio.google.com/app/apikey',
    placeholder: 'AIza...'
  },
  {
    id: 'groq',
    name: 'Groq',
    description: 'High-speed inference',
    docsUrl: 'https://console.groq.com/keys',
    placeholder: 'gsk_...'
  }
];