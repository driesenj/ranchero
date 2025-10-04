import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-amber-100 to-orange-200 p-6 rounded-xl shadow-md">
      <div className="bg-amber-50 border-4 border-amber-800 rounded-xl p-6 max-w-md text-center shadow-lg font-serif">
        <h2 className="text-2xl font-bold mb-2 text-amber-800">
          Howdy, Partner!
        </h2>
        <p className="mb-4 text-amber-900">Welkom in het wilde westen.</p>
      </div>
      <div className="mt-4">
        {/* Western-styled Navbar */}
        <nav className="flex flex-col gap-6 mb-8 p-4 bg-amber-200 border-4 border-amber-800 rounded-xl shadow-md">
          <NavLink
            to="/bank"
            className={
              "flex px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition bg-amber-50 text-amber-900 hover:bg-amber-300"
            }
          >
            💰 Bank
          </NavLink>
          <NavLink
            to="/market"
            className={
              "flex px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition bg-amber-50 text-amber-900 hover:bg-amber-300"
            }
          >
            🐂 Veemarkt
          </NavLink>
          <NavLink
            to="/bounties"
            className={
              "flex px-4 py-2 font-bold uppercase tracking-widest border-2 border-amber-800 rounded-md transition bg-amber-50 text-amber-900 hover:bg-amber-300"
            }
          >
            🐂 Premies
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
