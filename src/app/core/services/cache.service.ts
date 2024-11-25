import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, { data: unknown; expiry: number }>();

  constructor() {}

  setCache(key: string, data: unknown, ttl: number = 8000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  getCache(key: string): unknown | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
