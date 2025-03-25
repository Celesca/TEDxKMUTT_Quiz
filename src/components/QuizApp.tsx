"use client";
import { useState, useEffect } from "react";
import { personalityQuestions } from "@/content/en_questions";
import Background from "./Background";
import { QuizState, Points } from "@/types/QuizType";

const INITIAL_POINTS = 0;
const INITIAL_QUIZ_STATE: QuizState = {
  currentQuestion: 0,
  personalityScores: {
    thinker: INITIAL_POINTS,
    socializer: INITIAL_POINTS,
    adventurer: INITIAL_POINTS,
    leader: INITIAL_POINTS,
  },
  showResults: false,
  questions: [],
  isLoading: true,
};

export default function PersonalityQuizApp() {
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const [userName, setUserName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Add this function to submit results to Google Form
  const submitToGoogleForm = async (winningType: string) => {
    setIsSubmitting(true);
    
    // Replace these with your actual Google Form field IDs
    // You can find these by inspecting the form HTML
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdEuU3ug9Tf9OWpM1heoV8rDq06y_q_rRRZM6Jx58XrKRNU6Q/formResponse';
    const formData = new FormData();
    
    // Map your form fields to entry.XXXXXXX IDs from your Google Form
    formData.append('entry.1125391159', userName); // Name field
    formData.append('entry.1183018060', new Date().toISOString()); // Timestamp
    // formData.append('entry.345678901', quizState.personalityScores.thinker.toString());
    // formData.append('entry.456789012', quizState.personalityScores.socializer.toString());
    // formData.append('entry.567890123', quizState.personalityScores.adventurer.toString());
    // formData.append('entry.678901234', quizState.personalityScores.leader.toString());
    formData.append('entry.2109044670', winningType);
    
    try {
      // Using no-cors mode since Google Forms doesn't support CORS
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

  const calculateUpdatedScores = (
    currentScores: Points,
    newPoints: Partial<Points>
  ): Points => {
    return Object.entries(newPoints).reduce(
      (scores, [type, value]) => ({
        ...scores,
        [type as keyof Points]: currentScores[type as keyof Points] + (value ?? 0),
      }),
      { ...currentScores }
    );
  };

  const isQuizComplete = (currentQuestion: number, totalQuestions: number): boolean => {
    return currentQuestion + 1 >= totalQuestions;
  };

  

  const handleAnswerClick = (points: Partial<Points>): void => {
    setQuizState((prev) => {
      const nextQuestion = prev.currentQuestion + 1;
      const updatedScores = calculateUpdatedScores(prev.personalityScores, points);

      return {
        ...prev,
        personalityScores: updatedScores,
        currentQuestion: nextQuestion,
        showResults: isQuizComplete(prev.currentQuestion, prev.questions.length)
      };
    });
  };

  const resetQuiz = (): void => {
    setQuizState({
      ...INITIAL_QUIZ_STATE,
      questions: quizState.questions,
      isLoading: false,
    });
  };

  if (quizState.showResults) {
    const winningType = Object.entries(quizState.personalityScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return (
      <Background>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Your Results</h2>
          <h3 className="text-xl font-bold capitalize text-red-500 mb-4">
            {winningType}
          </h3>
          
          {!submitSuccess ? (
            <div className="mb-6">
              <label className="block text-white mb-2">Your Name:</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                placeholder="Enter your name"
              />
              
              <button
                onClick={() => submitToGoogleForm(winningType)}
                disabled={isSubmitting || !userName.trim()}
                className={`w-full ${
                  isSubmitting || !userName.trim() ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
                } text-white py-3 px-6 rounded-lg transition duration-300 mb-4`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Results'}
              </button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-800/50 rounded-lg">
              <p className="text-white">Thank you for submitting your results!</p>
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

  if (quizState.showResults) {
    const winningType = Object.entries(quizState.personalityScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return (
      <Background>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Your Results</h2>
          <h3 className="text-xl font-bold capitalize text-red-500 mb-4">
            {winningType}
          </h3>
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
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl">
        {quizState.isLoading ? (
          <div className="text-white text-center">
            <p>Loading questions...</p>
          </div>
        ) : quizState.questions.length === 0 ? (
          <div className="text-white text-center">
            <p>No questions available.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Question {quizState.currentQuestion + 1}/{quizState.questions.length}
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              {quizState.questions[quizState.currentQuestion]?.question || "Question not available"}
            </p>
            <div className="space-y-3">
              {quizState.questions[quizState.currentQuestion]?.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.points)}
                  className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg
                            hover:bg-red-600 transition duration-300 ease-in-out
                            text-left text-lg"
                >
                  {answer.text}
                </button>
              )) || <p className="text-white">No answers available</p>}
            </div>
          </>
        )}
      </div>
    </Background>
  );
}