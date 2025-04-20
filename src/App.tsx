// src/App.tsx
/*global browser*/
/// <reference types="chrome" />
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Urls } from "../lib/interface";
import { getStorage, setStorage } from "./lib/storage";
// import { getStorage, setStorage } from "../lib/storage";

function App() {
  const [allowedURLS, setAllowedURLS] = useState<Urls[]>([]);
  const [url, setUrl] = useState("");

  const getEnabled = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(["enabled"], (result) => {
        resolve(result.enabled as boolean);
      });
    });
  };

  const handle = async () => {
    const enabled = await getEnabled();
    console.log(enabled);
  };

  const getFromBackground = (key: string): Promise<any> => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "getStorage",
          key: key,
        },
        (response) => {
          resolve(response.data);
        }
      );
    });
  };

  const saveToBackground = (key: string, value: any): Promise<void> => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "setStorage",
          key: key,
          value: value,
        },
        () => {
          resolve();
        }
      );
    });
  };

  // Load saved URLs on component mount
  useEffect(() => {
    const loadUrls = async () => {
      try {
        const result = await getStorage<Urls[]>("whitelist");
        setAllowedURLS(
          result || [
            { url: "https://stackoverflow.com/questions/*", allowed: true },
            { url: "https://www.youtube.com/", allowed: true },
          ]
        );
      } catch (error) {
        console.error("Storage error:", error);
      }
    };
    loadUrls();
  }, []);

  // Save URLs whenever they change
  useEffect(() => {
    const saveUrls = async () => {
      try {
        await setStorage("whitelist", allowedURLS);
      } catch (error) {
        console.error("Storage error:", error);
      }
    };
    saveUrls();
  }, [allowedURLS]);

  // URL validation function
  function isValidHttpUrl(url: string) {
    try {
      const res = new URL(url);
      return res.protocol === "http:" || res.protocol === "https:";
    } catch {
      return false;
    }
  }

  // Add new URL
  function addURL(url: string) {
    if (isValidHttpUrl(url) && !allowedURLS.some((u) => u.url === url)) {
      setAllowedURLS((prev) => [...prev, { url, allowed: true }]);
      setUrl(""); // Clear input after adding
    }
  }

  // Toggle URL allowed status
  const toggleAllowed = async (index: number) => {
    const updatedURLs = allowedURLS.map((item, i) =>
      i === index ? { ...item, allowed: !item.allowed } : item
    );

    setAllowedURLS(updatedURLs);

    try {
      await setStorage("whitelist", updatedURLs);
    } catch (error) {
      console.error("Error updating storage:", error);
      setAllowedURLS(allowedURLS); // Revert on error
    }
  };

  // Remove URL
  const removeURL = async (index: number) => {
    const updatedURLs = allowedURLS.filter((_, i) => i !== index);
    setAllowedURLS(updatedURLs);

    try {
      await setStorage("whitelist", updatedURLs);
    } catch (error) {
      console.error("Error removing URL:", error);
      setAllowedURLS(allowedURLS); // Revert on error
    }
  };

  return (
    <div className="flex flex-col justify-center w-[400px] h-[600px] p-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="space-w-4 flex-row">
          <div className="font-extrabold text-xl top-0">
            ConspicousConfidant
          </div>
          {/* <div> 
                <img src={Menu} alt="Dropdown Menu" />
             </div> */}
        </div>

        <h1 className="text-lg">Timer!</h1>

        <div className="flex w-full gap-2">
          <input
            className="border flex-1 p-2 rounded"
            name="item"
            type="text"
            placeholder="Enter URL (e.g., youtube.com)"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => addURL(url)}
          >
            Add URL
          </button>
        </div>

        <div className="w-full space-y-2 max-h-[400px] overflow-y-auto">
          {allowedURLS.map((url, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-gray-100 rounded"
            >
              <span className={url.allowed ? "" : "line-through text-gray-500"}>
                {url.url}
              </span>
              <div className="flex gap-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={url.allowed}
                    onChange={() => toggleAllowed(i)}
                    className="ml-2 h-4 w-4"
                  />
                </label>
                <button
                  onClick={() => removeURL(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
