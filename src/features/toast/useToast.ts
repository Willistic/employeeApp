import { useContext } from "react";

import { ToastContext } from "./ToastContext";

/**
 * Typed accessor for the toast context. Throws when used outside the provider.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
