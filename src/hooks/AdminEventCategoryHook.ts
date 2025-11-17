import { Prisma, EventCategory } from "@prisma/client";

export default class AdminEventCategoryHook {

  // For listing multiple event categories
  static async indexQueryHook(
    query: Prisma.EventCategoryFindManyArgs,
    request?: Record<string, unknown>
  ): Promise<Prisma.EventCategoryFindManyArgs> {
    query.where = { ...query.where, deletedAt: null, status: true };
    return query;
  }

  // For fetching a single event category by id or slug
  static async showQueryHook(
    query: Prisma.EventCategoryFindUniqueArgs,
    request?: Record<string, unknown>
  ): Promise<Prisma.EventCategoryFindUniqueArgs> {
    query.where = { ...query.where, deletedAt: null, status: true };
    return query;
  }

  // Before creating a new event category
  static async beforeCreateHook(
    data: Prisma.EventCategoryCreateInput
  ): Promise<Prisma.EventCategoryCreateInput> {
    return data;
  }
}
