import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export const editorExtensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "text-base text-slate-700 leading-relaxed",
      },
    },
    heading: {
      levels: [1, 2, 3],
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-inside my-4",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-inside my-4",
      },
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-600 underline cursor-pointer",
    },
  }),
];

export const stripTags = (html) => html.replace(/<[^>]*>/g, "");
