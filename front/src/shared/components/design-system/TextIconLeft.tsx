import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

export const textIconLeftVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "text-text-primary",
        secondary: "text-text-secondary",
        dimmed: "text-text-dimmed",
        success: "text-text-success",
        warning: "text-text-warning",
        error: "text-text-error",
        link: "text-text-link hover:text-text-link/80",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

export interface TextIconLeftProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textIconLeftVariants> {
  icon: React.ReactNode;
  text: string;
}

export const TextIconLeft: React.FC<TextIconLeftProps> = ({
  className,
  variant,
  size,
  icon,
  text,
  ...props
}) => {
  return (
    <span
      className={cn(textIconLeftVariants({ variant, size }), className)}
      {...props}
    >
      <span className="flex-shrink-0">
        {icon}
      </span>
      <span>
        {text}
      </span>
    </span>
  );
};

TextIconLeft.displayName = "TextIconLeft";

export { TextIconLeft as default };
