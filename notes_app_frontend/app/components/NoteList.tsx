import { Link, NavLink, useLocation } from "@remix-run/react";
import type { Note } from "~/utils/api.client";

export default function NoteList({
  notes,
  q,
}: {
  notes: Note[];
  q?: string;
}) {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  if (q) search.set("q", q);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 pb-2 pt-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Notes ({notes.length})
        </h2>
        <Link
          to="/app/new"
          className="rounded bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white hover:brightness-105"
        >
          New
        </Link>
      </div>
      <ul className="min-h-0 flex-1 divide-y divide-slate-200 overflow-y-auto">
        {notes.map((n) => (
          <li key={n.id}>
            <NavLink
              to={`/app/${n.id}?${search.toString()}`}
              className={({ isActive }) =>
                `block px-3 py-2 ${
                  isActive
                    ? "bg-[var(--color-primary-50)]"
                    : "hover:bg-slate-50"
                }`
              }
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {n.title || "Untitled"}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {n.content || "No content"}
                  </div>
                </div>
                {n.starred ? (
                  <span title="Starred" className="shrink-0 text-[var(--color-accent)]">
                    ★
                  </span>
                ) : null}
              </div>
            </NavLink>
          </li>
        ))}
        {notes.length === 0 ? (
          <li className="px-3 py-6 text-center text-sm text-slate-500">
            No notes yet.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
