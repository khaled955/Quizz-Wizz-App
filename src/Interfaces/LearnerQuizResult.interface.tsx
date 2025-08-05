export interface LearnerQuizResult {
  _id: string;
  quiz: string;
  participant: string;
  score: number;
  started_at: string; // ISO timestamp
  finished_at: string; // ISO timestamp
  questions: QuizResultQuestion[];
}

export interface QuizResultQuestion {
  _id: string;
  title: string;
  options: QuestionOptions;
  answer: keyof QuestionOptions; // "A" | "B" | "C" | "D"
}

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
