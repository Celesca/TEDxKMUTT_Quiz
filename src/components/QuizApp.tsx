"use client";
import { useState, useEffect } from "react";
import { personalityQuestions } from "@/content/en_questions";
import Background from "./Background";

const INITIAL_POINTS = 10; // Base points for each personality type

type Points = {
  thinker: number;
  socializer: number;
  adventurer: number;
  leader: number;
};

type Answer = {
  text: string;
  points: Partial<Points>;
};

type Question = {
  question: string;
  answers: Answer[];
};

type QuizState = {
  currentQuestion: number;
  personalityScores: Points;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
};

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

  const handleAnswerClick = (points: Partial<Points>): void => {
    setQuizState((prev) => ({
      ...prev,
      personalityScores: {
        ...prev.personalityScores,
        ...Object.entries(points).reduce(
          (scores, [type, value]) => ({
            ...scores,
            [type as keyof Points]: prev.personalityScores[type as keyof Points] + value,
          }),
          {} as Points
        ),
      },
      currentQuestion: prev.currentQuestion + 1,
      showResults: prev.currentQuestion + 1 >= prev.questions.length,
    }));
  };

  const resetQuiz = (): void => {
    setQuizState({
      ...INITIAL_QUIZ_STATE,
      questions: quizState.questions,
      isLoading: false,
    });
  };

  if (quizState.isLoading) {
    return (
      <Background>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
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
          <div className="space-y-2 mb-6">
            {Object.entries(quizState.personalityScores).map(([type, score]) => (
              <div key={type} className="flex justify-between">
                <span className="capitalize">{type}:</span>
                <span>{score} points</span>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-4">
            Your Dominant Type: <span className="capitalize text-red-500">{winningType}</span>
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
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          Question {quizState.currentQuestion + 1}/{quizState.questions.length}
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          {quizState.questions[quizState.currentQuestion].question}
        </p>
        <div className="space-y-3">
          {quizState.questions[quizState.currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.points)}
              className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg
                        hover:bg-red-600 transition duration-300 ease-in-out
                        text-left text-lg"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </Background>
  );
}