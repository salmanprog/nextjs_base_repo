import UsersController from "@/controllers/UsersController";
import { verifyToken } from "@/utils/jwt";

export const runtime = "nodejs"; // required for jsonwebtoken

type FormDataObject = Record<string, string | Blob>;

interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

// Helper to get user from request
function getUserFromRequest(req: Request): DecodedToken | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded === "string") return null;

  return decoded as DecodedToken;
}

// POST route - signup (no JWT required)
export async function POST(req: Request) {
  const formData = await req.formData();
  const data: FormDataObject = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      data[key] = value;
    } else {
      data[key] = value as Blob;
    }
  });

  const controller = new UsersController(data);
  return controller.store(data);
}

// GET route - protected (requires JWT)
export async function GET(req: Request) {
  const user = getUserFromRequest(req);
  // if (!user) {
  //   return new Response(
  //     JSON.stringify({
  //       code: 401,
  //       message: "Authorization failed",
  //       data: { authorization: "Missing or invalid token" },
  //     }),
  //     { status: 401, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  // Convert JWT id (string) to number for Prisma
  const controller = new UsersController({ id: Number(user?.id) });
  return controller.index();
}
