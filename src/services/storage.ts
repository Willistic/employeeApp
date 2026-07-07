/**
 * A minimal, typed persistence abstraction.
 *
 * Depending on an interface (rather than calling `window.localStorage`
 * directly throughout the app) keeps the storage mechanism swappable
 * (e.g. to a REST API) and makes the data layer trivial to mock in tests.
 */
export interface Storage {
  read<T>(key: string): T | null;
  write<T>(key: string, value: T): void;
  remove(key: string): void;
}

export class LocalStorage implements Storage {
  read<T>(key: string): T | null {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (error) {
      console.error(`Failed to read "${key}" from localStorage`, error);
      return null;
    }
  }

  write<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to write "${key}" to localStorage`, error);
    }
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
}
