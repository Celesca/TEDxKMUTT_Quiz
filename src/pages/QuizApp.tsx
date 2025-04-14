// Example implementation for updating the QuizApp.tsx file

"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { personalityQuestions } from "@/content/th_questions";
import Background from "@/components/Background";
import { QuizState, Points, MBTIDimension } from "@/types/QuizType";

// Images
import GooseTuktuk from "@/assets/goose_tuktuk.png";

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

  // Update your reset animation effect to also reset the selected answer
  useEffect(() => {
    setHasAnimated(false);
    setSelectedAnswer(null); // Reset selected answer when question changes
  }, [quizState.currentQuestion]);

  // Modify the handleAnswerClick function for faster transitions
  const handleAnswerClick = (dimension: MBTIDimension, index: number): void => {
    console.log("Selected dimension:", dimension);

    // Set the selected answer index
    setSelectedAnswer(index);

    // Start container fade-out animation
    setIsTransitioning(true);

    // Shorter delay (300ms instead of 500ms)
    setTimeout(() => {
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

  // Modify the calculateMBTIType function to auto-submit the form
  const calculateMBTIType = (scores: Points): string => {
    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.S > scores.N ? 'S' : 'N',
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('');

    // Automatically submit the form when we determine the MBTI type
    setTimeout(() => {
      submitToGoogleForm(type);
    }, 500);

    return type;
  };

  const resetQuiz = (): void => {
    setQuizState({
      ...INITIAL_QUIZ_STATE,
      questions: quizState.questions,
      isLoading: false,
    });
  };

  // Result UI
  if (quizState.showResults) {
    return (
      <Background>
        <motion.div
          className="bg-white backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">คุณคือ..</h2>
          <h3 className="text-3xl font-bold text-red-500 mb-6 text-center">
            {quizState.mbtiType}
          </h3>

          {/* Rest of the results content */}
          <div className="bg-gray-50 border-l-2 border-gray-300 pl-4 py-3 mb-6 text-gray-700 italic">
            <p className="mb-2">
              You are a <span className="font-semibold">{quizState.mbtiType}</span> personality type.
            </p>
            <p>
              {getMBTIDescription(quizState.mbtiType)}
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Try Again
          </button>
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
        transition={{ duration: 0.3 }} // Fast transition
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
                  key={index}
                  onClick={() => handleAnswerClick(answer.dimension, index)}
                  className={`w-full bg-gray-50 text-gray-800 py-3 px-5 rounded-lg
             hover:bg-red-50 hover:border-red-300 transition duration-300 ease-in-out
             text-left text-base border border-gray-200 relative group overflow-hidden
             ${selectedAnswer === index ? 'bg-red-50 border-red-400' : ''}`}
                  initial={{ opacity: 0, x: -20 }} // Less movement
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3, // Faster
                    delay: 0.2 + (index * 0.08), // Much shorter stagger delay
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
                    className={`absolute inset-0 bg-red-100 origin-left ${selectedAnswer === index ? 'scale-x-100' : ''}`}
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

// Helper function to get personality type descriptions
function getMBTIDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'INTJ': 'The Architect - Imaginative and strategic thinkers, with a plan for everything.',
    'INTP': 'The Logician - Innovative inventors with an unquenchable thirst for knowledge.',
    'ENTJ': 'The Commander - Bold, imaginative and strong-willed leaders, always finding a way.',
    'ENTP': 'The Debater - Smart and curious thinkers who cannot resist an intellectual challenge.',
    'INFJ': 'The Advocate - Quiet and mystical, yet very inspiring and tireless idealists.',
    'INFP': 'The Mediator - Poetic, kind and altruistic people, always eager to help a good cause.',
    'ENFJ': 'The Protagonist - Charismatic and inspiring leaders, able to mesmerize their listeners.',
    'ENFP': 'The Campaigner - Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    'ISTJ': 'The Logistician - Practical and fact-minded individuals, whose reliability cannot be doubted.',
    'ISFJ': 'The Defender - Very dedicated and warm protectors, always ready to defend their loved ones.',
    'ESTJ': 'The Executive - Excellent administrators, unsurpassed at managing things or people.',
    'ESFJ': 'The Consul - Extraordinarily caring, social and popular people, always eager to help.',
    'ISTP': 'The Virtuoso - Bold and practical experimenters, masters of all kinds of tools.',
    'ISFP': 'The Adventurer - Flexible and charming artists, always ready to explore and experience something new.',
    'ESTP': 'The Entrepreneur - Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    'ESFP': 'The Entertainer - Spontaneous, energetic and enthusiastic people – life is never boring around them.',
  };

  return descriptions[type] || 'Your personality type combines multiple traits that make you unique.';
}