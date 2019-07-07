import {Store} from './Store';

export class LocalStore implements Store {

  load(key: string): string {
    return localStorage.getItem(key);
  }

  save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  keys(): string[] {
    return Object.keys(localStorage);
  }
}
