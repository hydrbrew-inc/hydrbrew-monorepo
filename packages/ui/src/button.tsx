"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

/** Shared button primitive for all apps; compose with Tailwind `className` in each app. */
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ className = "", type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={["cursor-pointer", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});
