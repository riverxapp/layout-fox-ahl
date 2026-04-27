import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you requested does not exist in this template.</p>
      <Link to="/" className="mt-6 inline-block">
        <Button>Back Home</Button>
      </Link>
    </section>
  );
}
