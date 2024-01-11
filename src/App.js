import "./Home.scss";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { BsPlus, BsX } from "react-icons/bs";

import "react-responsive-modal/styles.css";
import "./modal.scss";
import "./menus.scss";
import CharacterCount from "@tiptap/extension-character-count";
import { useLocalStorage } from "./utils/useLocalStorage";
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
  const [bubbles, setBubbles] = useLocalStorage("bubbles", ["New Bubble"]);
  const closeModal = () => {
    setModal(false);
  };
  const [tab, setTab] = useState(
    bubbles.length > 0 ? bubbles[0] : "New Bubble"
  );
  const [renamingTab, setRenamingTab] = useState(null);
  const currentTabRef = useRef(null);

  const onUpdate = ({ editor }) => {
    const json = JSON.stringify(editor.getJSON());
    const text = editor.getText();
    localStorage.setItem(tab, json);
    if (!bubbles.includes(tab)) {
      setBubbles([...bubbles, tab]);
    }
    const tips = document.getElementsByClassName("tips")[0];
    if (tips.classList.contains("show") && text.trim().length > 0) {
      tips.classList.remove("show");
    } else if (!tips.classList.contains("show") && text.trim().length < 1) {
      tips.classList.add("show");
    }
  };

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Typography,
        CustomDocument,
        TaskItem.configure({
          nested: true,
        }),
        TaskList,
        CharacterCount,
      ],
      content: JSON.parse(localStorage.getItem(tab)) ?? "",
      onUpdate,
    },
    [tab]
  );
  const selectionData = (() => {
    if (!editor) {
      return null;
    }
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    if (!text || text.length === 0) {
      return null;
    }
    return {
      words: text.trim().split(/\s+/gu).length,
      characters: text.length,
    };
  })();
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

  const renameTab = (bubble, e) => {
    if (renamingTab === bubble && e.target.value.trim().length > 0) {
      setRenamingTab(null);
      if (tab === bubble) {
        setTab(e.target.value);
      }
      setBubbles(
        bubbles.map((b) => {
          if (b === bubble) {
            return e.target.value;
          }
          return b;
        })
      );
      localStorage.removeItem(bubble);
      localStorage.setItem(e.target.value, JSON.stringify(editor.getJSON()));
      document.removeEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          e.target.blur();
        }
      });
    }
  };

  const createTabRenameListener = () => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.code === "Enter") {
          e.target.blur();
        }
      },
      { once: true }
    );
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
      <div className="tab-bar">
        <div className="tab-background" />
        <div className="tabs">
          {bubbles?.map((bubble, i) => (
            <div
              key={i}
              className={`tab close-${i} ${tab === bubble ? "active" : ""}`}
            >
              <div
                className="tab-name"
                data-isonly={bubbles.length === 1}
                ref={tab === bubble ? currentTabRef : null}
                onClick={() => {
                  setTab(bubble);
                  editor.commands.setContent(
                    JSON.parse(localStorage.getItem(bubble))
                  );
                  document.getElementsByClassName(
                    "tab-background"
                  )[0].style.top = currentTabRef.current.offsetTop + "px";
                }}
                onDoubleClick={() => {
                  if (tab === bubble) {
                    setRenamingTab(bubble);
                    createTabRenameListener();
                  }
                }}
              >
                {renamingTab === bubble ? (
                  <input
                    type="text"
                    className="tab-rename"
                    defaultValue={bubble}
                    autoFocus
                    onBlur={(e) => {
                      renameTab(bubble, e);
                    }}
                  />
                ) : (
                  <div>{bubble}</div>
                )}
              </div>
              {bubbles.length > 1 && (
                <button
                  className="tab-close"
                  onClick={() => {
                    const closeTab = document.getElementsByClassName(
                      `close-${i}`
                    )[0];
                    closeTab.style.animation = "close-tab 0.1s ease-in-out";
                    setTimeout(() => {
                      const newBubbles = bubbles ?? [];
                      newBubbles.splice(i, 1);
                      setBubbles(newBubbles);
                      localStorage.removeItem(bubble);
                      if (tab === bubble) {
                        setTab(newBubbles[0]);
                        editor.commands.setContent(
                          JSON.parse(localStorage.getItem(newBubbles[0]))
                        );
                      } else {
                        setTab(tab);
                        editor.commands.setContent(
                          JSON.parse(localStorage.getItem(tab))
                        );
                      }

                      // remove close-tab animation from all tabs
                      for (let i = 0; i < newBubbles.length; i++) {
                        document.getElementsByClassName(
                          `close-${i}`
                        )[0].style.animation = "";
                      }
                    }, 90);
                  }}
                >
                  <BsX />
                </button>
              )}
            </div>
          ))}
        </div>
        <div
          className="tab new-tab"
          onClick={() => {
            const newBubbles = bubbles ?? [];
            let newBubbleName = "New Bubble";
            let i = 0;
            while (newBubbles.includes(newBubbleName)) {
              // New Bubble (1) New Bubble (2) etc
              newBubbleName = "New Bubble (" + ++i + ")";
            }
            newBubbles.push(newBubbleName);
            setBubbles(newBubbles);
            setTab(newBubbleName);
          }}
        >
          <div>
            <BsPlus />
          </div>
        </div>
      </div>
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
        <div className="actionsChild flex">
          {selectionData && (
            <span className="count">{`${selectionData.words} words • ${selectionData.characters} characters`}</span>
          )}
          <span className="count">{`${editor.storage.characterCount.words()} words • ${editor.storage.characterCount.characters()} characters`}</span>
        </div>
        <div className="actionsChild">
          <select value={theme} onChange={themeChange} className="theme-select">
            {themeOptions.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="save" onClick={() => saveFile()}>
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
