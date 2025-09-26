import * as React from "react";
import { cn } from "@/shared/utils";

export interface BlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const BlankState: React.FC<BlankStateProps> = ({
  className,
  icon,
  title,
  description,
  action,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-text-dimmed">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-md mb-6">
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

BlankState.displayName = "BlankState";

export { BlankState as default };
