export abstract class CoreRepository {
  abstract findAll(): Promise<any[]>;
  abstract findOne(criteria: Record<string, any>): Promise<any | null>;
  abstract createOne(data: Record<string, any>): Promise<any>;
  abstract updateOne(
    criteria: Record<string, any>,
    data: Record<string, any>,
  ): Promise<boolean>;
  abstract deleteOne(criteria: Record<string, any>): Promise<boolean>;
}
