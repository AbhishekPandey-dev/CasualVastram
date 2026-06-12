import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyle = "px-8 py-3 font-inter text-sm font-medium tracking-wider uppercase transition-colors duration-250 ease-standard border radius-0";
  const variants = {
    primary: "bg-jet-black text-snow-white border-transparent hover:bg-obsidian-black",
    ghost: "bg-transparent text-jet-black border-graphite-gray hover:border-jet-black",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
