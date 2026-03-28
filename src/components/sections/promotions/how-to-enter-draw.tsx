import {
  ClipboardCheck,
  RotateCw,
  PhoneCall,
  Scissors,
} from "lucide-react";

function StepHeader({
  icon,
  step,
}: {
  icon: React.ReactNode;
  step: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
        {icon}
      </div>
      <span className="text-xs font-semibold tracking-wide text-orange-600">
        {step}
      </span>
    </div>
  );
}

export default function HowToEnterDraw() {
  return (
    <section className="bg-[#FFF7ED] py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            How to Enter the Monthly Draw
          </h2>
          <p className="mt-2 text-slate-600">
            Simple steps. In store. Automatic entry.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-2">
          {/* STEP 1 */}
          <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-4 lg:row-span-1">
            <StepHeader icon={<ClipboardCheck />} step="STEP 1" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Submit the Entry Form
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              Fill in the short entry form with your details at{" "}
              <a
                href="https://kellyvillebarber.com.au/win"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700"
              >
                kellyvillebarber.com.au/win
              </a>
            </p>
          </div>

          {/* STEP 2 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2 lg:row-span-1">
            <StepHeader icon={<RotateCw />} step="STEP 2" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Spin the Wheel
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              At the end of each month, all valid entries go into the draw.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2 lg:row-span-1">
            <StepHeader icon={<PhoneCall />} step="STEP 3" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Get Notified
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Winners receive an SMS or phone call and are announced on social
              media.
            </p>
          </div>

          {/* STEP 4 */}
          <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-4 lg:row-span-1">
            <StepHeader icon={<Scissors />} step="STEP 4" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Collect Your Prize
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              Visit the shop, make a purchase, and collect your prize in person.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
