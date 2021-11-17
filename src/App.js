import './Home.css';
import './popover.css';
import Editor from "react-medium-editor";
import { useState, useEffect } from "react";
export default function App() {
  const [text, setText] = useState(() => {
    const text = localStorage.getItem("text");
    return text ? text : "";
  });

  useEffect(() => {
    localStorage.setItem("text", text);
  })
  return (
    <Editor
      onChange={setText}
      tag="pre"
      text={text}
      options={{
        toolbar: { buttons: ["bold", "italic", "underline"] },
        placeholder: {
          text: "Start typing...",
          hideOnClick: false,
        },
      }}
    />
  );
}