import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#fffaf2] text-[#26170e]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,157,122,0.24),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(255,107,74,0.18),_transparent_45%)]" />
      <Header />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
