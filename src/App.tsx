import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import Market from "./pages/Market";
import Bounties from "./pages/Bounties";

export default function App() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/market" element={<Market />} />
        <Route path="/bounties" element={<Bounties />} />
      </Routes>
    </div>
  );
}
