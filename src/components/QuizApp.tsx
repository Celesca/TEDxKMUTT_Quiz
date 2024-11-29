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

export default function PersonalityQuizApp() {
  const [state, setState] = useState<QuizState>({
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
  });

  useEffect(() => {
    const loadQuestions = async () => {
      setState((prevState) => ({
        ...prevState,
        questions: personalityQuestions,
        isLoading: false,
      }));
    };
    loadQuestions();
  }, []);

  const handleAnswerClick = (points: Partial<Points>): void => {
    setState((prevState) => ({
      ...prevState,
      personalityScores: {
        ...prevState.personalityScores,
        ...Object.entries(points).reduce(
          (scores, [type, value]) => ({
            ...scores,
            [type as keyof Points]: prevState.personalityScores[type as keyof Points] + value,
          }),
          {} as Points
        ),
      },
      currentQuestion: prevState.currentQuestion + 1,
      showResults: prevState.currentQuestion + 1 >= prevState.questions.length,
    }));
  };

  const resetQuiz = (): void => {
    setState({
      currentQuestion: 0,
      personalityScores: {
        thinker: INITIAL_POINTS,
        socializer: INITIAL_POINTS,
        adventurer: INITIAL_POINTS,
        leader: INITIAL_POINTS,
      },
      showResults: false,
      questions: state.questions,
      isLoading: false,
    });
  };

  if (state.isLoading) {
    return (
      <Background>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </Background>
    );
  }

  if (state.showResults) {
    const winningType = Object.entries(state.personalityScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return (
      <Background>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Your Results</h2>
          <div className="space-y-2 mb-6">
            {Object.entries(state.personalityScores).map(([type, score]) => (
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
          Question {state.currentQuestion + 1}/{state.questions.length}
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          {state.questions[state.currentQuestion].question}
        </p>
        <div className="space-y-3">
          {state.questions[state.currentQuestion].answers.map((answer, index) => (
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