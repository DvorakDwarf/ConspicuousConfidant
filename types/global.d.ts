// src/types/global.d.ts
import 'webextension-polyfill';

declare global {
  interface Window {
    browser: typeof browser;
  }
}