import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import Market from "./pages/Market";
import Bounties from "./pages/Bounties";

export default function App() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Western-styled Navbar */}
      <nav className="flex justify-center gap-6 mb-8 p-4 bg-amber-200 border-4 border-amber-800 rounded-xl shadow-md">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition
            ${
              isActive
                ? "bg-amber-800 text-amber-100"
                : "bg-amber-50 text-amber-900 hover:bg-amber-300"
            }`
          }
        >
          🏜 Home
        </NavLink>
        <NavLink
          to="/bank"
          className={({ isActive }) =>
            `px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition
            ${
              isActive
                ? "bg-amber-800 text-amber-100"
                : "bg-amber-50 text-amber-900 hover:bg-amber-300"
            }`
          }
        >
          💰 Bank
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) =>
            `px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition
            ${
              isActive
                ? "bg-amber-800 text-amber-100"
                : "bg-amber-50 text-amber-900 hover:bg-amber-300"
            }`
          }
        >
          🐂 Veemarkt
        </NavLink>
        <NavLink
          to="/bounties"
          className={({ isActive }) =>
            `px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition
            ${
              isActive
                ? "bg-amber-800 text-amber-100"
                : "bg-amber-50 text-amber-900 hover:bg-amber-300"
            }`
          }
        >
          🐂 Premies
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/market" element={<Market />} />
        <Route path="/bounties" element={<Bounties />} />
      </Routes>
    </div>
  );
}
