import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

export const theButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-surface-action text-text-inverted hover:bg-surface-action/90 shadow-sm",
        secondary: "bg-surface-contrast text-text-primary hover:bg-surface-hover border border-border-default",
        ghost: "text-text-primary hover:bg-surface-hover",
        destructive: "bg-surface-solid-error text-text-inverted hover:bg-surface-solid-error/90 shadow-sm",
        brand: "bg-surface-solid-brand text-text-inverted hover:bg-surface-solid-brand/90 shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface TheButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof theButtonVariants> {
  asChild?: boolean;
}

export const TheButton: React.FC<TheButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(theButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

TheButton.displayName = "TheButton";

export { TheButton as default };
