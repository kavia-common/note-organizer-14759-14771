import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Notes — Organizer" },
    {
      name: "description",
      content:
        "A modern notes app to create, edit, organize, and search your notes.",
    },
    { name: "theme-color", content: "#ffffff" },
  ];
};

function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-[var(--color-primary)]" />
        <h1 className="text-lg font-semibold text-slate-800">Note Organizer</h1>
      </div>
      <nav className="flex items-center gap-2">
        <NavLink
          to="/app"
          className={({ isActive }) =>
            `rounded px-3 py-2 text-sm ${isActive ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-slate-900"}`
          }
        >
          App
        </NavLink>
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `rounded px-3 py-2 text-sm ${isActive ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-slate-900"}`
          }
        >
          Sign In
        </NavLink>
      </nav>
    </header>
  );
}

function AppSidebar() {
  const location = useLocation();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-50/60 p-4 md:block">
      <div className="mb-3 text-xs font-semibold uppercase text-slate-500">
        Navigation
      </div>
      <ul className="space-y-1">
        <li>
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 text-sm ${
                isActive
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                  : "text-slate-700 hover:bg-white hover:text-slate-900"
              }`
            }
          >
            <span>All Notes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/new"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 text-sm ${
                isActive
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                  : "text-slate-700 hover:bg-white hover:text-slate-900"
              }`
            }
          >
            <span>New Note</span>
          </NavLink>
        </li>
      </ul>

      <div className="mt-6 mb-2 text-xs font-semibold uppercase text-slate-500">
        Filters
      </div>
      <ul className="space-y-1">
        <li>
          <NavLink
            to="/app?filter=starred"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 text-sm ${
                isActive || location.search.includes("starred")
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                  : "text-slate-700 hover:bg-white hover:text-slate-900"
              }`
            }
          >
            <span>Starred</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app?filter=recent"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 text-sm ${
                isActive || location.search.includes("recent")
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                  : "text-slate-700 hover:bg-white hover:text-slate-900"
              }`
            }
          >
            <span>Recent</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme variables based on request colors */}
        <style>{`:root{
          --color-primary:#1976D2;
          --color-secondary:#424242;
          --color-accent:#FFC107;
          --color-primary-50:#e6f0fb;
        }`}</style>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white text-slate-900">
        <div className="flex h-screen flex-col">
          <AppHeader />
          <div className="flex min-h-0 flex-1">
            <AppSidebar />
            <main className="min-w-0 flex-1 bg-white">
              {children}
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
