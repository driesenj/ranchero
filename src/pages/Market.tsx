import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Event = {
  name: string;
  effect: (price: number) => number;
  description: string;
};

type LogEntry = {
  message: string;
  change: number;
  newPrice: number;
  time: string;
};

const events: Event[] = [
  {
    name: "Droogte",
    description:
      "Een zware droogte treft het land — de prijs van koeien kelderd!",
    effect: (p: number) => Math.floor(p / 2),
  },
  {
    name: "Gouden kalf",
    description:
      "Mensen geloven dat sommige koeien gouden kalveren kunnen baren — prijzen vliegen de hoogte in!",
    effect: (p: number) => p * 2,
  },
  {
    name: "Goede Oogst",
    description: "Veel veevoer, de koeien gedijen — prijs zakt lichtjes.",
    effect: (p: number) => Math.floor(p * 0.8),
  },
  {
    name: "Goudkoorts",
    description: "De mijnwerkers hebben vlees nodig — prijzen stijgen",
    effect: (p: number) => Math.ceil(1.2 * p),
  },
  {
    name: "Dollekoeien ziekte",
    description:
      "Een vreemde ziekte raast door de kuddes, niemand wil koeien met schuimbekken - Prijzen zakken",
    effect: (p: number) => Math.round(p * 0.7),
  },
];

export default function Market() {
  const [price, setPrice] = useLocalStorage<number>("cowPrice", 10);
  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  // Sell button: adjust price randomly
  const sellCow = () => {
    const deltas = [-4, -2, 2, 4];
    if (price > 20) deltas.push(-5);
    else if (price < 5) deltas.push(3);
    const delta = deltas[Math.floor(Math.random() * deltas.length)];
    const newPrice = Math.max(1, price + delta);
    setPrice(newPrice);
    addLog(`Koe verkocht aan $ ${price}.`, delta, newPrice);
  };

  // Add entry to log
  const addLog = (message: string, change: number, newPrice: number) => {
    const entry: LogEntry = {
      message,
      change,
      newPrice,
      time: new Date().toLocaleTimeString(),
    };
    setLog((prev) => [entry, ...prev]); // newest first
  };

  // Random event every 10 minutes
  useEffect(() => {
    const triggerEvent = () => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setPrice((prev) => {
        const newPrice = Math.max(1, Math.min(25, randomEvent.effect(prev)));
        const change = newPrice - prev;
        addLog(randomEvent.name, change, newPrice);
        return newPrice;
      });
      setEventMessage(randomEvent.description);
    };

    const interval = setInterval(triggerEvent, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-amber-100 border-8 border-amber-800 rounded-xl shadow-lg p-6 max-w-3xl mx-auto font-serif">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-6 tracking-widest uppercase">
        🐂 Veemarkt 🐂
      </h1>

      {/* Current price */}
      <div className="text-center mb-6">
        <p className="text-xl text-amber-900 mb-2">
          Huidige prijs voor een koe:
        </p>
        <p className="text-5xl font-bold text-green-800">$ {price}</p>
      </div>

      {/* Sell button */}
      <div className="text-center mb-6">
        <button
          onClick={sellCow}
          className="bg-amber-800 text-amber-100 px-6 py-3 rounded-lg border-2 border-amber-900 hover:bg-amber-900 transition"
        >
          Koop koe aan deze prijs
        </button>
      </div>

      {/* Popup for latest event */}
      {eventMessage && (
        <div className="fixed inset-0 bg-zinc-950/75 flex items-center justify-center">
          <div className="bg-amber-50 border-8 border-gray-900 rounded-none shadow-2xl p-8 max-w-lg text-center font-serif">
            <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-wide text-gray-900 border-b-4 border-gray-900 pb-2">
              Ranch Gazette
            </h2>
            <p className="italic text-gray-700 mb-4 text-sm">
              De laatste nieuwtjes uit het Wilde Westen
            </p>
            <p className="text-xl text-gray-900 mb-6">{eventMessage}</p>
            <button
              onClick={() => setEventMessage(null)}
              className="mt-4 px-6 py-2 border-2 border-gray-900 text-gray-900 font-bold uppercase tracking-widest bg-amber-100 hover:bg-amber-200 transition"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}

      {/* Event / Sell Log */}
      <div className="mt-8 bg-amber-50 border-4 border-amber-800 rounded-lg shadow-inner p-4">
        <h2 className="text-2xl font-bold mb-3 text-amber-900 uppercase tracking-wide">
          Markt Historiek
        </h2>
        {log.length === 0 ? (
          <p className="text-gray-700 italic">Er is nog niets gebeurd...</p>
        ) : (
          <ul className="space-y-2">
            {log.map((entry, i) => (
              <li
                key={i}
                className="flex justify-between border-b border-amber-700 pb-1"
              >
                <span className="text-sm text-gray-600 pr-2">
                  [{entry.time}]
                </span>
                <span className="flex-1">
                  <strong>{entry.message}</strong>
                </span>
                <span>
                  De nieuwe prijs is $ {entry.newPrice} (
                  {entry.change >= 0 ? "+" : ""}
                  {entry.change})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
