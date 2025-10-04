import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Accounts = Record<string, number>;

const questions = [
  {
    question: "Wat is de gemiddelde draagtijd van een koe in maanden? ",
    answer: "Ongeveer 9 maanden",
  },
  {
    question:
      "Welk koeienras staat bekend om zijn dubbele spieren en komt oorspronkelijk uit België? ",
    answer: "Belgian Blue",
  },
  {
    question: "Wat is de term voor een mannelijk rund dat gecastreerd is? ",
    answer: "Os of stier ",
  },
  {
    question: "Welk orgaan van een koe heeft vier compartimenten? ",
    answer: "De maag (pens, netmaag, boekmaag en lebmaag)",
  },
  { question: "Hoeveel boventanden heeft een koe? ", answer: "0" },
  {
    question: "Welk koeienras is het populairst voor vleesproductie in de VS? ",
    answer: "Angus (Black Angus)",
  },
  {
    question: "Wat is 'marbling' in rundvlees? ",
    answer: "Intramusculair vet dat zorgt voor mals en smaakvol vlees",
  },
  { question: "Hoe heet het geluid dat een koe maakt?", answer: "Loeien" },
  {
    question: "zijn er meer koeien of mensen op de wereld",
    answer: "mensen (8 miljard vs 1.6 miljard koeien)",
  },
  {
    question: "Kunnen koeien ouder worden dan 10 jaar?",
    answer: "Ja, 15 tot 20 jaar",
  },
  {
    question: "Welke koe staat bekend om haar zwart-witte vlekken?",
    answer: "Holstein",
  },
  { question: "Kunnen koeien zwemmen?", answer: "Ja, ze zijn goede zwemmers" },
  {
    question: "Wat is het grootste orgaan van een koe?",
    answer: "De pens(maag)",
  },
  {
    question: "Wie is sneller: Nijlpaard of koe",
    answer: "Koe (40km/u) nijlpaard maar 30 km/u op land",
  },
  {
    question:
      "Hoe lang duurt het voor een kalf om zelfstandig te kunnen lopen na de geboorte? Minuut – Uur – Dag of Week?",
    answer: "1–2 Uur.",
  },
  {
    question: "Kunnen koeien een trap oplopen",
    answer: "Ja, maar veel beter naar boven dan naar beneden",
  },
  { question: "Slapen koeien staand of liggend", answer: "Allebei" },
  {
    question:
      "Hoe heet de speciale manier waarop koeien hun voedsel extra goed verteren",
    answer: "Herkauwen",
  },
  {
    question:
      "Welk dier is de dichtste familie van de koe: Hond, Walvis, Varken",
    answer: "Walvis",
  },
  {
    question: "Hoeveel vingerachtige aanhangsels heeft een koe?",
    answer: "4 “vingers” per poot: 2 hoeven en 2 wolfsklauwen",
  },
];

const tasks = [
  "Hekkes bouwen: 10 nagels in een blok hout slaan",
  "Koeien herderen: 2 banden naar de andere kant van de wei slepen",
  "Uiers melken: Vul een glas adhv een uier (handschoen). Uier moet overleven",
  "Grazen: Vul een potje met gras",
];

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

  const easy = () => {
    const q = questions[Math.floor(Math.random() * questions.length)];
    alert("VRAAG: " + q.question);
    alert("ANTWOORDD: " + q.answer);
  };

  const hard = () => {
    alert(tasks[Math.floor(Math.random() * tasks.length)]);
  };

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
        <button
          onClick={easy}
          className="bg-green-400 mt-2 text-gray-200 px-4 py-2 rounded-md border-2 border-amber-800 hover:bg-gray-900 transition"
          style={{ width: 400, maxWidth: "100%" }}
        >
          Weiland Vraag (makkelijk)!
        </button>
        <button
          onClick={hard}
          className="bg-lime-800 mt-2 text-gray-200  px-4 py-2 rounded-md border-2 border-amber-800 hover:bg-gray-900 transition"
          style={{ width: 400, maxWidth: "100%" }}
        >
          Weiland Opdracht (moeilijk)!
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
