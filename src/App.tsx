import "./App.css";
import { ChangeEvent, ReactHTMLElement, useEffect, useState } from "react";

function App() {
  // // Pomodoro timer states
  // const [breakTime, setBreakTime] = useState<number>(5);
  // const [sessionTime, setSessionTime] = useState<number>(25);
  // const [isRunning, setIsRunning] = useState<boolean>(false);
  // const [repeats, setRepeats] = useState<number>(0);

<<<<<<< HEAD
  // URL input states
  const [allowedURLS, setAllowedURLS] = useState<string[]>([
    "https://stackoverflow.com/questions/*",
    "https://www.youtube.com/",
  ]);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isUrlLoading, setIsUrlLoading] = useState(false);

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <h1>Timer</h1>
        <input
          className="border w-[50vw]"
          name="item"
          type="text"
          placeholder="youtube"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />
      </div>
    </div>
  );
=======
  // // URL input states
  // const [allowedURLS, setAllowedURLS] = useState<string[]>([
  //   "https://stackoverflow.com/questions/*",
  //   "https://www.youtube.com/",
  // ]);
  // const [url, setUrl] = useState("");
  // const [isUrlValid, setIsUrlValid] = useState(false);
  // const [isUrlLoading, setIsUrlLoading] = useState(false);
  // return <></>;

  
>>>>>>> 457a101 (Struggling with loading)
}

export default App;
