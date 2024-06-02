"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

const TipTapMenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 px-4 pt-4">
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("bold") ? "bg-slate-800 text-white" : ""
        }`}
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("italic") ? "bg-slate-800 text-white" : ""
        }`}
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H1"
      >
        <Heading1 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H2"
      >
        <Heading2 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 3 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H3"
      >
        <Heading3 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 4 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H4"
      >
        <Heading4 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 5 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H5"
      >
        <Heading5 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("heading", { level: 6 })
            ? "bg-slate-800 text-white"
            : ""
        }`}
        title="H6"
      >
        <Heading6 className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("bulletList") ? "bg-slate-800 text-white" : ""
        }`}
        title="List"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("orderedList") ? "bg-slate-800 text-white" : ""
        }`}
        title="Ordered List"
      >
        <ListOrdered className="w-5 h-5" />
      </button>

      {/* Code Block */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`border rounded-sm px-1 border-slate-500 ${
          editor.isActive("blockquote") ? "bg-slate-800 text-white" : ""
        }`}
        title="Block Quote"
      >
        <Quote className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="border rounded-sm px-1 border-slate-500"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
      >
        <Undo className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="border rounded-sm px-1 border-slate-500"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
      >
        <Redo className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TipTapMenuBar;
