import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import { editorExtensions, stripTags } from "./editorConfig";
import { EditorToolbar } from "./EditorToolbar";

/**
 * Editor visual para descripciones con TipTap
 * Permite formato: Bold, Italic, Títulos, Listas, Links
 */
export function DescriptionEditor({
  value,
  onChange,
  placeholder = "Escribe la descripción...",
}) {
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <EditorToolbar
        editor={editor}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

      {!showPreview ? (
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-4 min-h-80 focus:outline-none"
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        />
      ) : (
        <div
          className="prose prose-sm max-w-none p-4 min-h-80"
          dangerouslySetInnerHTML={{ __html: value }}
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        />
      )}

      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 text-xs text-slate-500">
        {stripTags(value).length} caracteres
      </div>
    </div>
  );
}

export default DescriptionEditor;
