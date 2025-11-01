import { Prisma, UserType } from "@prisma/client";

export default class UserHook {

  static async indexQueryHook(
    query: Prisma.UserFindManyArgs,
    request?: Record<string, unknown>
  ): Promise<Prisma.UserFindManyArgs> {

    query.include = {
      userRole: true,
      apiTokens: true,
    };
    query.where = { ...query.where, deletedAt: null,userGroupId: 2 };
    
    if (request && typeof request.q === "string") {
      query.where = {
        ...query.where,
        name: {
          contains: request.q,
          mode: "insensitive",
        } as Prisma.StringFilter,
      };
    }

    if (request && typeof request.userType === "string") {
        query.where = {
            ...query.where,
            userType: request.userType as UserType,
        };
    }
    return query;
  }

  static async showQueryHook(
    query: Prisma.UserFindUniqueArgs
  ): Promise<Prisma.UserFindUniqueArgs> {

    query.include = {
      userRole: {
        select: { title: true, slug: true },
      },
      apiTokens: {
        select: {
          api_token: true,
          device_type: true,
          created_at: true,
        },
      },
    };

    query.where = { ...query.where, deletedAt: null };

    return query;
  }

  static async beforeCreateHook(
    data: Prisma.UserCreateInput
  ): Promise<Prisma.UserCreateInput> {
   
    // if (!data.slug && data.name) {
    //   data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
    // }

    // if (!data.username) {
    //   data.username =
    //     "user_" + Math.random().toString(36).substring(2, 8).toUpperCase();
    // }

    return data;
  }
}
