import { useEffect, useId, useRef, type ReactNode } from "react";

import "./Dialog.css";

interface DialogProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Optional footer, typically action buttons. */
  footer?: ReactNode;
}

/**
 * Accessible modal dialog primitive.
 *
 * - Labelled via `aria-labelledby`.
 * - Closes on Escape and on backdrop click.
 * - Moves focus to the close button on open and restores it on unmount.
 */
const Dialog = ({ title, onClose, children, footer }: DialogProps) => {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 id={titleId}>{title}</h3>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Dialog;
