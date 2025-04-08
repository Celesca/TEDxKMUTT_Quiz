// MBTI Dimensions
export type MBTIDimension = 
  "E" | "I" | // Extrovert vs Introvert 
  "S" | "N" | // Sensing vs Intuition
  "T" | "F" | // Thinking vs Feeling
  "J" | "P";  // Judging vs Perceiving

// Points object to track dimensions
export type Points = {
  E: number; // Extrovert
  I: number; // Introvert
  S: number; // Sensing
  N: number; // Intuition
  T: number; // Thinking
  F: number; // Feeling
  J: number; // Judging
  P: number; // Perceiving
};

// Adding structure for story-based questions
export type Answer = {
  text: string;
  dimension: MBTIDimension; // Which dimension this answer corresponds to
};

export type Question = {
  title: string;      // Story title like "เสียงของการเริ่มต้น"
  question: string;   // The narrative text of the question
  dimension: "EI" | "SN" | "TF" | "JP"; // Which dimension this question measures
  answers: Answer[];  // The 4 possible answers
};

export type QuizState = {
  currentQuestion: number;
  mbtiScores: Points;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
  mbtiType: string; // To store the final MBTI type (e.g., "INFJ")
};