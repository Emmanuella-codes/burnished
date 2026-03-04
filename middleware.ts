import type { NextRequest } from "next/server";
import { config, proxy } from "./src/proxy";

export { config };

export default function middleware(req: NextRequest) {
  return proxy(req);
}
