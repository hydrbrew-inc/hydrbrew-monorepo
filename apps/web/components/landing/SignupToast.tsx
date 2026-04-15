import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type ToastVariant = "success" | "error" | "info";

type ToastState = {
  message: string;
  variant: ToastVariant;
};

const variantClasses: Record<ToastVariant, string> = {
  success: "border-emerald-400/60 text-emerald-300 bg-emerald-500/10",
  error: "border-red-400/60 text-red-300 bg-red-500/10",
  info: "border-cyan-400/60 text-cyan-300 bg-cyan-500/10",
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
      window.setTimeout(() => setToast(null), 3200);
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
            className={`max-w-sm rounded-lg border px-4 py-3 text-sm font-mono backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)] ${variantClasses[toast.variant]}`}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
