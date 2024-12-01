export type Points = {
  thinker: number;
  socializer: number;
  adventurer: number;
  leader: number;
};

export type Answer = {
  text: string;
  points: Partial<Points>;
};

export type Question = {
  question: string;
  answers: Answer[];
};

export type QuizState = {
  currentQuestion: number;
  personalityScores: Points;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
};