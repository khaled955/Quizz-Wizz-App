
export interface LearnerQuizQuestions {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string; // ISO string
  duration: number; // in minutes
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface QuizQuestion {
  _id: string;
  title: string;
  options: QuestionOptions;
}

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
