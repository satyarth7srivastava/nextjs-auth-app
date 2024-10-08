import { url } from 'inspector';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verify';
  const token = req.cookies.get('token')?.value;
  if (path === '/' && token) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
}



export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verify',
  ]
}