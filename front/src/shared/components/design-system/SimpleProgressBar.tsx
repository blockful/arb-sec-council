import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

export const simpleProgressBarVariants = cva(
  "w-full rounded-full bg-surface-contrast overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const progressFillVariants = cva(
  "h-full transition-all duration-300 ease-in-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-surface-action",
        success: "bg-surface-solid-success",
        warning: "bg-surface-solid-warning",
        error: "bg-surface-solid-error",
        brand: "bg-surface-solid-brand",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SimpleProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof simpleProgressBarVariants>,
    VariantProps<typeof progressFillVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export const SimpleProgressBar: React.FC<SimpleProgressBarProps> = ({
  className,
  size,
  variant,
  value,
  max = 100,
  label,
  showValue = false,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-text-primary">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-text-secondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn(simpleProgressBarVariants({ size }))}>
        <div
          className={cn(progressFillVariants({ variant }))}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
};

SimpleProgressBar.displayName = "SimpleProgressBar";

export { SimpleProgressBar as default };
