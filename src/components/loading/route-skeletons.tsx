import type { ReactNode } from "react";
import {
  LoadingSkeleton,
  LoadingSkeletonGroup,
} from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SERVICES_PAGE_CARD_KEYS = [
  "mens-haircut",
  "beard-trim",
  "kids-cut",
  "senior-cut",
  "blowout-taper",
  "taper-fade",
  "hair-design",
  "skin-fade",
  "hair-colour",
];

const FAQ_ROW_WIDTHS = [260, 248, 236, 224, 212];

const BLOG_GRID_KEYS = [
  "blog-1",
  "blog-2",
  "blog-3",
  "blog-4",
  "blog-5",
  "blog-6",
];

const CONTACT_CARD_KEYS = ["phone", "email", "hours", "address"];

function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <LoadingSkeletonGroup>
      <div className={cn("bg-[var(--background)]", className)}>{children}</div>
    </LoadingSkeletonGroup>
  );
}

function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-spacing", className)}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-slate-200/70 bg-white/85 p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Lines({
  widths,
  height = 14,
  className,
}: {
  widths: Array<number | string>;
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {widths.map((width) => (
        <LoadingSkeleton key={String(width)} width={width} height={height} />
      ))}
    </div>
  );
}

function HeadingBlock({
  eyebrowWidth = 112,
  titleWidths,
  descriptionWidths,
  centered = false,
}: {
  eyebrowWidth?: number;
  titleWidths: Array<number | string>;
  descriptionWidths?: Array<number | string>;
  centered?: boolean;
}) {
  return (
    <div className={cn(centered ? "mx-auto text-center" : "", "max-w-3xl")}>
      <LoadingSkeleton
        width={eyebrowWidth}
        height={14}
        className={cn(centered ? "mx-auto" : "", "mb-5")}
      />
      <Lines widths={titleWidths} height={centered ? 38 : 34} />
      {descriptionWidths ? (
        <Lines
          widths={descriptionWidths}
          height={16}
          className={cn(centered ? "mx-auto mt-5" : "mt-5")}
        />
      ) : null}
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <LoadingSkeleton height={228} className="!rounded-none" />
      <div className="space-y-4 p-6">
        <LoadingSkeleton width={96} height={22} />
        <Lines widths={["92%", "72%"]} height={26} />
        <LoadingSkeleton width={140} height={14} />
        <Lines widths={["100%", "95%", "68%"]} height={14} />
      </div>
    </Card>
  );
}

export function HomePageSkeleton() {
  return (
    <Shell>
      <section className="bg-black px-4 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex min-h-[78vh] items-center rounded-[2rem] bg-white/6 px-6 py-10 sm:px-10 sm:py-14">
            <div className="w-full max-w-3xl">
              <LoadingSkeleton width={180} height={14} className="mb-6" />
              <Lines widths={["84%", "58%"]} height={58} />
              <Lines widths={["72%", "66%"]} height={16} className="mt-6" />
              <div className="mt-8 space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-3">
                    <LoadingSkeleton width={22} height={22} circle />
                    <LoadingSkeleton width={220 + index * 18} height={18} />
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <LoadingSkeleton width={176} height={52} />
                <LoadingSkeleton width={176} height={52} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-[var(--background)] py-24 sm:py-32">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <HeadingBlock
            eyebrowWidth={104}
            titleWidths={["55%", "48%"]}
            descriptionWidths={["100%", "86%"]}
          />
          <Lines
            widths={["100%", "92%", "74%"]}
            height={15}
            className="max-w-md"
          />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="overflow-hidden p-0">
              <LoadingSkeleton height={360} className="!rounded-none" />
              <div className="space-y-4 p-6">
                <LoadingSkeleton width={120} height={24} />
                <Lines widths={["88%", "78%", "62%"]} height={15} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[#f5f5f5] py-20 sm:py-24">
        <HeadingBlock
          centered
          eyebrowWidth={118}
          titleWidths={["58%", "72%"]}
        />
        <div className="mx-auto mt-10 max-w-6xl">
          <Card className="overflow-hidden p-0">
            <div className="grid md:grid-cols-[1.08fr_0.92fr]">
              <LoadingSkeleton height={520} className="!rounded-none" />
              <div className="space-y-6 p-6 sm:p-8 md:p-10">
                <LoadingSkeleton width={52} height={52} />
                <Lines widths={["36%", "72%", "48%"]} height={18} />
                <Lines
                  widths={["100%", "96%", "82%"]}
                  height={16}
                  className="pt-2"
                />
                <div className="mt-10 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <LoadingSkeleton
                        key={index}
                        width={index === 0 ? 34 : 12}
                        height={12}
                      />
                    ))}
                  </div>
                  <LoadingSkeleton width={58} height={12} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <HeadingBlock
          centered
          eyebrowWidth={96}
          titleWidths={["50%", "66%"]}
          descriptionWidths={["54%"]}
        />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <LoadingSkeleton
              key={index}
              height={220}
              className="!rounded-[1.75rem]"
            />
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50/60 py-16 sm:py-20">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <HeadingBlock
            eyebrowWidth={74}
            titleWidths={["42%", "54%"]}
            descriptionWidths={["76%"]}
          />
          <LoadingSkeleton width={168} height={48} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </Section>

      <Section className="bg-white py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Card className="p-3">
            <LoadingSkeleton height={320} className="!rounded-[1.4rem]" />
          </Card>
          <Card className="p-8 lg:p-10">
            <HeadingBlock eyebrowWidth={92} titleWidths={["80%", "68%"]} />
            <Lines
              widths={["100%", "94%", "72%"]}
              height={16}
              className="mt-6"
            />
            <Lines widths={["96%", "82%"]} height={16} className="mt-4" />
            <LoadingSkeleton width={156} height={48} className="mt-8" />
          </Card>
        </div>
      </Section>
    </Shell>
  );
}

