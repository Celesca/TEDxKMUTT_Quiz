// Example implementation for updating the QuizApp.tsx file

"use client";
import { useState, useEffect } from "react";
import { personalityQuestions } from "@/content/th_questions";
import Background from "./Background";
import { QuizState, Points, MBTIDimension } from "@/types/QuizType";

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
  const [userName, setUserName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const submitToGoogleForm = async (mbtiType: string) => {
    setIsSubmitting(true);
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const formData = new FormData();
    
    formData.append('entry.1125391159', userName);
    formData.append('entry.1183018060', new Date().toISOString());
    formData.append('entry.2109044670', mbtiType);
    
    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
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

  // Handle answer click
  const handleAnswerClick = (dimension: MBTIDimension): void => {
    setQuizState((prev) => {
      const nextQuestion = prev.currentQuestion + 1;
      const updatedScores = { ...prev.mbtiScores };
      
      // Increment the score for the selected dimension
      updatedScores[dimension] = updatedScores[dimension] + 1;
      
      // Check if we've completed all questions
      const isComplete = nextQuestion >= prev.questions.length;
      
      // If complete, calculate the MBTI type
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
  };

  // Calculate MBTI type based on scores
  const calculateMBTIType = (scores: Points): string => {
    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.S > scores.N ? 'S' : 'N',
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
    setSubmitSuccess(false);
    setUserName("");
  };

  if (quizState.showResults) {
    return (
      <Background>
        <div className="bg-white backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Your MBTI Type</h2>
          <h3 className="text-3xl font-bold text-red-500 mb-6 text-center">
            {quizState.mbtiType}
          </h3>
          
          <div className="bg-gray-50 border-l-2 border-gray-300 pl-4 py-3 mb-6 text-gray-700 italic">
            {/* Description based on MBTI type */}
            <p className="mb-2">
              You are a <span className="font-semibold">{quizState.mbtiType}</span> personality type.
            </p>
            <p>
              {getMBTIDescription(quizState.mbtiType)}
            </p>
          </div>
          
          {!submitSuccess ? (
            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Your Name:</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                placeholder="Enter your name"
              />
              
              <button
                onClick={() => submitToGoogleForm(quizState.mbtiType)}
                disabled={isSubmitting || !userName.trim()}
                className={`w-full ${
                  isSubmitting || !userName.trim() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                } text-white py-3 px-6 rounded-lg transition duration-300 mb-4`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Results'}
              </button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-100 border border-green-500 rounded-lg">
              <p className="text-green-800">Thank you for submitting your results!</p>
            </div>
          )}
          
          <button
            onClick={resetQuiz}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="bg-white backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl">
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
            {/* Story title with decorative elements */}
            <div className="relative mb-6">
              <div className="absolute -left-2 top-0 h-full w-1 bg-red-500"></div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                {quizState.currentQuestion + 1}. "{quizState.questions[quizState.currentQuestion]?.title || "เสียงของการเริ่มต้น"}"
              </h2>
              <div className="w-16 h-0.5 bg-red-500 mb-2"></div>
            </div>
            
            {/* Story narrative */}
            <div className="bg-gray-50 border-l-2 border-gray-300 pl-4 py-3 mb-6 text-gray-700 italic text-lg leading-relaxed">
              {quizState.questions[quizState.currentQuestion]?.question || 
               "คุณลืมตาขึ้นมาในห้องสีขาวที่เงียบจนได้ยินเสียงหัวใจเต้นเบา ๆ\n\nสวัสดีผู้ได้รับเชิญ คุณได้เข้าร่วมโปรเจกต์ลับ \"The Silent Loud\"\nคุณจะได้รับ \"พลังแรก\" เพื่อใช้ปลุกความเงียบในโลกใบนี้\n\nคุณจะทำอะไรต่อจากนี้ดี"}
            </div>
            
            {/* Decision prompt */}
            <p className="text-gray-800 font-medium mb-4">
              เลือกการกระทำของคุณ:
            </p>
            
            {/* Answer choices styled as story decisions */}
            <div className="space-y-3">
              {quizState.questions[quizState.currentQuestion]?.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.dimension)}
                  className="w-full bg-gray-50 text-gray-800 py-4 px-6 rounded-lg
                           hover:bg-red-50 hover:border-red-300 transition duration-300 ease-in-out
                           text-left text-lg border border-gray-200 relative group"
                >
                  <span className="inline-block w-7 h-7 bg-gray-200 group-hover:bg-red-500 text-center rounded-full mr-3 font-medium text-gray-800 group-hover:text-white transition-colors">
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                  <span className="group-hover:text-red-700 transition-colors">{answer.text}</span>
                </button>
              )) || <p className="text-gray-800">No options available</p>}
            </div>
            
            {/* Story progress indicator */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Episode {quizState.currentQuestion + 1} of {quizState.questions.length}
              </div>
              <div className="h-1 bg-gray-200 flex-grow mx-4 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500" 
                  style={{width: `${((quizState.currentQuestion + 1) / quizState.questions.length) * 100}%`}}
                ></div>
              </div>
              <div className="text-sm text-gray-500">
                {Math.round(((quizState.currentQuestion + 1) / quizState.questions.length) * 100)}%
              </div>
            </div>
          </>
        )}
      </div>
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