import { Outlet } from "@remix-run/react";

export default function AppRoute() {
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
