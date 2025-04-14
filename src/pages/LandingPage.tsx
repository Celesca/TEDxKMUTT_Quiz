import React from "react";
import Image from "next/image";
import Background from "@/components/Background";
import { motion } from "framer-motion";
import Button from "@/components/Button";

// Import the correct logo
import Logo from "@/assets/logos/Logo.png";

interface LandingPageProps {
  onContinue: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onContinue }) => {
  return (
    <Background>
      <motion.div
        className="rounded-lg p-6 md:p-8 max-w-xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo on the left side */}
        <div className="flex justify-center mb-8">
          <Image
            src={Logo}
            alt="TEDxKMUTT Logo"
            height={200}
            className="h-auto"
          />
        </div>
        
        {/* Main content */}
        <div className="space-y-8">
          {/* Quote and message */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800">
              ค้นหาตัวตนของตัวเองในโลกของ <span className="text-red-600">Silent Loud</span>
            </h1>
            
            <div className="relative pl-4 py-2">
              <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
              <p className="text-gray-700 italic text-lg">
                &ldquo;เมื่อความเงียบไม่ได้หมายถึงการไร้ตัวตน และเสียงไม่ได้บอกถึงการมีอยู่เสมอไป&rdquo;
              </p>
            </div>
          </div>
          
          {/* Button container - centered */}
          <div className="flex justify-center">
            <Button
              onClick={onContinue}
              variant="primary"
              text="เริ่มต้นการเดินทาง"
              className="text-base px-6 py-3 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500">
            TEDxKMUTT © {new Date().getFullYear()} | The Silent Loud
          </p>
        </div>
      </motion.div>
    </Background>
  );
};

export default LandingPage;