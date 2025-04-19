// types/webextension.d.ts
interface FirefoxBrowser {
    storage: {
      local: {
        get: (keys?: string | string[] | object | null) => Promise<object>;
        set: (items: object) => Promise<void>;
        // Add other methods as needed
      };
      // Add other storage areas if needed
    };
    // Add other browser APIs you use
  }
  
  declare const browser: FirefoxBrowser;