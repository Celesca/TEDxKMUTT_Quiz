"use client"; // Enables client-side rendering for this component
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { personalityQuestions } from "@/content/en_questions";


type Answer = {
    text: string;
    personalityType: string; // Associates answer with a personality type
  };
  
  type Question = {
    question: string;
    answers: Answer[];
  };
  
  type QuizState = {
    currentQuestion: number;
    personalityScores: Record<string, number>; // Tracks scores for each personality type
    showResults: boolean;
    questions: Question[];
    isLoading: boolean;
  };
  
  export default function PersonalityQuizApp() {
    const [state, setState] = useState<QuizState>({
      currentQuestion: 0,
      personalityScores: {
        Thinker: 0,
        Socializer: 0,
        Adventurer: 0,
        Leader: 0,
      },
      showResults: false,
      questions: [],
      isLoading: true,
    });
  
    // Fetch questions or import them locally
    useEffect(() => {
      const loadQuestions = async () => {
        const questions = personalityQuestions; // Import locally stored questions
        setState((prevState) => ({
          ...prevState,
          questions,
          isLoading: false,
        }));
      };
      loadQuestions();
    }, []);
  
    const handleAnswerClick = (personalityType: string): void => {
      setState((prevState) => ({
        ...prevState,
        personalityScores: {
          ...prevState.personalityScores,
          [personalityType]: prevState.personalityScores[personalityType] + 1,
        },
      }));
  
      const nextQuestion = state.currentQuestion + 1;
      if (nextQuestion < state.questions.length) {
        setState((prevState) => ({
          ...prevState,
          currentQuestion: nextQuestion,
        }));
      } else {
        setState((prevState) => ({ ...prevState, showResults: true }));
      }
    };
  
    const resetQuiz = (): void => {
      setState({
        currentQuestion: 0,
        personalityScores: {
          Thinker: 0,
          Socializer: 0,
          Adventurer: 0,
          Leader: 0,
        },
        showResults: false,
        questions: state.questions,
        isLoading: false,
      });
    };
  
    if (state.isLoading) {
      return <div>Loading...</div>;
    }
  
    const currentQuestion = state.questions[state.currentQuestion];
    const topPersonality = Object.keys(state.personalityScores).reduce((a, b) =>
      state.personalityScores[a] > state.personalityScores[b] ? a : b
    );

    if (state.showResults) {
      return (
        <div>
          <h2>Your Personality Type: {topPersonality}</h2>
          <button onClick={resetQuiz}>Try Again</button>
        </div>
      );
    }
  
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          {state.currentQuestion === state.questions.length ? (
            // Results section
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Your Personality Type: <span className="text-red-600">{topPersonality}</span>
              </h2>
              <button 
                onClick={resetQuiz}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg
                         hover:bg-red-700 transition duration-300 ease-in-out
                         text-lg font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : (
            // Questions section
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Question {state.currentQuestion + 1}/{state.questions.length}
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                {currentQuestion.question}
              </p>
              <div className="space-y-3">
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer.personalityType)}
                    className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg
                             hover:bg-red-600 transition duration-300 ease-in-out
                             text-left text-lg"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
  }