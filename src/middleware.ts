import { NextRequest, NextResponse } from 'next/server';

// List of allowed origins for development
const allowedOrigins = [
  'preview-chat-c97e8f71-cae4-4ce2-84b9-470cc2f06379.space.z.ai',
  'localhost:3000',
  '127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://localhost:3000',
  'https://127.0.0.1:3000',
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 });
    
    // Add CORS headers for preflight
    if (process.env.NODE_ENV === 'development') {
      if (allowedOrigins.includes(origin) || !origin) {
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
      } else {
        response.headers.set('Access-Control-Allow-Origin', '*');
      }
      
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
    }
    
    return response;
  }
  
  // Handle regular requests
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add CORS headers for development
  if (process.env.NODE_ENV === 'development') {
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin) || !origin) {
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
    } else {
      response.headers.set('Access-Control-Allow-Origin', '*');
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};