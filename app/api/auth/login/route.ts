import { NextRequest, NextResponse } from 'next/server';

const USERNAME = 'hiro';
const PASSWORD = 'hiromeme2024!';
const AUTH_COOKIE = 'hiro_auth';
const AUTH_TOKEN = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (username === USERNAME && password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
