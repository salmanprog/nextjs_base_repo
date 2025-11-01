import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtMiddleware } from "./src/middleware/jwtMiddleware";

const protectedRoutes: { path: string; methods: string[] }[] = [
  { path: "/api/users", methods: ["GET","PATCH"] },
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const isProtected = protectedRoutes.some(
    (route) =>
      pathname.startsWith(route.path) && route.methods.includes(method)
  );

  if (isProtected) {
    return jwtMiddleware(req);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
