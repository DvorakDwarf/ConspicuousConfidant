// src/lib/storage.ts
import { storage } from './browser-polyfill';

type StorageKey = 'whitelist'; // Add other keys as needed

export const getStorage = async <T>(key: StorageKey): Promise<T | undefined> => {
  try {
    const result = await storage.local.get(key);
    return result[key];
  } catch (error) {
    console.error('Storage get error:', error);
    return undefined;
  }
};

export const setStorage = async <T>(key: StorageKey, value: T): Promise<void> => {
  try {
    await storage.local.set({ [key]: value });
  } catch (error) {
    console.error('Storage set error:', error);
  }
};

// export const removeFromStorage = async (key: StorageKey): Promise<void> => {
//   try {
//     if (storage.local) {
//       await storage.local.remove(key);
//     } else {
//       // Fallback for localStorage
//       localStorage.removeItem(key);
//     }
//   } catch (error) {
//     console.error('Storage remove error:', error);
//   }
// };