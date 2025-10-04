import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import Market from "./pages/Market";
import Bounties from "./pages/Bounties";

export default function App() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Routes>
        <Route path="/ranchero/" element={<Home />} />
        <Route path="/ranchero/bank" element={<Bank />} />
        <Route path="/ranchero/market" element={<Market />} />
        <Route path="/ranchero/bounties" element={<Bounties />} />
      </Routes>
    </div>
  );
}
