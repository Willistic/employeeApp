import type { Toast } from "./types";
import "./Toast.css";

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

/**
 * Renders active toasts in a live region so screen readers announce them.
 */
export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-viewport" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live={toast.type === "error" ? "assertive" : "polite"}
        >
          <span className="toast__message">{toast.message}</span>
          <button
            type="button"
            className="toast__dismiss"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
