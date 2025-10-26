import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  
  // check if it's a protected route
  if (pathname.startsWith('/burned') || pathname.startsWith('/editor')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    console.log('✅ Token found, allowing access');
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/burned',
    '/burned/:path*',
    '/editor',
    '/editor/:path*'
  ],
};
