export interface Store {

  save(key: string, value: string);

  load(key: string): string;

  has(key: string): boolean;

  keys(): string[];
}
