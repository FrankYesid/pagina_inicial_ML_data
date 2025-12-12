// Client-side configuration for handling preview domain connections
export const clientConfig = {
  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3
  },
  
  // Preview domain configuration
  preview: {
    domain: 'preview-chat-c97e8f71-cae4-4ce2-84b9-470cc2f06379.space.z.ai',
    allowedOrigins: [
      'preview-chat-c97e8f71-cae4-4ce2-84b9-470cc2f06379.space.z.ai',
      'localhost:3000',
      '127.0.0.1:3000'
    ]
  },
  
  // WebSocket configuration
  websocket: {
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000',
    transports: ['websocket', 'polling'],
    timeout: 20000
  },
  
  // Development mode settings
  development: {
    enableLogging: true,
    enableHotReload: true,
    suppressWarnings: true
  }
};

export default clientConfig;