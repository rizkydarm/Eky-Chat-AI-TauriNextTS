export interface IDatabase {
  execute(sql: string, bindings?: unknown[]): Promise<void>;
  select<T>(sql: string, bindings?: unknown[]): Promise<T[]>;
  close(): Promise<void>;
}
