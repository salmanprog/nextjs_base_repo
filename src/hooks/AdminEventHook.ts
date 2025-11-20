import { Prisma, Event } from "@prisma/client";

export default class AdminEventHook {

  // For listing multiple event categories
  static async indexQueryHook(
    query: Prisma.EventFindManyArgs,
    request?: Record<string, unknown>
  ): Promise<Prisma.EventFindManyArgs> {
    query.include = {
      category: true,
    };
    query.where = { ...query.where, deletedAt: null, status: true };
    query.orderBy = {
      createdAt: "desc",
    };
    return query;
  }

  // For fetching a single event category by id or slug
  static async showQueryHook(
    query: Prisma.EventFindUniqueArgs,
    request?: Record<string, unknown>
  ): Promise<Prisma.EventFindUniqueArgs> {
    query.include = {
      category: true,
    };
    query.where = { ...query.where, deletedAt: null, status: true };
    return query;
  }

  // Before creating a new event category
  static async beforeCreateHook(
    data: Prisma.EventCreateInput
  ): Promise<Prisma.EventCreateInput> {
    return data;
  }
}
