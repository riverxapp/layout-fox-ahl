import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-[#26170e] text-white"
      : "text-[#6f5b4a] hover:bg-[#fff2e2] hover:text-[#26170e]"
  );
}

export function Navbar() {
  return (
    <nav className="flex items-center gap-2">
      <NavLink to="/" className={navLinkClass} end>
        Home
      </NavLink>
    </nav>
  );
}
