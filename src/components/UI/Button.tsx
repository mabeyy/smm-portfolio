import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface BaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: never };
type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-white text-[#211914] hover:bg-white/90 font-semibold",
  secondary: "bg-card text-foreground hover:bg-card-hover border border-border",
  outline: "border border-white/30 text-white hover:bg-white/10",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} href={href} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
