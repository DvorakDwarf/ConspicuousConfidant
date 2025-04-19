import "./App.css";
import { useState } from "react";

function App() {
  // Pomodoro timer states
  const [breakTime, setBreakTime] = useState<number>(5);
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [repeats, setRepeats] = useState<number>(0);

  // URL input states
  const [allowedURLS, setAllowedURLS] = useState<string[]>([
    "https://stackoverflow.com/questions/*",
    "https://www.youtube.com/",
  ]);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isUrlLoading, setIsUrlLoading] = useState(false);
  return <></>;
}

export default App;
