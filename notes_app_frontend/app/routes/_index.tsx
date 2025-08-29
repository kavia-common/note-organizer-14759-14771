import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Note Organizer — Welcome" },
    {
      name: "description",
      content:
        "Create, edit, organize, and search notes with a modern and fast web app.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-slate-900">Note Organizer</h1>
        </div>
        <p className="mb-8 max-w-2xl text-center text-slate-600">
          A simple, modern notes app to capture ideas, keep track of tasks, and
          find anything fast with powerful search.
        </p>
        <div className="flex gap-3">
          <Link
            to="/app"
            className="rounded bg-[var(--color-primary)] px-5 py-2 text-white hover:brightness-105"
          >
            Open App
          </Link>
          <Link
            to="/auth"
            className="rounded border border-slate-300 bg-white px-5 py-2 text-slate-700 hover:bg-slate-50"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
