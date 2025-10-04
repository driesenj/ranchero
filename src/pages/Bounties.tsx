import { useLocalStorage } from "../hooks/useLocalStorage";

type GEAR = "A" | "B" | "C" | "D" | "E";
const GEARS: GEAR[] = ["A", "B", "C", "D", "E"];

export default function Bounties() {
  const [gearLoans, setGearLoans] = useLocalStorage<
    Partial<Record<GEAR, number>>
  >("banditGearLoaned", {});

  // Calculate elapsed time
  const getElapsedMins = (gear: GEAR) => {
    if (gearLoans[gear] === undefined) return 0;

    const loanStart = gearLoans[gear];
    const diff = Date.now() - loanStart;
    const mins = Math.floor(diff / 60000);
    return mins;
  };

  const loanOut = (gear: GEAR) => {
    setGearLoans({
      ...gearLoans,
      [gear]: Date.now(),
    });
  };

  const returnGear = (gear: GEAR) => {
    const update = { ...gearLoans };
    delete update[gear];
    setGearLoans(update);
  };

  return (
    <>
      <div className="bg-amber-100 border-8 border-amber-800 rounded-xl shadow-lg p-6 max-w-xl mb-2 mx-auto font-serif">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-6 tracking-widest uppercase">
          🤠 PREMIES 🤠
        </h1>
      </div>

      {GEARS.map((g) => (
        <div className="bg-amber-100 border-8 border-amber-800 rounded-xl shadow-lg p-6 my-2 max-w-xl mx-auto font-serif">
          <div className="text-center">
            <p className="text-xl mb-2">Bandiet {g}</p>
            {gearLoans[g] !== undefined ? (
              <>
                <p className="text-2xl text-red-700 mb-4">
                  Premie: $ {Math.round(getElapsedMins(g) * 2)} goud
                </p>
                <button
                  onClick={() => returnGear(g)}
                  className="bg-red-700 text-white px-6 py-3 rounded-lg border-2 border-red-900 hover:bg-red-800 transition"
                >
                  Keer Premie Uit
                </button>
              </>
            ) : (
              <>
                <p className="mb-4 text-xl">
                  Uitrusting is momenteel beschikbaar.
                </p>
                <button
                  onClick={() => loanOut(g)}
                  className="bg-amber-800 text-amber-100 px-6 py-3 rounded-lg border-2 border-amber-900 hover:bg-amber-900 transition"
                >
                  Leen Uit
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
