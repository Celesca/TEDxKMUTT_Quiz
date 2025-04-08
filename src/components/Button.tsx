import React from 'react';

interface ButtonProps {
  text: string;
  description?: string;
  variant: "primary" | "secondary";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  description,
  variant,
  iconLeft,
  iconRight,
  onClick,
  className = ''
}) => {
  const variantClasses = {
    primary:
      "bg-red-600 group-hover:bg-red-700 text-white border border-b-4 border-black active:border-b active:translate-y-1",
    secondary:
      "bg-white group-hover:bg-neutral-100 text-red-600 border border-b-4 border-black active:border-b active:translate-y-1",
  };

  return (
    <div className={`group flex flex-col gap-1 ${className}`}>
      <button
        onClick={onClick}
        className={`flex items-center gap-1 font-bold text-lg px-6 py-3 rounded-full duration-200 ${variantClasses[variant]}`}
      >
        {iconLeft && iconLeft}
        <p>{text}</p>
        {iconRight && iconRight}
      </button>
      {description && <small className="text-gray-600">{description}</small>}
    </div>
  );
};

export default Button;