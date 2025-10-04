export default function Home() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-amber-100 to-orange-200 p-6 rounded-xl shadow-md">
      <h1 className="text-5xl font-bold mb-6 tracking-widest text-amber-900 drop-shadow-md">
        🐎 Wild West Bank
      </h1>

      <div className="bg-amber-50 border-4 border-amber-800 rounded-xl p-6 max-w-md text-center shadow-lg font-serif">
        <h2 className="text-2xl font-bold mb-2 text-amber-800">
          Howdy, Partner!
        </h2>
        <p className="mb-4 text-amber-900">
          Step into town. You can mosey over to the{" "}
          <span className="font-bold">Bank</span>
          to stash yer gold, or head down to the{" "}
          <span className="font-bold">Market</span>
          for some tradin’.
        </p>
        <p className="italic text-amber-700">
          “Keep yer coins close, bandits roam these parts...”
        </p>
      </div>
    </div>
  );
}
