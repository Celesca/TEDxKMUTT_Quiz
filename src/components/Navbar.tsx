import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logos/TEDxKMUTT_b.png';
import Strip from '@/assets/strip.png';

// Simple NavLink component
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <li className="relative group">
    <Link href={href} className="py-2 text-gray-800 hover:text-red-500 transition-colors">
      {text}
    </Link>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
  </li>
);

// Button component
const Button = ({ 
  variant = "primary", 
  text, 
  iconLeft = "",
  onClick 
}: { 
  variant?: "primary" | "secondary"; 
  text: string;
  iconLeft?: string;
  onClick?: () => void;
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {iconLeft && <span className="mr-2">🌐</span>}
      {text}
    </button>
  );
};

// CtaButton component
const CtaButton = () => (
  <Button variant="primary" text="Register" />
);

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 overflow-x-clip">
      <div className="relative">
        <Image
          src={Strip}
          alt=""
          width={3000}
          className="absolute -bottom-2 -right-0 -z-10 w-full scale-125"
        />
      </div>
      <div className="top-0 w-full bg-white shadow-lg">
        <nav className="relative flex justify-between px-4 py-2 items-center">
          <Link href="/#" passHref>
            <Image
              id="logo"
              src={Logo}
              alt="Logo of TEDxKMUTT"
              priority
              className="w-40"
            />
          </Link>
          <ul className="hidden md:flex gap-4 lg:gap-10 text-lg">
            <NavLink href="#speakers" text="Speakers" />
            <NavLink href="#agenda" text="Agenda" />
            <NavLink href="#faqs" text="FAQs" />
          </ul>
          <div className="flex gap-2">
            <div className="hidden md:block">
              <CtaButton />
            </div>
            <Link href="/th" passHref>
              <Button variant="secondary" text="EN" iconLeft="mdi:globe" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;