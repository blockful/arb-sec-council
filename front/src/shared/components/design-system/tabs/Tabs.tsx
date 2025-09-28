'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

// Tabs Root Component
export const tabsVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        underline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({});

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const currentValue = value !== undefined ? value : internalValue;
    
    const handleValueChange = React.useCallback((newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }, [value, onValueChange]);

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          className={cn(tabsVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// Tabs List Component
export const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-surface-contrast p-1 text-text-secondary",
  {
    variants: {
      variant: {
        default: "bg-surface-contrast",
        underline: "bg-transparent p-0 h-auto w-full flex",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

TabsList.displayName = "TabsList";

// Tabs Trigger Component
export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-surface-default data-[state=active]:text-text-primary data-[state=active]:shadow-sm hover:bg-surface-hover hover:text-text-primary",
        underline: "border-b-2 border-transparent rounded-none px-4 py-3 text-text-secondary font-medium data-[state=active]:border-surface-solid-primary data-[state=active]:text-text-primary data-[state=active]:bg-surface-background hover:text-text-primary hover:bg-surface-hover transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabsTriggerVariants({ variant }), className)}
        onClick={() => context.onValueChange?.(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

// Tabs Content Component
export const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        underline: "mt-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, variant, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabsContentVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

// Export all components and variants
export { Tabs, TabsList, TabsTrigger, TabsContent };
