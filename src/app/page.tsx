"use client";

import { useState } from "react";
import PersonalityQuizApp from "@/pages/QuizApp";
import LandingPage from "@/pages/LandingPage";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div>
      {showQuiz ? (
        <PersonalityQuizApp />
      ) : (
        <LandingPage onContinue={() => setShowQuiz(true)} />
      )}
    </div>
  );
}