/// <reference types="chrome" />
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Urls } from "../lib/interface";
import { setStorage } from "./lib/storage";
import Hamburger from "./assets/Hamburger.svg";

function App() {
  const [allowedURLS, setAllowedURLS] = useState<Urls[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeBeforeTrolling, setTimeBeforeTrolling] = useState<number>(0);
  const [timeBeforeSwitch, setTimeBeforeSwitch] = useState<number>(0);
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [url, setUrl] = useState("");

  // In background script:
  async function initializeStorage() {
    await chrome.storage.local.set({
      whitelist: [
        { url: "stackoverflow.com", allowed: true },
        // ... other defaults
      ],
      wait_time: 1000 * 10,
      troll_time: 1000 * 4,
      enabled: false,
    });
    console.log("Storage initialized");
  }

  initializeStorage().catch(console.error);

  const getEnabled = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(["enabled"], (result) => {
        resolve(result.enabled as boolean);
      });
    });
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

  const setTimer = (
    key: { key1: string; key2: string; key3: string },
    value: { troll_time: number; wait_time: number; enabled: boolean }
  ): Promise<void> => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "activate",
          key: key,
          value: value,
        },
        () => {
          resolve();
        }
      );
    });
  };

  useEffect(() => {
    getEnabled().then((enabled) => {
      setIsActive(enabled);
    });
  });

  // Load saved URLs on component mount
  useEffect(() => {
    const loadUrls = async () => {
      try {
        const result = await getFromBackground("whitelist");
        if (result) {
          // Convert from string array to object array if needed
          const formatted = Array.isArray(result)
            ? result.map((url) =>
                typeof url === "string" ? { url, allowed: true } : url
              )
            : [];
          setAllowedURLS(formatted);
        }
      } catch (error) {
        console.error("Storage error:", error);
        setAllowedURLS([]);
      }
    };
    loadUrls();
  }, []);

  // Save URLs whenever they change
  useEffect(() => {
    if (allowedURLS.length > 0) {
      // Only save if we have data
      const saveUrls = async () => {
        try {
          await saveToBackground("whitelist", allowedURLS);
        } catch (error) {
          console.error("Storage error:", error);
        }
      };
      saveUrls();
    }
  }, [allowedURLS]);

  useEffect(() => {
    const activate = async () => {
      try {
        await setTimer(
          { key1: "troll_time", key2: "wait_time", key3: "enabled" },
          {
            troll_time: timeBeforeTrolling,
            wait_time: timeBeforeSwitch,
            enabled: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    activate();
  }, [activeTimer]);

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center w-[400px] h-[600px] p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="absolute flex flex-row justify-between bg-gray-800 text-white top-0 w-screen">
          <div className="flex space-y-4">ConspicousConfidant</div>
          <div className="relative">
            <img
              src={Hamburger}
              alt="Dropdown Menu"
              onClick={toggleDropdown}
              className="w-8 h-8 cursor-pointer"
            />
          </div>
          {isDropdownOpen} && return(
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md z-50">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Dropdown Item
            </div>
            );
          </div>
          <h1 className="text-lg">Timer</h1>
          <div className="flex w-full grap-2">
            <div className="flex flex-col">
              <h2>Time Before Trolling</h2>
              <input
                className="border flex-1 p-2 rounded"
                name="item"
                type="number"
                placeholder="Enter Time (e.g. 5 min)"
                value={timeBeforeTrolling}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTimeBeforeTrolling(Number(e.target.value))
                }
              />
              <h2>Time Before switching</h2>
              <input
                className="border flex-1 p-2 rounded"
                name="item"
                type="number"
                placeholder="Enter Time (e.g. 5 min)"
                value={timeBeforeSwitch}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTimeBeforeSwitch(Number(e.target.value))
                }
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActiveTimer(true)}
            >
              Add Time
            </button>
          </div>
          <h1 className="text-lg">Add URLs</h1>
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
                <span
                  className={url.allowed ? "" : "line-through text-gray-500"}
                >
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
          <h1 className="text-white">{isActive}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
