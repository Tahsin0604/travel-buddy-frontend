"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import TipTapMenuBar from "./TipTapMenuBar";
// import Heading from "@tiptap/extension-heading";

const extensions = [StarterKit];
const TiptapEditor = ({
  onChange,
  description,
}: {
  onChange: (richText: string) => void;
  description: string;
}) => {
  const editor = useEditor({
    extensions: extensions,
    content: description,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-w-full  bg-back prose leading-tight p-2 border-none outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col  justify-stretch h-full divide-y-2 gap-2 border border-slate-100 rounded-md">
      <TipTapMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