export function ServicesPageSkeleton() {
  return (
    <Shell>
      <Section className="bg-white py-16 sm:py-20">
        <HeadingBlock
          eyebrowWidth={104}
          titleWidths={["44%", "62%"]}
          descriptionWidths={["86%", "68%"]}
        />
      </Section>

      <Section className="bg-white py-6 sm:py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_PAGE_CARD_KEYS.map((key) => (
            <Card key={key} className="overflow-hidden p-0">
              <LoadingSkeleton height={240} className="!rounded-none" />
              <div className="space-y-4 p-6">
                <LoadingSkeleton width={148} height={24} />
                <Lines widths={["96%", "84%", "72%"]} height={15} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 py-12">
        <Card className="grid gap-6 p-8 md:grid-cols-[1.2fr_0.8fr]">
          <Lines widths={["42%", "64%"]} height={30} />
          <div className="space-y-4">
            <Lines widths={["100%", "96%", "84%"]} height={16} />
            <LoadingSkeleton width={164} height={46} />
          </div>
        </Card>
      </Section>

      <Section className="bg-gray-50 py-16 sm:py-20">
        <HeadingBlock
          eyebrowWidth={126}
          titleWidths={["40%", "56%"]}
          descriptionWidths={["70%"]}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="overflow-hidden p-0">
              <LoadingSkeleton height={220} className="!rounded-none" />
              <div className="space-y-4 p-6">
                <LoadingSkeleton width={160} height={22} />
                <Lines widths={["92%", "74%"]} height={14} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white py-14">
        <HeadingBlock eyebrowWidth={74} titleWidths={["32%", "48%"]} />
        <div className="mt-10 space-y-4">
          {FAQ_ROW_WIDTHS.map((width) => (
            <Card key={width} className="flex items-center justify-between p-5">
              <LoadingSkeleton width={width} height={18} />
              <LoadingSkeleton width={20} height={20} />
            </Card>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

export function BlogsPageSkeleton() {
  return (
    <Shell>
      <Section className="bg-gray-50 py-20">
        <Card className="mb-10 p-8">
          <HeadingBlock
            eyebrowWidth={88}
            titleWidths={["34%", "52%"]}
            descriptionWidths={["82%"]}
          />
          <LoadingSkeleton height={50} className="mt-8 !rounded-full" />
          <div className="mt-6 flex flex-wrap gap-3">
            {[86, 98, 104, 116].map((width) => (
              <LoadingSkeleton key={width} width={width} height={34} />
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_GRID_KEYS.map((key) => (
            <BlogCardSkeleton key={key} />
          ))}
        </div>
      </Section>
    </Shell>
  );
}

export function BlogPostSkeleton() {
  return (
    <Shell>
      <section className="bg-[#fafafa] py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4">
          <LoadingSkeleton width={76} height={16} className="mb-8" />
          <LoadingSkeleton width={92} height={14} className="mb-5" />
          <Lines widths={["92%", "68%"]} height={42} />
          <LoadingSkeleton width={142} height={14} className="mt-5" />
          <LoadingSkeleton
            width={80}
            height={1}
            className="mt-8 !rounded-none"
          />
          <LoadingSkeleton height={340} className="mt-10 !rounded-[1.75rem]" />
          <Lines
            widths={["100%", "96%", "94%", "88%"]}
            height={16}
            className="mt-10"
          />
          <Lines widths={["84%", "74%"]} height={30} className="mt-10" />
          <Lines
            widths={["100%", "98%", "92%", "78%"]}
            height={16}
            className="mt-6"
          />
          <Lines widths={["88%", "94%", "76%"]} height={16} className="mt-8" />
        </div>
      </section>
    </Shell>
  );
}

export function ContactPageSkeleton() {
  return (
    <Shell>
      <Section className="bg-slate-50 py-16 sm:py-20">
        <HeadingBlock
          eyebrowWidth={118}
          titleWidths={["38%", "54%"]}
          descriptionWidths={["84%", "62%"]}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTACT_CARD_KEYS.map((key) => (
            <Card key={key} className="space-y-5">
              <div className="flex items-center gap-3">
                <LoadingSkeleton width={44} height={44} />
                <LoadingSkeleton width={144} height={18} />
              </div>
              <Lines widths={["86%", "72%", "58%"]} height={15} />
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <Card className="p-8">
          <HeadingBlock
            eyebrowWidth={96}
            titleWidths={["30%", "42%"]}
            descriptionWidths={["56%"]}
          />
          <LoadingSkeleton height={420} className="mt-8 !rounded-[1.5rem]" />
        </Card>
      </Section>
    </Shell>
  );
}

export function PromotionsPageSkeleton() {
  return (
    <Shell>
      <Section className="bg-white py-8 lg:py-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Card className="p-8">
            <LoadingSkeleton width={220} height={34} />
            <Lines
              widths={["92%", "84%", "70%"]}
              height={16}
              className="mt-6"
            />
            <Lines
              widths={["100%", "95%", "88%"]}
              height={16}
              className="mt-4"
            />
          </Card>
          <Card className="p-5">
            <LoadingSkeleton height={440} className="!rounded-[1.5rem]" />
          </Card>
        </div>
      </Section>

      <Section className="bg-gray-50 py-10 lg:py-14">
        <HeadingBlock
          eyebrowWidth={138}
          titleWidths={["32%", "44%"]}
          descriptionWidths={["34%"]}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="space-y-3 text-center">
              <LoadingSkeleton width={112} height={42} className="mx-auto" />
              <LoadingSkeleton width={96} height={16} className="mx-auto" />
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[#fff7ed] py-16 lg:py-20">
        <HeadingBlock
          eyebrowWidth={120}
          titleWidths={["38%", "54%"]}
          descriptionWidths={["44%"]}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-2">
          <Card className="lg:col-span-4">
            <Lines widths={["26%", "54%", "80%"]} height={18} />
            <Lines widths={["100%", "92%"]} height={15} className="mt-4" />
          </Card>
          <Card className="lg:col-span-2">
            <Lines widths={["34%", "70%"]} height={18} />
            <Lines widths={["92%", "74%"]} height={15} className="mt-4" />
          </Card>
          <Card className="lg:col-span-2">
            <Lines widths={["34%", "64%"]} height={18} />
            <Lines widths={["90%", "68%"]} height={15} className="mt-4" />
          </Card>
          <Card className="lg:col-span-4">
            <Lines widths={["26%", "58%"]} height={18} />
            <Lines widths={["100%", "88%"]} height={15} className="mt-4" />
          </Card>
        </div>
      </Section>

      <Section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-screen-md text-center">
          <Lines widths={["56%", "42%"]} height={32} className="mx-auto" />
          <LoadingSkeleton
            width={80}
            height={1}
            className="mx-auto mt-4 !rounded-none"
          />
          <Lines
            widths={["48%", "62%", "86%"]}
            height={16}
            className="mx-auto mt-6"
          />
        </div>
      </Section>
    </Shell>
  );
}

export function WinPageSkeleton() {
  return (
    <Shell className="bg-[#ff7a00]">
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Card className="order-2 bg-white/10 p-8 text-white lg:order-1">
              <LoadingSkeleton width={184} height={14} className="mb-5" />
              <Lines widths={["72%", "58%"]} height={42} />
              <Lines widths={["92%", "78%"]} height={16} className="mt-5" />
              <LoadingSkeleton width={150} height={18} className="mt-6" />
            </Card>

            <Card className="order-1 overflow-hidden p-0 lg:order-2">
              <div className="border-b border-slate-200 px-5 py-4">
                <LoadingSkeleton width={188} height={18} />
                <LoadingSkeleton width={164} height={12} className="mt-2" />
              </div>
              <LoadingSkeleton height={560} className="!rounded-none" />
            </Card>
          </div>
        </div>
      </section>
    </Shell>
  );
}
