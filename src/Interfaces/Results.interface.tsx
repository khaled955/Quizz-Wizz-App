/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResultsProps {
  quiz: {
    _id: string;
    code: string;
    title: string;
    description: string;
    status: "open" | "closed" | string;
    instructor: string;
    group: string;
    questions_number: number;
    schadule: string; // ISO date string
    duration: number;
    score_per_question: number;
    type: string; // e.g., "FE", "BE"
    difficulty: "easy" | "medium" | "hard";
    updatedAt: string;
    createdAt: string;
    closed_at: string;
    __v: number;
  };
  participants: any[]; // Replace `any` with a proper type if participant structure is known
}