"use client"; // Enables client-side rendering for this component
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React


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
  
    if (state.showResults) {
      const topPersonality = Object.keys(state.personalityScores).reduce((a, b) =>
        state.personalityScores[a] > state.personalityScores[b] ? a : b
      );
  
      return (
        <div>
          <h2>Your Personality Type: {topPersonality}</h2>
          <button onClick={resetQuiz}>Try Again</button>
        </div>
      );
    }
  
    const currentQuestion = state.questions[state.currentQuestion];
  
    return (
      <div>
        <h2>
          Question {state.currentQuestion + 1}/{state.questions.length}
        </h2>
        <p>{currentQuestion.question}</p>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer.personalityType)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    );
  }