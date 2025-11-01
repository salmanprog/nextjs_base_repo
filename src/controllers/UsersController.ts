import type { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import RestController from "@/core/RestController";
import { storeUser, updateUser } from "@/validators/user.validation";
import UserResource from "@/resources/UserResource";
import { NextResponse } from "next/server";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { generateSlug } from "@/utils/slug";
import { createUserToken } from "@/utils/token";
import UserHook from "@/hooks/UserHook";

export type ExtendedUser = User & { image?: string };

export default class UsersController extends RestController<
  Prisma.UserDelegate<DefaultArgs>,
  ExtendedUser
> {
  constructor(data?: Partial<ExtendedUser>) {
    super(prisma.user as unknown as Prisma.UserDelegate<DefaultArgs> & {
      findMany: (...args: unknown[]) => Promise<unknown>;
      findUnique?: (...args: unknown[]) => Promise<unknown>;
      create?: (...args: unknown[]) => Promise<unknown>;
      update?: (...args: unknown[]) => Promise<unknown>;
      delete?: (...args: unknown[]) => Promise<unknown>;
    });

    this.data = data ?? {};
    this.resource = UserResource;
    this.hook = UserHook;
  }

  protected async validation(action: string) {
    switch (action) {
      case "store":
        return await this.__validate(storeUser, this.data ?? {});
      case "update":
        return await this.__validate(updateUser, this.data ?? {});
    }
  }

  protected async beforeStore(): Promise<void | NextResponse> {
    const email = this.data?.email;
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return this.sendError("Validation failed", { email: "Email already exists" }, 422);
      }
    }

    if (this.data?.name) {
      this.data.slug = await generateSlug("user", this.data.name);
      this.data.username = await generateSlug("user", this.data.name);
    }

    if (typeof this.data?.password === "string") {
      const bcrypt = await import("bcryptjs");
      this.data.password = await bcrypt.hash(this.data.password, 10);
    }
  }

  protected async afterStore(record: ExtendedUser): Promise<ExtendedUser> {
    await createUserToken(
      record.id,
      "web"
    );
    return record;
  }

  protected async beforeUpdate(): Promise<void | NextResponse> {
    const userId = this.data?.id;
    if (!userId) return this.sendError("User ID is missing", {}, 400);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return this.sendError("User not found", {}, 404);

    const image = this.data?.image;
    if (image && !/\.(jpg|jpeg|png)$/i.test(image)) {
      return this.sendError("Invalid image format", { image: "Only JPG/PNG allowed" }, 422);
    }
  }

  protected async afterUpdate(record: ExtendedUser): Promise<ExtendedUser> {
    return record;
  }
}
