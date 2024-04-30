import React, { HTMLProps } from "react";

interface TextProps extends HTMLProps<HTMLParagraphElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "sm";
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "p",
  ...props
}) => {
  const variants = {
    h1: {
      fontSize: 32.44,
      fontWeight: 800,
    },
    h2: {
      fontSize: 28.83,
      fontWeight: 800,
    },
    h3: {
      fontSize: 25.63,
      fontWeight: 700,
    },
    h4: {
      fontSize: 22.78,
      fontWeight: 700,
    },
    h5: {
      fontSize: 20.25,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
      fontWeight: 600,
    },
    p: {
      fontSize: 15,
      fontWeight: 500,
    },
    sm: {
      fontSize: 14,
      fontWeight: 500,
    },
  };
  return (
    <p style={{ ...variants[variant] }} {...props}>
      {children}
    </p>
  );
};
