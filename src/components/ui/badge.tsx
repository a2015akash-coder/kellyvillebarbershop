import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-white text-slate-700 shadow-sm",
        secondary:
          "border-transparent bg-white/90 text-slate-700 shadow-sm backdrop-blur",
        muted:
          "border-[var(--border)] bg-[var(--muted)] text-slate-700",
        dark: "border-transparent bg-slate-900/80 text-white backdrop-blur",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}
