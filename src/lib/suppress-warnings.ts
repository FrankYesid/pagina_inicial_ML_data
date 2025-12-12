// Suppress extension warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Suppress Grammarly and other browser extension warnings
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    
    // Filter out extension-related warnings
    if (message.includes('data-new-gr-c-s-check-loaded') || 
        message.includes('data-gr-ext-installed') ||
        message.includes('Grammarly') ||
        message.includes('extension') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension')) {
      return;
    }
    
    originalConsoleError.apply(console, args);
  };
  
  // Also filter console.warn
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    
    if (message.includes('data-new-gr-c-s-check-loaded') || 
        message.includes('data-gr-ext-installed') ||
        message.includes('Grammarly') ||
        message.includes('extension') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension')) {
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };
}