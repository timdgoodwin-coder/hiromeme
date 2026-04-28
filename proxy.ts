import { NextRequest, NextResponse } from 'next/server';

const USERNAME = 'hiro';
const PASSWORD = 'hiromeme2024!';
const AUTH_COOKIE = 'hiro_auth';
const AUTH_TOKEN = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and API login through
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE);
  if (authCookie?.value === AUTH_TOKEN) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts).*)'],
};
