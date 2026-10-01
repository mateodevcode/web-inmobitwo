const buttonClass = (isActive) =>
  `px-3 py-2 rounded text-sm font-medium transition ${
    isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

export function EditorToolbar({ editor, showPreview, onTogglePreview }) {
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleHeading2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleHeading3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const addLink = () => {
    const url = prompt("URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };
  const clearFormatting = () => editor.chain().focus().clearNodes().run();

  return (
    <div className="bg-slate-50 border-b border-slate-200 p-3 flex gap-2 flex-wrap">
      <button
        onClick={toggleBold}
        className={buttonClass(editor.isActive("bold"))}
        type="button"
        title="Bold (Ctrl+B)"
      >
        <strong>B</strong>
      </button>

      <button
        onClick={toggleItalic}
        className={buttonClass(editor.isActive("italic"))}
        type="button"
        title="Italic (Ctrl+I)"
      >
        <em>I</em>
      </button>

      <div className="w-px bg-slate-200"></div>

      <button
        onClick={toggleHeading2}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        type="button"
        title="Título 2"
      >
        H2
      </button>

      <button
        onClick={toggleHeading3}
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        type="button"
        title="Título 3"
      >
        H3
      </button>

      <div className="w-px bg-slate-200"></div>

      <button
        onClick={toggleBulletList}
        className={buttonClass(editor.isActive("bulletList"))}
        type="button"
        title="Lista con puntos"
      >
        • Lista
      </button>

      <button
        onClick={toggleOrderedList}
        className={buttonClass(editor.isActive("orderedList"))}
        type="button"
        title="Lista numerada"
      >
        1. Lista
      </button>

      <div className="w-px bg-slate-200"></div>

      <button
        onClick={addLink}
        className={buttonClass(editor.isActive("link"))}
        type="button"
        title="Agregar link"
      >
        🔗 Link
      </button>

      <button
        onClick={clearFormatting}
        className="px-3 py-2 rounded text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
        type="button"
        title="Limpiar formato"
      >
        ✖ Limpiar
      </button>

      <div className="flex-1"></div>

      <button
        onClick={onTogglePreview}
        className="px-3 py-2 rounded text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        type="button"
      >
        {showPreview ? "✏️ Editar" : "👁️ Preview"}
      </button>
    </div>
  );
}
