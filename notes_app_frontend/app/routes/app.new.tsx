import { useEffect } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { createNote, getSessionUser } from "~/utils/api.client";

export default function NewNoteRoute() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    (async () => {
      const user = await getSessionUser();
      if (!user) {
        navigate(`/auth`);
        return;
      }
      const note = await createNote({
        userId: user.id,
        title: "Untitled",
        content: "",
      });
      navigate(`/app/${note.id}?${params.toString()}`);
    })();
  }, [navigate, params]);

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="rounded border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
        Creating note...
      </div>
    </div>
  );
}
