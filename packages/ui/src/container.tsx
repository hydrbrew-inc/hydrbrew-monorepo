import { type ReactNode } from "react";

/** Max-width content shell shared across marketing apps (matches typical landing `max-w-7xl` rhythm). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 ${className}`.trim()}>
      {children}
    </div>
  );
}
