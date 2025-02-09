import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export default async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  console.log('Middleware triggered for:', request.nextUrl.pathname);
  console.log('Token found:', token);

  if (!token) {
    console.log('No token found. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the JWT token
    jwt.verify(token, SECRET_KEY);
    console.log('Token is valid. Allowing access.');
    return NextResponse.next();
  } catch (error) {
    console.log('Invalid or expired token. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Define which routes should be protected
export const config = {
  matcher: ['/admin/:path*'], // Protect all routes under /admin
};