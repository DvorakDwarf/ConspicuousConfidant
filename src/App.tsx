import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Urls } from "../lib/interface";

function App() {
  // // Pomodoro timer states
  // const [breakTime, setBreakTime] = useState<number>(5);
  // const [sessionTime, setSessionTime] = useState<number>(25);
  // const [isRunning, setIsRunning] = useState<boolean>(false);
  // const [repeats, setRepeats] = useState<number>(0);

  // URL input states
  const [allowedURLS, setAllowedURLS] = useState<Urls[]>([
    {
      url: "https://stackoverflow.com/questions/*",
      allowed: true,
    },
    {
      url: "https://www.youtube.com/",
      allowed: true,
    },
  ]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(allowedURLS);
  }, [allowedURLS]);

  function isValidHttpUrl(url: string) {
    let res;
    try {
      res = new URL(url);
    } catch (_) {
      return false;
    }

    return res.protocol === "http:" || res.protocol === "https:";
  }

  function addURL(url: string) {
    if (isValidHttpUrl(url)) {
      setAllowedURLS((prev) => [...prev, { url, allowed: true }]);
    }
  }
  const toggleAllowed = (index: number) => {
    setAllowedURLS((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        allowed: !updated[index].allowed,
      };
      return updated;
    });
  };

  return (
    <div className="flex flex-col justify-center w-[400px] h-[600px] p-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="font-extrabold text-xl">ConspicousConfidant</div>
        <h1 className="text-lg">Timer</h1>

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

        <div className="w-full space-y-2">
          {allowedURLS.map((url, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-gray-100 rounded"
            >
              <span className={url.allowed ? "" : "line-through text-gray-500"}>
                {url.url}
              </span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={url.allowed}
                  onChange={() => toggleAllowed(i)}
                  className="ml-2 h-4 w-4"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
