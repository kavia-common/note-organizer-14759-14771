import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import SearchBar from "~/components/SearchBar";
import NoteList from "~/components/NoteList";
import EmptyState from "~/components/EmptyState";
import { getSessionUser, listNotes } from "~/utils/api.client";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const filter =
    (url.searchParams.get("filter") as "starred" | "recent" | null) || undefined;

  // In a real environment, get the user from server session/cookies.
  // For this demo, we rely on client localStorage and just return a placeholder.
  const user = await getSessionUser().catch(() => null);
  return json({ q, filter, user });
}

export default function AppIndexRoute() {
  const { q, filter } = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();

  // We list on the client via util (localStorage). This is fine for demo.
  // When using a backend, this should be server-loaded via loader above.
  const [notes, setNotes] = React.useState<import("~/utils/api.client").Note[]>([]);
  React.useEffect(() => {
    (async () => {
      const user = await getSessionUser();
      if (!user) {
        setNotes([]);
        return;
      }
      const items = await listNotes({
        userId: user.id,
        q: q || undefined,
        filter: filter,
      });
      setNotes(items);
    })();
  }, [q, filter]);

  return (
    <div className="flex h-full">
      {/* Left list column */}
      <div className="flex w-full max-w-md flex-col border-r border-slate-200">
        <div className="p-3">
          <Form role="search" method="get" className="space-y-2">
            <SearchBar
              defaultValue={q ?? ""}
              onChange={(value) => {
                const next = new URLSearchParams(params);
                if (value) next.set("q", value);
                else next.delete("q");
                setParams(next, { preventScrollReset: true });
              }}
            />
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Link
                to="/app"
                className={!filter ? "text-[var(--color-primary)]" : "hover:underline"}
              >
                All
              </Link>
              <span>•</span>
              <Link
                to="/app?filter=recent"
                className={filter === "recent" ? "text-[var(--color-primary)]" : "hover:underline"}
              >
                Recent
              </Link>
              <span>•</span>
              <Link
                to="/app?filter=starred"
                className={filter === "starred" ? "text-[var(--color-primary)]" : "hover:underline"}
              >
                Starred
              </Link>
            </div>
          </Form>
        </div>
        <div className="min-h-0 flex-1">
          <NoteList notes={notes} q={q || undefined} />
        </div>
      </div>

      {/* Right content area */}
      <div className="hidden flex-1 md:block">
        <EmptyState />
      </div>
    </div>
  );
}

// tiny React import for client state above
import * as React from "react";
