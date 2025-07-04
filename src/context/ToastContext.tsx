// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ToastMessage = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
};

type ToastContextType = {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, ...toast }]);
    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration ?? 4000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
