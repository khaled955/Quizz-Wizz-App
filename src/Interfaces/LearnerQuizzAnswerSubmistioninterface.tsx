export interface QuizAnswerSubmission {
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  question: string; // question _id
  answer: "A" | "B" | "C" | "D";
}