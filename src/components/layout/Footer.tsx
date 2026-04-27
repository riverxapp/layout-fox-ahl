import { env } from "../../lib/env";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-white/60 bg-white/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">
          {env.appName} • Built for fast AI-assisted product iteration.
        </p>
        <p className="text-sm text-slate-500">{year} RiverX Template</p>
      </div>
    </footer>
  );
}
