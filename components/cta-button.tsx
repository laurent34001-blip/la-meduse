import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: CTAButtonProps) {
  const classes = ["button", `button-${variant}`, className].filter(Boolean).join(" ");

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
