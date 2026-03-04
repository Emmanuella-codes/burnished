import type { NextRequest } from "next/server";
import { proxy } from "./src/proxy";

export const config = {
  matcher: [
    "/burned",
    "/burned/:path*",
    "/editor",
    "/editor/:path*",
  ],
};

export default function middleware(req: NextRequest) {
  return proxy(req);
}
