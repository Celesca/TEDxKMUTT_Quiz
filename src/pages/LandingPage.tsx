import React from "react";
import Image from "next/image";
import Background from "@/components/Background";
import { motion } from "framer-motion";

// Import the logo if you have one
import Logo from "@/assets/logos/TEDxKMUTT_b.png";

interface LandingPageProps {
  onContinue: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onContinue }) => {
  return (
    <Background>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.div
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="TEDxKMUTT Logo"
              width={200}
              height={60}
              className="h-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            The Silent Loud
          </h1>
          
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            Personality Quiz
          </h2>
          
          <div className="mb-6 text-gray-700">
            <p className="mb-4">
              Discover what your choices reveal about your personality in this immersive story-based quiz.
            </p>
            <p className="text-sm italic border-l-2 border-red-400 pl-3 py-2 bg-gray-50">
              "เมื่อความเงียบไม่ได้หมายถึงการไร้ตัวตน และเสียงไม่ได้บอกถึงการมีอยู่เสมอไป"
            </p>
          </div>
          
          <div className="mb-6">
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-red-500 text-white flex items-center justify-center rounded-full mr-2 text-xs">1</span>
                <span>Answer 4 story-based questions</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-red-500 text-white flex items-center justify-center rounded-full mr-2 text-xs">2</span>
                <span>Discover your MBTI personality type</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-red-500 text-white flex items-center justify-center rounded-full mr-2 text-xs">3</span>
                <span>Learn what your personality says about you</span>
              </li>
            </ul>
          </div>

          <motion.button
            onClick={onContinue}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Your Journey
          </motion.button>
          
          <p className="mt-4 text-xs text-gray-500">
            Created by TEDxKMUTT | Takes approximately 3 minutes to complete
          </p>
        </motion.div>
      </div>
    </Background>
  );
};

export default LandingPage;