import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type ToastVariant = "success" | "error" | "info";

type ToastState = {
  message: string;
  variant: ToastVariant;
};

const variantClasses: Record<ToastVariant, string> = {
  success: "border-emerald-400/70 bg-neutral-800",
  error: "border-red-400/70 bg-neutral-800",
  info: "border-cyan-400/70 bg-neutral-800",
};

export function SignupToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ToastState>;
      const detail = customEvent.detail;
      if (!detail?.message) {
        return;
      }

      const variant: ToastVariant =
        detail.variant === "success" || detail.variant === "error" || detail.variant === "info"
          ? detail.variant
          : "info";

      setToast({ message: detail.message, variant });
      window.setTimeout(() => setToast(null), 8000);
    };

    window.addEventListener("hydrbrew:toast", handler);
    return () => window.removeEventListener("hydrbrew:toast", handler);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[70] pointer-events-none">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`max-w-lg rounded-lg border px-4 py-3 text-lg font-mono text-white shadow-[0_0_30px_rgba(0,0,0,0.6)] ${variantClasses[toast.variant]}`}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
