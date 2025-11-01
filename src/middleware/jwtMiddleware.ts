import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../utils/jwt";

export function jwtMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Optionally forward user info
  const res = NextResponse.next();
  res.headers.set("x-user-id", String(decoded.id));
  return res;
}
