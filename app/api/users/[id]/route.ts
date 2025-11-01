import UsersController, { ExtendedUser } from "@/controllers/UsersController";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
// ------------------- GET (show) -------------------
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const controller = new UsersController();
    const id = parseInt(params.id, 10);
    return await controller.show(id);
  } catch (error: unknown) {
    return NextResponse.json(
      { code: 500, message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ------------------- PATCH (update) -------------------
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ code: 400, message: "Invalid user ID" }, { status: 400 });
  }

  const contentType = request.headers.get("content-type") || "";
  const data: Partial<ExtendedUser> = {};

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    // Type-safe assignment
    formData.forEach((value, key) => {
        const typedKey = key as keyof ExtendedUser;
        if (typeof value === "string") {
          if (typedKey === "name" || typedKey === "email" || typedKey === "password" || typedKey === "image") {
            data[typedKey] = value;
          }
        } else if (value instanceof Blob && typedKey === "image") {
          data.image = URL.createObjectURL(value);
        }
      });
  } else {
    const jsonBody = await request.json();
    Object.assign(data, jsonBody); // safely merge JSON data
  }

  try {
    const controller = new UsersController(data);
    return await controller.update(id, data);
  } catch (error: unknown) {
    return NextResponse.json(
      { code: 500, message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ------------------- DELETE (destroy) -------------------
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const id = parseInt(params.id, 10);
    const controller = new UsersController();
    return await controller.destroy(id);
  } catch (error: unknown) {
    return NextResponse.json(
      { code: 500, message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
