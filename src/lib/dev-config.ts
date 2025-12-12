// Development server configuration for handling preview domain connections
export const config = {
  // Development server settings
  port: 3000,
  host: '0.0.0.0', // Allow connections from any host
  
  // CORS configuration for preview domains
  cors: {
    origin: [
      'preview-chat-c97e8f71-cae4-4ce2-84b9-470cc2f06379.space.z.ai',
      'localhost:3000',
      '127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://localhost:3000',
      'https://127.0.0.1:3000',
      '*'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    maxAge: 86400 // 24 hours
  },
  
  // WebSocket configuration for real-time features
  websocket: {
    origin: '*',
    transports: ['websocket', 'polling']
  }
};

export default config;