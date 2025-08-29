import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { signIn, signOut } from "~/utils/api.client";

// PUBLIC_INTERFACE
export async function loader() {
  return null;
}

// PUBLIC_INTERFACE
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = form.get("_action");
  if (intent === "signout") {
    // no-op on server; handled client-side
    return { ok: true, signedOut: true };
  }
  const email = String(form.get("email") || "");
  if (!email) {
    return { ok: false, error: "Email is required" };
  }
  // In a real app, you'd POST to backend here.
  return { ok: true, email };
}

export default function AuthRoute() {
  const data = useActionData<typeof action>();
  const nav = useNavigation();

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Sign In</h2>
        <Form
          method="post"
          className="rounded border border-slate-200 bg-white p-4 shadow-sm"
          onSubmit={async (e) => {
            // client-side session handling for the demo
            const form = new FormData(e.currentTarget as HTMLFormElement);
            const email = String(form.get("email") || "");
            if (email) {
              await signIn(email, "");
            }
          }}
        >
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mb-3 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="you@example.com"
          />
          {data && !data.ok ? (
            <div className="mb-3 text-sm text-red-600">{data.error}</div>
          ) : null}
          <button
            type="submit"
            className="w-full rounded bg-[var(--color-primary)] px-4 py-2 text-white hover:brightness-105 disabled:opacity-60"
            disabled={nav.state === "submitting"}
          >
            {nav.state === "submitting" ? "Signing in..." : "Sign In"}
          </button>
        </Form>

        <div className="mt-6 rounded border border-slate-200 bg-white p-4">
          <form
            method="post"
            onSubmit={async () => {
              await signOut();
            }}
          >
            <input type="hidden" name="_action" value="signout" />
            <button
              className="w-full rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link to="/app" className="text-[var(--color-primary)] hover:underline">
            Skip to App
          </Link>
        </div>
      </div>
    </div>
  );
}
