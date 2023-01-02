import "./Home.scss";
import { useState } from "react";
import {
  EditorContent,
  useEditor,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";
import "./modal.scss";
import "./menus.scss";
import CharacterCount from "@tiptap/extension-character-count";
const CustomDocument = Document.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-q": () => this.editor.commands.toggleStrike(),
    };
  },
});

export default function App() {
  const [modal, setModal] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light"
  );
  const closeModal = () => {
    setModal(false);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Typography,
      CustomDocument,
      Paragraph,
      Text,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      CharacterCount,
    ],
    content: JSON.parse(localStorage.getItem("text")) ?? "",
    onUpdate({ editor }) {
      const json = JSON.stringify(editor.getJSON());
      const text = editor.getText();
      localStorage.setItem("text", json);
      const tips = document.getElementsByClassName("tips")[0];
      if (tips.classList.contains("show") && text.trim().length > 0) {
        tips.classList.remove("show");
      } else if (!tips.classList.contains("show") && text.trim().length < 1) {
        tips.classList.add("show");
      }
      text.trim().length > 0 ? setSaveDisabled(false) : setSaveDisabled(true);
    },
  });
  const [saveDisabled, setSaveDisabled] = useState(
    JSON.parse(localStorage.getItem("text")) ? false : true
  );
  if (!editor) {
    return null;
  }
  const saveFile = () => {
    let save = editor.getText();
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([save], { type: "text/plain" })
    );
    a.download = "bubble-" + new Date().toLocaleTimeString() + ".txt";
    a.click();
  };

  const importFile = () => {
    //open filepicker
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".json");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        localStorage.setItem("text", JSON.stringify(data));
        window.location.reload(false);
      };
      reader.readAsText(file);
    };
  };

  document.onkeydown = function (e) {
    if (e.ctrlKey && e.code === "Slash") {
      setModal(true);
    }
  };

  const themeOptions = [
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Dark",
      value: "dark",
    },
    {
      label: "Cafe",
      value: "cafe",
    },
    {
      label: "Terminal",
      value: "terminal",
    },
    {
      label: "Blueberry",
      value: "blueberry",
    },
  ];
  const themeChange = (value) => {
    localStorage.setItem("theme", value.target.value);
    document.getElementById("root").classList = value.target.value;
    setTheme(value.target.value);
  };
  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            Underline
          </button>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive("taskList") ? "is-active" : ""}
          >
            To-Do
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
      <div className="tips show">
        <div className="tips-content-title">Welcome to Bubble!</div>
        <div className="tips-content-text">
          Here, you can make quick jots and notes, and they'll stay in your
          browser even if you close the tab!
          <hr />
          <div className="shortcut">
            Shortcuts: <kbd>ctrl</kbd> + <kbd>/</kbd>
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="actionsChild">
          <span className="count">{`${editor.storage.characterCount.words()} words • ${editor.storage.characterCount.characters()} characters`}</span>
        </div>
        <div className="actionsChild">
          <div className="icons">
            <a
              href="https://discord.gg/b8ugMm7nvc"
              className="discordLink"
              title="Join our Discord Server!"
            >
              <svg
                width="71"
                height="45"
                viewBox="0 0 71 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="discord"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    className="discordColor"
                    fill="#606e7d"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="71" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <button className="import" onClick={importFile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </button>
          </div>
          <select value={theme} onChange={themeChange} className="theme-select">
            {themeOptions.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            disabled={saveDisabled}
            className="save"
            onClick={() => saveFile()}
          >
            Save
          </button>
        </div>
      </div>
      <Modal
        open={modal}
        onClose={closeModal}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <h2>Shortcuts</h2>
        <hr />
        <p>
          <div className="shortcut">
            New Line: <kbd>shift</kbd> + <kbd>enter</kbd>
            <br />
          </div>
          <div className="shortcut">
            <b>Bold</b>: <kbd>ctrl</kbd> + <kbd>b</kbd>
            <br />
          </div>
          <div className="shortcut">
            <i>Italic</i>: <kbd>ctrl</kbd> + <kbd>i</kbd>
            <br />
          </div>
          <div className="shortcut">
            <u>Underline</u>: <kbd>ctrl</kbd> + <kbd>u</kbd>
            <br />
          </div>
          <div className="shortcut">
            <s>Strikethrough</s>: <kbd>ctrl</kbd> + <kbd>q</kbd>
            <br />
          </div>
          <div className="shortcut">
            Code: <kbd>ctrl</kbd> + <kbd>e</kbd>
          </div>
        </p>
      </Modal>
    </>
  );
}
