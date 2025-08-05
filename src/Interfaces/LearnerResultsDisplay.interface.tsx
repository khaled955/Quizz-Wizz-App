export interface QuizResultData {
  quiz: QuizDetails;
  result: ResultDetails;
}

export interface QuizDetails {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string; // ISO string date
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
}

export interface ResultDetails {
  _id: string;
  quiz: {
    _id: string;
    title: string;
  };
  participant: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  score: number;
  started_at: string;
}