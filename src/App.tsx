import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";

function App() {
  // // Pomodoro timer states
  // const [breakTime, setBreakTime] = useState<number>(5);
  // const [sessionTime, setSessionTime] = useState<number>(25);
  // const [isRunning, setIsRunning] = useState<boolean>(false);
  // const [repeats, setRepeats] = useState<number>(0);

  // URL input states
  const [allowedURLS, setAllowedURLS] = useState<string[]>([
    "https://stackoverflow.com/questions/*",
    "https://www.youtube.com/",
  ]);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isUrlLoading, setIsUrlLoading] = useState(false);

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
      setAllowedURLS((prev) => [...prev, url]);
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
      <div className="font-extrabold"> 
          ConspicousConfidant
        </div>

        <h1>Timer</h1>
        
        <input
          className="border w-[20vw]"
          name="item"
          type="text"
          placeholder="youtube"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />
        <button onClick={() => addURL(url)}>Add URL</button>
      </div>
    </div>
  );
  // // URL input states
  // const [allowedURLS, setAllowedURLS] = useState<string[]>([
  //   "https://stackoverflow.com/questions/*",
  //   "https://www.youtube.com/",
  // ]);
  // const [url, setUrl] = useState("");
  // const [isUrlValid, setIsUrlValid] = useState(false);
  // const [isUrlLoading, setIsUrlLoading] = useState(false);
  // return <></>;

  
}

export default App;
