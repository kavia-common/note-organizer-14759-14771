import { useEffect, useState } from "react";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  onChange?: (data: { title: string; content: string; tags: string[] }) => void;
};

export default function Editor({
  initialTitle,
  initialContent,
  initialTags,
  onChange,
}: Props) {
  const [title, setTitle] = useState(initialTitle ?? "");
  const [content, setContent] = useState(initialContent ?? "");
  const [tagsText, setTagsText] = useState((initialTags ?? []).join(", "));

  useEffect(() => {
    onChange?.({
      title,
      content,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }, [title, content, tagsText, onChange]);

  useEffect(() => {
    setTitle(initialTitle ?? "");
    setContent(initialContent ?? "");
    setTagsText((initialTags ?? []).join(", "));
  }, [initialTitle, initialContent, initialTags]);

  return (
    <div className="flex h-full flex-col gap-3">
      <input
        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-lg font-semibold outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="min-h-[300px] flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        placeholder="Start typing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        placeholder="Tags (comma separated)"
        value={tagsText}
        onChange={(e) => setTagsText(e.target.value)}
      />
    </div>
  );
}
