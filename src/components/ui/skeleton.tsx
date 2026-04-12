import type { ReactNode } from "react";
import ContentLoader from "react-content-loader";
import { cn } from "@/lib/utils";

type LoadingSkeletonProps = {
  className?: string;
  containerClassName?: string;
  width?: number | string;
  height?: number | string;
  circle?: boolean;
};

export function LoadingSkeletonGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function LoadingSkeleton({
  className,
  containerClassName,
  width = "100%",
  height = 16,
  circle = false,
}: LoadingSkeletonProps) {
  const size = width ?? height ?? 16;
  const resolvedWidth = circle ? size : width;
  const resolvedHeight = circle ? size : height;

  return (
    <div className={cn("block leading-none", containerClassName)}>
      <div
        className={cn("block overflow-hidden leading-none", className)}
        style={{ width: resolvedWidth, height: resolvedHeight }}
      >
        <ContentLoader
          speed={1.1}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          backgroundColor="rgba(226, 232, 240, 0.78)"
          foregroundColor="rgba(255, 255, 255, 0.96)"
          style={{ display: "block", height: "100%", width: "100%" }}
        >
          {circle ? (
            <circle cx="50" cy="50" r="50" />
          ) : (
            <rect x="0" y="0" rx="16" ry="16" width="100" height="100" />
          )}
        </ContentLoader>
      </div>
    </div>
  );
}
