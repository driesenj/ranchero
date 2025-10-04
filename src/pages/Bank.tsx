import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Accounts = Record<string, number>;

export default function Bank() {
  const [accounts, setAccounts] = useLocalStorage<Accounts>("accounts", {});
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const total = Object.values(accounts).reduce((acc, a) => acc + a, 0);

  const deposit = () => {
    if (!name || amount <= 0) return;
    setAccounts((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + amount,
    }));
    setAmount(0);
  };

  const withdraw = () => {
    if (!name || amount <= 0) return;
    setAccounts((prev) => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) - amount, 0),
    }));
    setAmount(0);
  };

  const robbery = () => {
    let totalRobbed = 0;
    const updated: Accounts = {};
    for (const [k, v] of Object.entries(accounts)) {
      const robbed = v > 0 ? Math.max(Math.round(v * 0.2), 1) : 0;
      totalRobbed += robbed;
      updated[k] = Math.max(Math.round(v - robbed), 0);
    }
    setAccounts(updated);
    window.alert(`Er werd in totaal $ ${totalRobbed} gestolen!`);
  };

  // Interest every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setAccounts((prev) => {
        const updated: Accounts = {};
        for (const [k, v] of Object.entries(prev)) {
          updated[k] = Math.round(v * 1.1);
        }
        return updated;
      });
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [setAccounts]);

  return (
    <>
      <div className="border-amber-800 rounded-xl p-6 max-w-2xl mx-auto font-serif text-center">
        <button
          onClick={robbery}
          className="bg-black text-amber-200 px-4 py-2 rounded-md border-2 border-amber-800 hover:bg-gray-900 transition"
          style={{ width: 400, maxWidth: "100%" }}
        >
          OVERVAL!
        </button>
      </div>
      <div className="bg-amber-100 border-8 border-amber-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto font-serif">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-6 tracking-widest uppercase">
          🏦 Bank
        </h1>

        <h3 className="text-2xl font-bold text-center text-stone-900 mb-6 tracking-widest uppercase">
          Geld in de bank: $ {total}
        </h3>

        {/* Input form */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <input
            className="border-2 border-amber-800 rounded-md px-3 py-2 bg-amber-50 placeholder-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="Naam"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="border-2 border-amber-800 rounded-md px-3 py-2 bg-amber-50 placeholder-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={deposit}
              className="bg-green-700 text-white px-4 py-2 rounded-md border-2 border-amber-800 hover:bg-green-800 transition"
            >
              Geld Storten
            </button>
            <button
              onClick={withdraw}
              className="bg-red-700 text-white px-4 py-2 rounded-md border-2 border-amber-800 hover:bg-red-800 transition"
            >
              Geld Afhalen
            </button>
          </div>
        </div>

        {/* Account list */}
        <ul className="divide-y-2 divide-amber-800 bg-amber-50 rounded-lg shadow-inner">
          {Object.entries(accounts).map(([k, v]) => (
            <li
              key={k}
              className="flex justify-between px-4 py-2 font-mono text-lg text-amber-900"
            >
              <span className="font-bold">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
