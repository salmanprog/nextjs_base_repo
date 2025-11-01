import { NextResponse } from "next/server";
import Controller from "./Controller";

type PrismaCompatibleModel = {
  findMany: (...args: unknown[]) => Promise<unknown>;
  findUnique?: (...args: unknown[]) => Promise<unknown>;
  create?: (...args: unknown[]) => Promise<unknown>;
  update?: (...args: unknown[]) => Promise<unknown>;
  delete?: (...args: unknown[]) => Promise<unknown>;
};

export interface QueryHook<TQuery = Record<string, unknown>, TRequest = Record<string, unknown>> {
  indexQueryHook?(query: TQuery, request?: TRequest): Promise<TQuery>;
  showQueryHook?(query: TQuery, request?: TRequest): Promise<TQuery>;
}

export default abstract class RestController<
  // keep TModel unconstrained so Prisma delegate types fit
  TModel = unknown,
  TEntity extends Record<string, unknown> = Record<string, unknown>,
  THook extends QueryHook = QueryHook
> extends Controller {
  // model must satisfy PrismaCompatibleModel shape at runtime/type intersection
  protected model: TModel & PrismaCompatibleModel;
  protected hook?: THook;
  protected resource:
    | (new () => {
        collection?: (records: TEntity[]) => Promise<unknown>;
        toArray?: (record: TEntity) => Promise<unknown>;
      })
    | null = null;

  protected messages: Record<string, string> = {
    list: "Records fetched successfully",
    store: "Record created successfully",
    show: "Record fetched successfully",
    update: "Record updated successfully",
    delete: "Record deleted successfully",
  };

  protected data: Partial<TEntity> | null = null;

  constructor(model: TModel & PrismaCompatibleModel) {
    super();
    this.model = model;
  }

  // ---------- Hooks ----------
  protected async validation(
    action?: string
  ): Promise<
    | { success: true; data?: Partial<TEntity> }
    | { success: false; errors?: Record<string, string>; message: string; status: number }
    | void
  > {
    // reference `action` so linters won't complain about unused param
    if (!action) return;
    return;
  }

  protected async beforeIndex(): Promise<NextResponse | void> {
    return;
  }
  protected async afterIndex(records: TEntity[]): Promise<TEntity[]> {
    return records;
  }

  protected async beforeStore(): Promise<NextResponse | void> {
    return;
  }
  protected async afterStore(record: TEntity): Promise<TEntity> {
    return record;
  }

  protected async beforeShow(): Promise<NextResponse | void> {
    return;
  }
  protected async afterShow(record: TEntity): Promise<TEntity> {
    return record;
  }

  protected async beforeUpdate(): Promise<NextResponse | void> {
    return;
  }
  protected async afterUpdate(record: TEntity): Promise<TEntity> {
    return record;
  }

  protected async beforeDestroy(): Promise<NextResponse | void> {
    return;
  }
  protected async afterDestroy(): Promise<void> {
    return;
  }
  
 
 protected async getQueryHook(
  action: string,
  query: Record<string, unknown>,
  request?: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const actionMap: Record<string, keyof THook> = {
    index: "indexQueryHook",
    show: "showQueryHook",
    // add more mappings if needed
  };

  const hookKey = actionMap[action];
  if (!hookKey) return query;

  const fn = this.hook?.[hookKey];
  if (typeof fn === "function") {
    return fn(query, request) as Promise<Record<string, unknown>>;
  }
  return query;
}

  // ---------- CRUD ----------
  async index(): Promise<NextResponse> {
    try {
      await this.beforeIndex();
      let query: Record<string, unknown> = {};

    const requestData: Record<string, unknown> = this.__request
      ? {
          query: Object.fromEntries(new URL(this.__request.url).searchParams),
          headers: Object.fromEntries(this.__request.headers.entries()),
          method: this.__request.method,
        }
      : {};

    query = await this.getQueryHook("index", query, requestData);

    const records = (await this.model.findMany(query)) as TEntity[];
      const processed = await this.afterIndex(records);
      return this.__sendResponse(200, this.messages.list, processed);
    } catch (err) {
      return this.sendError((err as Error).message, {}, 500);
    }
  }

  async store(data: Partial<TEntity>): Promise<NextResponse> {
    this.data = data;
    const validation = await this.validation("store");
    if (validation && "success" in validation && !validation.success)
      return this.sendError("Validation failed", validation.errors ?? {}, 422);

    try {
      const beforeResponse = await this.beforeStore();
      if (beforeResponse) return beforeResponse;

      const record = (await this.model.create?.({ data })) as TEntity;
      const processed = await this.afterStore(record);
      return this.__sendResponse(201, this.messages.store, processed);
    } catch (err) {
      return this.sendError((err as Error).message, {}, 500);
    }
  }

  async show(id: number): Promise<NextResponse> {
    try {
      await this.beforeShow();
      const record = (await this.model.findUnique?.({ where: { id } })) as TEntity | null;
      if (!record) return this.sendError("Record not found", {}, 404);

      const processed = await this.afterShow(record);
      return this.__sendResponse(200, this.messages.show, processed);
    } catch (err) {
      return this.sendError((err as Error).message, {}, 500);
    }
  }

  async update(id: number, data: Partial<TEntity>): Promise<NextResponse> {
    this.data = data;
    const validation = await this.validation("update");
    if (validation && "success" in validation && !validation.success)
      return this.sendError("Validation failed", validation.errors ?? {}, 422);

    try {
      await this.beforeUpdate();
      const record = (await this.model.update?.({ where: { id }, data })) as TEntity;
      const processed = await this.afterUpdate(record);
      return this.__sendResponse(200, this.messages.update, processed);
    } catch (err) {
      return this.sendError((err as Error).message, {}, 500);
    }
  }

  async destroy(id: number): Promise<NextResponse> {
    try {
      await this.beforeDestroy();
      await this.model.delete?.({ where: { id } });
      await this.afterDestroy();
      return this.__sendResponse(200, this.messages.delete, {});
    } catch (err) {
      return this.sendError((err as Error).message, {}, 500);
    }
  }

  // ---------- RESPONSE ----------
  protected async __sendResponse<T extends Record<string, unknown> | unknown[]>(
    status = 200,
    message = "success",
    data: T | { data?: T; meta?: Record<string, number> } = {} as T
  ): Promise<NextResponse> {
    try {
      let transformedData: unknown = data;
      if (this.resource) {
        const resource = new this.resource();
        if (Array.isArray(data) && typeof resource.collection === "function") {
          transformedData = await resource.collection(data as TEntity[]);
        } else if (typeof resource.toArray === "function") {
          transformedData = await resource.toArray(data as TEntity);
        }
      }

      return NextResponse.json({ code: status, message, data: transformedData }, { status });
    } catch (error) {
      return this.sendError((error as Error).message, {}, 500);
    }
  }
}
