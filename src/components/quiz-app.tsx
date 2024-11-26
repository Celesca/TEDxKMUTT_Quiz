"use client"; // Enables client-side rendering for this component
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { personalityQuestions } from "@/content/en_questions";
import Image from "next/image";
import BackgroundImage from "@/assets/wave-line-1.webp";
import Logo from "./logo";
import LanguagePicker from "./LanguagePicker";

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

  // Fetch questions
  useEffect(() => {
    const loadQuestions = async () => {
      const questions = personalityQuestions;
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
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
    <div>
        <LanguagePicker />
        <main className="relative min-h-screen overflow-hidden flex flex-col items-center pt-8 space-y-2">
        <Logo />
        <Image
            src={BackgroundImage}
            alt="Background Decoration"
            className="absolute bottom-40 md:bottom-0 md:w-full -z-30 
                                left-1/2 md:left-0 -translate-x-1/2 max-w-screen-2xl md:max-w-full 
                                md:translate-x-0"
            priority
        />
        <div className="fixed bottom-0 right-0 translate-x-1/3 translate-y-1/3 -z-20 bg-primary-500 blur-[120px] w-[32rem] h-[32rem] opacity-30 rounded-full"></div>
        <div className="fixed top-0 left-0 -translate-x-1/3 -translate-y-1/2 -z-20 bg-primary-500 blur-[120px] w-[32rem] h-[32rem] opacity-30 rounded-full"></div>

        {/* Quiz content */}

        {state.currentQuestion === state.questions.length ? (
            // Results section
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Your Personality Type:{" "}
                <span className="text-red-600">{topPersonality}</span>
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
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl">
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
        </main>
    </div>
  );
}
