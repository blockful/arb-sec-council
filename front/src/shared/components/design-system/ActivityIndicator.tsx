import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

export const activityIndicatorVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-text-primary",
        secondary: "text-text-secondary",
        brand: "text-surface-solid-brand",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface ActivityIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityIndicatorVariants> {
  label?: string;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  className,
  size,
  variant,
  label,
  ...props
}) => {
  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <div
        className={cn(activityIndicatorVariants({ size, variant }))}
        role="status"
        aria-label={label || "Loading"}
      />
      {label && (
        <span className="text-sm text-text-secondary">
          {label}
        </span>
      )}
    </div>
  );
};

ActivityIndicator.displayName = "ActivityIndicator";

export { ActivityIndicator as default };
