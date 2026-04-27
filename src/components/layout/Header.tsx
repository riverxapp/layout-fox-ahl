import { env } from "../../lib/env";
import { Button } from "../ui/button";
import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#f1ddc9] bg-[#fffaf2]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#ff6b4a] to-[#ff9d7a] shadow-[0_8px_20px_-10px_rgba(217,72,40,0.8)]" />
          <div className="text-base font-semibold text-[#26170e]">{env.appName}</div>
        </div>
        <div className="flex items-center gap-2">
          <Navbar />
          <Button variant="secondary" className="hidden sm:inline-flex bg-[#fff2e2] text-[#26170e] hover:bg-[#ffe7cf]">
            Start a Build
          </Button>
        </div>
      </div>
    </header>
  );
}
