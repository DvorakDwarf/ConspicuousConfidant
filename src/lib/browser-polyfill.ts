// src/lib/browser-polyfill.ts
import browser from 'webextension-polyfill';

// Export the browser API with proper typing
export const extensionBrowser = typeof browser !== 'undefined' ? browser : null;

// Fallback storage implementation for development
const fallbackStorage = {
  async get(key: string) {
    const item = localStorage.getItem(key);
    return { [key]: item ? JSON.parse(item) : null };
  },
  async set(items: Record<string, any>) {
    for (const [key, value] of Object.entries(items)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

// Unified storage interface
export const storage = {
  local: extensionBrowser?.storage?.local || fallbackStorage
};