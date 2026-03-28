import { cn } from "@/lib/utils";
import { badgeVariants } from "./badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <span
          className={badgeVariants({
            className: "mb-4 tracking-[0.16em]",
          })}
        >
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
