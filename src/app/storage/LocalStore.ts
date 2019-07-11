import {Store} from './Store';

export class LocalStore implements Store {

  public load(key: string): string {
    return localStorage.getItem(key);
  }

  public save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public keys(): string[] {
    return Object.keys(localStorage);
  }

  public delete(key: string) {
    localStorage.removeItem(key);
  }
}
