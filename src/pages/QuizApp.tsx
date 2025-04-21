// Example implementation for updating the QuizApp.tsx file

"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { personalityQuestions } from "@/content/th_questions";
import Background from "@/components/Background";
import { QuizState, Points, MBTIDimension } from "@/types/QuizType";
import Button from "@/components/Button";
import Image from "next/image";

const INITIAL_POINTS = 0;
const INITIAL_QUIZ_STATE: QuizState = {
  currentQuestion: 0,
  mbtiScores: {
    E: INITIAL_POINTS,
    I: INITIAL_POINTS,
    S: INITIAL_POINTS,
    N: INITIAL_POINTS,
    T: INITIAL_POINTS,
    F: INITIAL_POINTS,
    J: INITIAL_POINTS,
    P: INITIAL_POINTS,
  },
  showResults: false,
  questions: [],
  isLoading: true,
  mbtiType: "",
};

export default function PersonalityQuizApp() {
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const discountCode = "KMUTTX2025"; // Your discount code

  // Replace the downloadResultCard function with this shareResultCard function
  const shareResultCard = async () => {
    try {
      // Download the image first
      const link = document.createElement('a');
      link.download = `${quizState.mbtiType}.png`;
      link.href = getMBTICardPath(quizState.mbtiType);
      link.click();

      // Then show the popup
      setShowSharePopup(true);

      // Auto-hide popup after 10 seconds
      setTimeout(() => {
        setShowSharePopup(false);
        setCopiedCode(false);
      }, 10000);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Function to copy discount code to clipboard
  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };


  const [, setHasAnimated] = useState(false);


  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const submitToGoogleForm = async (mbtiType: string) => {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdEuU3ug9Tf9OWpM1heoV8rDq06y_q_rRRZM6Jx58XrKRNU6Q/formResponse';
    const formData = new FormData();

    // https://docs.google.com/forms/d/e/1FAIpQLSdEuU3ug9Tf9OWpM1heoV8rDq06y_q_rRRZM6Jx58XrKRNU6Q/viewform?usp=pp_url&entry.1485371814=25/2/2025&entry.424896981=ENTJ
    formData.append('entry.1485371814', formatDate(new Date()));
    formData.append('entry.424896981', mbtiType);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const downloadResultCard = async () => {
  //   try {
  //     const link = document.createElement('a');
  //     link.download = `${quizState.mbtiType}.png`;
  //     link.href = getMBTICardPath(quizState.mbtiType);
  //     link.click();
  //   } catch (error) {
  //     console.error("Error generating download:", error);
  //   }
  // };

  function getMBTICardPath(type: string): string {
    return `/cards/${type}.png`;
  }

  const loadQuestions = async () => {
    setQuizState((prev) => ({
      ...prev,
      questions: personalityQuestions,
      isLoading: false,
    }));
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    setHasAnimated(false);
    setSelectedAnswer(null);
  }, [quizState.currentQuestion]);

  useEffect(() => {
    if (quizState.showResults && quizState.mbtiType) {
      submitToGoogleForm(quizState.mbtiType);
    }
  }, [quizState.showResults, quizState.mbtiType]);

  // Modify the handleAnswerClick function to ensure proper reset of animations and styles
  const handleAnswerClick = (dimension: MBTIDimension, index: number): void => {
    console.log("Selected dimension:", dimension);

    // Set the selected answer index
    setSelectedAnswer(index);

    // Start container fade-out animation
    setIsTransitioning(true);

    // Shorter delay (300ms instead of 500ms)
    setTimeout(() => {
      // Update the quiz state first
      setQuizState((prev) => {
        const nextQuestion = prev.currentQuestion + 1;
        const updatedScores = { ...prev.mbtiScores };

        updatedScores[dimension] = updatedScores[dimension] + 1;
        const isComplete = nextQuestion >= prev.questions.length;

        let mbtiType = prev.mbtiType;
        if (isComplete) {
          mbtiType = calculateMBTIType(updatedScores);
        }

        return {
          ...prev,
          mbtiScores: updatedScores,
          currentQuestion: nextQuestion,
          showResults: isComplete,
          mbtiType: mbtiType
        };
      });

      // Force reset selected answer state
      setSelectedAnswer(null);

      // Quick delay before starting fade-in animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300); // Faster transition (was 500ms)
  };

  // Fade-in
  useEffect(() => {
    // Set transitioning to false when component mounts to show initial fade-in
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateMBTIType = (scores: Points): string => {
    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('');

    return type;
  };

  const resetQuiz = (): void => {
    setQuizState({
      ...INITIAL_QUIZ_STATE,
      questions: quizState.questions,
      isLoading: false,
    });
  };

  if (quizState.showResults) {
    return (
      <Background>
        <motion.div
          className="max-w-md w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Result card content to be captured - only the image */}
          <div className="mb-4 w-full text-center">
            <h2 className="text-2xl font-bold text-black drop-shadow-md mb-2">
              คุณคือ..
            </h2>
          </div>

          <div ref={resultCardRef} className="w-full">
            <Image
              src={getMBTICardPath(quizState.mbtiType)}
              alt={`${quizState.mbtiType} Personality Card`}
              className="w-full rounded-lg shadow-xl"
              width={1080}
              height={1920}
              priority
            />
          </div>

          {/* Action Buttons - positioned below the image */}
          <div className="flex gap-4 mt-6 w-full">
            <Button
              onClick={resetQuiz}
              variant="secondary"
              className="flex-1 items-center"
              iconLeft={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              text="Try Again"
            />
            <Button
              onClick={() => shareResultCard()}
              variant="primary"
              className="flex-1 items-center"
              iconLeft={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              }
              text="Share"
            />
          </div>

          {/* Share Success Popup */}
          <AnimatePresence>
            {showSharePopup && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSharePopup(false)}></div>
                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-6 relative z-10 max-w-sm w-full"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <button
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowSharePopup(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3">ขอบคุณที่มาร่วมสนุกกับเรา!</h3>
                    <p className="text-gray-600 mb-5 text-lg">โค้ดส่วนลดสำหรับบัตรปกติและนักศึกษา พร้อมรูปภาพแสนน่ารัก!</p>

                    <div className="w-full p-4 bg-gradient-to-r from-red-50 to-gray-50 rounded-lg flex items-center justify-between mb-5 border border-red-100 shadow-sm">
                      <span className="font-mono font-bold text-red-600 text-xl tracking-wider">{discountCode}</span>
                      <button
                        className="text-gray-500 hover:text-red-600 transition-colors bg-white p-2 rounded-md shadow-sm hover:shadow"
                        onClick={copyDiscountCode}
                      >
                        {copiedCode ? (
                          <span className="text-green-600 text-sm font-medium px-2">Copied!</span>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <p className="text-gray-600">
                      ใช้โค้ดส่วนลดได้ที่
                      <a
                        className="ml-1 text-red-600 font-medium hover:text-red-700 transition-colors hover:underline inline-flex items-center"
                        href="https://www.zipeventapp.com/e/TEDxKMUTT-The-Silent-Loud-Shaping-Tomorrow-Honoring-Today"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        เว็บไซต์
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Background>
    );
  }

  return (
    <Background>
      {/* Add container fade-out/fade-in animation */}
      <motion.div
        className="bg-white backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {quizState.isLoading ? (
          <div className="text-gray-800 text-center">
            <p>Loading questions...</p>
          </div>
        ) : quizState.questions.length === 0 ? (
          <div className="text-gray-800 text-center">
            <p>No questions available.</p>
          </div>
        ) : (
          <>
            {/* Faster title animation */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: -10 }} // Less movement
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }} // Faster
            >
              <div className="absolute -left-2 top-0 h-full w-1 bg-red-500"></div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                {quizState.currentQuestion + 1}. &ldquo;{quizState.questions[quizState.currentQuestion]?.title || "เสียงของการเริ่มต้น"}&rdquo;
              </h2>
              <div className="w-16 h-0.5 bg-red-500 mb-2"></div>
            </motion.div>

            {/* Faster narrative animation */}
            <motion.div
              className="bg-gray-50 border-l-2 border-gray-300 pl-4 py-3 mb-6 text-gray-700 italic text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }} // Faster with minimal delay
            >
              <p className="whitespace-pre-line">
                {quizState.questions[quizState.currentQuestion]?.question ||
                  "คุณลืมตาขึ้นมาในห้องสีขาวที่เงียบจนได้ยินเสียงหัวใจเต้นเบา ๆ\n\nสวัสดีผู้ได้รับเชิญ คุณได้เข้าร่วมโปรเจกต์ลับ &ldquo;The Silent Loud&rdquo;\nคุณจะได้รับ &ldquo;พลังแรก&rdquo; เพื่อใช้ปลุกความเงียบในโลกใบนี้\n\nคุณจะทำอะไรต่อจากนี้ดี"}
              </p>
            </motion.div>

            {/* Faster answer animations with reduced delays */}
            <div className="space-y-3">
              {quizState.questions[quizState.currentQuestion]?.answers.map((answer, index) => (
                <motion.button
                  key={`answer-${quizState.currentQuestion}-${index}`} // Key based on both question and answer index
                  onClick={() => handleAnswerClick(answer.dimension, index)}
                  className={`w-full bg-gray-50 text-gray-800 py-3 px-5 rounded-lg
                  hover:bg-red-50 hover:border-red-300 transition duration-300 ease-in-out
                  text-left text-base border border-gray-200 relative group overflow-hidden
                  ${selectedAnswer === index ? 'bg-red-50 border-red-400' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + (index * 0.08),
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: selectedAnswer === null ? 1.02 : 1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedAnswer !== null}
                >
                  {/* Rest of button content remains the same */}
                  <motion.div
                    key={`bg-${quizState.currentQuestion}-${index}`} // Key for background animation
                    className="absolute inset-0 bg-red-100 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: selectedAnswer === null ? 0.08 : 0 }}
                    animate={{ scaleX: selectedAnswer === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 flex items-center">
                    <span className={`w-6 h-6 ${selectedAnswer === index ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                      } text-center rounded-full mr-3 font-medium group-hover:bg-red-500 group-hover:text-white transition-colors flex items-center justify-center text-sm`}>
                      {['A', 'B', 'C', 'D'][index]}
                    </span>
                    <span className={`${selectedAnswer === index ? 'text-red-700' : ''
                      } group-hover:text-red-700 transition-colors text-base`}>
                      {answer.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </Background>
  );
}