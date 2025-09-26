import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

export const searchFieldVariants = cva(
  "flex items-center w-full rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchFieldVariants> {
  icon?: React.ReactNode;
  onClear?: () => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  className,
  size,
  icon,
  onClear,
  value,
  ...props
}) => {
  return (
    <div className={cn(searchFieldVariants({ size }), className)}>
      {icon && (
        <span className="text-text-dimmed mr-2 flex-shrink-0">
          {icon}
        </span>
      )}
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-text-dimmed"
        value={value}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-text-dimmed hover:text-text-secondary ml-2 flex-shrink-0"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

SearchField.displayName = "SearchField";

export { SearchField as default };
