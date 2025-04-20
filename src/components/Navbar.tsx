import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Logo from '@/assets/logos/TEDxKMUTT_b.png';

const Navbar = () => {

    const refreshPage = () => {
      window.location.reload();
    };

  return (
    <div className="sticky top-0 z-50 w-full">
      
      {/* The actual navbar with white background */}
      <div className="relative w-full bg-white shadow-lg">
        <nav className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
        <button 
            onClick={refreshPage} 
            className="relative z-10 focus:outline-none"
            aria-label="Refresh page"
          >
            <Image
              src={Logo}
              alt="Logo of TEDxKMUTT"
              priority
              width={160}
              height={40}
              className="w-28 sm:w-40"
            />
          </button>
          
          <div className="relative z-10">
            <a href="https://thesilentloud.tedxkmutt.com/" target="_blank" rel="noopener noreferrer"> 
            <Button 
              variant="primary" 
              text="Get My Ticket ↗" 
              className="transform scale-75 sm:scale-100 origin-right"
            />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;