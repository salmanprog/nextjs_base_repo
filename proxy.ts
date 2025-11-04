import { jwtMiddleware } from "./src/middleware/jwtMiddleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [{ path: "/api/users", methods: ["GET", "PATCH"] }];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  const isProtected = protectedRoutes.some(
    (r) => pathname.startsWith(r.path) && r.methods.includes(method)
  );

  if (isProtected) return await jwtMiddleware(req);
  return NextResponse.next();
}
