import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "@remix-run/react";
import Editor from "~/components/Editor";
import {
  getNote,
  updateNote,
  deleteNote,
  type Note,
} from "~/utils/api.client";

export default function NoteRoute() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [dirty, setDirty] = useState(false);
  const [draft, setDraft] = useState<{ title: string; content: string; tags: string[] }>({
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    (async () => {
      if (!noteId) return;
      const n = await getNote(noteId);
      setNote(n ?? null);
      if (n) {
        setDraft({ title: n.title, content: n.content, tags: n.tags });
        setDirty(false);
      }
    })();
  }, [noteId]);

  async function save() {
    if (!note) return;
    const updated = await updateNote(note.id, {
      title: draft.title,
      content: draft.content,
      tags: draft.tags,
    });
    setNote(updated);
    setDirty(false);
  }

  async function toggleStar() {
    if (!note) return;
    const updated = await updateNote(note.id, { starred: !note.starred });
    setNote(updated);
  }

  async function onDelete() {
    if (!note) return;
    const ok = window.confirm("Delete this note?");
    if (!ok) return;
    await deleteNote(note.id);
    navigate(`/app?${params.toString()}`);
  }

  if (!note) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-2 text-lg font-semibold text-slate-900">
          Note not found
        </div>
        <Link to={`/app?${params.toString()}`} className="text-[var(--color-primary)] hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStar}
            className={`rounded px-2 py-1 text-sm ${note.starred ? "text-[var(--color-accent)]" : "text-slate-600 hover:text-slate-900"}`}
            title={note.starred ? "Unstar" : "Star"}
          >
            ★
          </button>
          <div className="text-xs text-slate-500">
            Last edited {new Date(note.updatedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDelete}
            className="rounded border border-red-200 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className="rounded bg-[var(--color-primary)] px-4 py-1.5 text-sm text-white hover:brightness-105 disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 p-4">
        <Editor
          initialTitle={note.title}
          initialContent={note.content}
          initialTags={note.tags}
          onChange={(d) => {
            setDraft(d);
            setDirty(true);
          }}
        />
      </div>
    </div>
  );
}
