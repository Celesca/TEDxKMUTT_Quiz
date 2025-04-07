import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import Logo from '@/assets/logos/TEDxKMUTT_b.png';
import Strip from '@/assets/strip.png';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="absolute inset-x-0 -bottom-2 overflow-hidden">
        <Image
          src={Strip}
          alt=""
          width={3000}
          height={600}
          className="w-full scale-125"
          priority
        />
      </div>
      <div className="w-full bg-white shadow-lg">
        <nav className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          <Link href="/#" className="relative z-10">
            <Image
              src={Logo}
              alt="Logo of TEDxKMUTT"
              priority
              width={160}
              height={40}
              className="w-28 sm:w-40"
            />
          </Link>
          
          <div className="relative z-10">
            <Button 
              variant="primary" 
              text="Get My Ticket" 
              className="transform scale-75 sm:scale-100 origin-right"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;