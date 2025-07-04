import React, { useState, useEffect } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
}

interface ToasterProps {
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'error' | 'info', duration?: number) => void;
  removeToast: (id: number) => void;
}

const Toaster: React.FC<ToasterProps> = ({ toasts, addToast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, toasts.length > 0 ? toasts[0].duration : 0);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
      
    </div>
  );
};

const useToaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(0);

  const addToast = (message: string, type: 'success' | 'error' | 'info', duration: number = 5000) => {
    const newToast = { id: nextId, message, type, duration };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setNextId((prevId) => prevId + 1);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export { Toaster, useToaster };
