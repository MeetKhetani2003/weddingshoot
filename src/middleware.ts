import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect /admin and /api/admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    const validPassword = process.env.ADMIN_PASSWORD;
    
    if (!token || token !== validPassword) {
      // If it's an API route, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // If it's a page route, redirect to /login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Prevent logged-in admins from seeing the login page
  if (pathname === '/login') {
    const token = request.cookies.get('admin_token')?.value;
    const validPassword = process.env.ADMIN_PASSWORD;
    if (token && token === validPassword) {
      return NextResponse.redirect(new URL('/admin/home', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/login'],
};
