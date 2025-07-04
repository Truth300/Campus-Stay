// hooks/use-toast.ts
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    console.warn("useToast called outside ToastProvider");
    return { toasts: [] }; // fallback
  }
  return context;
}
