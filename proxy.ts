import { jwtMiddleware } from "./src/middleware/jwtMiddleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedApiRoutes = [
  { path: "/api/users", methods: ["GET", "PATCH"] },
  { path: "/api/admin/profile", methods: ["GET", "PATCH"] },
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const adminToken = req.cookies.get("token")?.value;
  const isApiProtected = protectedApiRoutes.some(
    (r) => pathname.startsWith(r.path) && r.methods.includes(method)
  );
  if (isApiProtected) {
    return await jwtMiddleware(req);
  }
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/@auth") &&
    !pathname.startsWith("/admin/login")
  ) {
    if (!adminToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  if (
    (pathname === "/admin/login" || pathname.startsWith("/admin/@auth")) &&
    adminToken
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
