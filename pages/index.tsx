import dynamic from "next/dynamic";
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");
import Editor from "react-medium-editor";

export default function Home() {
  return (
    <Editor
      tag="pre"
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
