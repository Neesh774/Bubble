import "./Home.css";
import "./popover.css";
import "medium-editor/dist/css/medium-editor.css";
import Editor from "react-medium-editor";
import { useState, useEffect } from "react";
export default function App() {
  const [text, setText] = useState(() => {
    const text = localStorage.getItem("text");
    return text ? text : "";
  });

  useEffect(() => {
    localStorage.setItem("text", text);
    // remove the show class from the tips element if it has it
    const tips = document.getElementsByClassName("tips")[0];
    if (tips.classList.contains("show") && text.length > 0) {
      tips.classList.remove("show");
    }
    if (!tips.classList.contains("show") && text.length < 1) {
      tips.classList.add("show");
    }
  });
  return (
    <>
      <Editor
        onChange={setText}
        tag="pre"
        text={text}
        options={{
          toolbar: { buttons: ["bold", "italic", "underline"] },
          placeholder: {
            text: "What's on your mind?",
            hideOnClick: false,
          },
        }}
      />
      <div className="tips show">
        <div className="tips-content-title">Welcome to Bubble!</div>
        <div className="tips-content-text">
          Here, you can make quick jots and notes, and they'll stay in your
          browser even if you close the tab!
          <hr />
          <div className="shortcut">
            <b>Bold </b>: <kbd>Ctrl</kbd> + <kbd>B</kbd> <br />
          </div>
          <div className="shortcut">
            <i>Italic </i>: <kbd>Ctrl</kbd> + <kbd>I</kbd> <br />
          </div>
          <div className="shortcut">
            <u>Underline </u>: <kbd>Ctrl</kbd> + <kbd>U</kbd> <br />
          </div>
        </div>
      </div>
    </>
  );
}
