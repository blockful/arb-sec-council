import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx and tailwind-merge
 * This ensures proper class precedence and removes duplicate classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
