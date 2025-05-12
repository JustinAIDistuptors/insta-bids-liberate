
import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-instabids-teal focus:ring-offset-2 focus:ring-offset-instabids-dark disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-gradient-to-r from-instabids-teal to-instabids-turquoise text-white hover:brightness-110":
            variant === "primary",
          "bg-instabids-darkBlue text-white hover:bg-instabids-darkBlue/80":
            variant === "secondary",
          "bg-transparent border border-instabids-teal text-instabids-teal hover:bg-instabids-teal/10":
            variant === "outline",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
