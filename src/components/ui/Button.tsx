import type { ButtonHTMLAttributes } from "react";

import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Shared button primitive. Visual style is driven by `variant` so the app
 * has a single, consistent button appearance instead of ad-hoc CSS.
 */
const Button = ({
  variant = "primary",
  type = "button",
  className,
  ...rest
}: ButtonProps) => {
  const classes = ["btn", `btn--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...rest} />;
};

export default Button;
