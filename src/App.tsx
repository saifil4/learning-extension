import "./App.css";
import { useState } from "react";

function App() {
  const [language, setLanguage] = useState<string>("");

  const sendMessage = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab) {
      chrome.tabs.sendMessage(
        tab.id as number,
        { action: "getLanguage" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.log("Page language:", response.language);
            setLanguage(response.language);
          }
        }
      );
    }
  };

  const handleClick = () => {
    sendMessage();
  };

  return (
    <>
      <button onClick={handleClick}>Test script</button>
      {language && <p>Page language: {language}</p>}
    </>
  );
}

export default App;
