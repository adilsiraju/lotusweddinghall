import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "default" | "gold" | "white";
}

const LoadingSpinner = ({
  size = "md",
  className,
  color = "default",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const colorClasses = {
    default: "border-lotus-navy/30 border-t-lotus-navy",
    gold: "border-lotus-gold/30 border-t-lotus-gold",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
};

export function LoadingSpinnerAlt({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-gray-200",
        "border-t-primary",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
