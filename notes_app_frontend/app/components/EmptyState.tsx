import { Link } from "@remix-run/react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-3 h-12 w-12 rounded-full bg-[var(--color-primary-50)]" />
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        No note selected
      </h3>
      <p className="mb-4 max-w-sm text-sm text-slate-600">
        Choose a note from the list or create a new one to get started.
      </p>
      <Link
        to="/app/new"
        className="rounded bg-[var(--color-primary)] px-4 py-2 text-white hover:brightness-105"
      >
        New Note
      </Link>
    </div>
  );
}
