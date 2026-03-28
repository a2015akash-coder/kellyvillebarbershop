const PRIZES = [
  { amount: "$100", count: "1 winner" },
  { amount: "$50", count: "6 winners" },
  { amount: "$20", count: "30 winners" },
];

export default function MonthlyPrizePool() {
  return (
    <section className="bg-gray-50 py-10 lg:py-14">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Monthly Prize Pool:{" "}
            <span className="text-[#FF7A00]">$1,000</span>{" "}
            <span className="font-medium text-slate-500">| 37 Winners</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            February Draw: Shopping Vouchers
          </p>
        </div>

        {/* PRIZE CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PRIZES.map((prize) => (
            <div
              key={prize.amount}
              className="rounded-3xl bg-[#FFF7ED] p-6 text-center ring-1 ring-orange-100"
            >
              <div className="text-4xl font-semibold text-[#FF7A00]">
                {prize.amount}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-700">
                {prize.count}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTNOTE */}
        <div className="mt-8 max-w-2xl">
          <p className="text-xs leading-relaxed text-slate-500">
            T&amp;Cs apply. Promotion period:{" "}
            <strong>1st February – 28th February 2026</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
