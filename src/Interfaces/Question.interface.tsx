export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface QuestionListProps {
  _id: string;
  title: string;
  description: string;
  options: QuestionOptions;
  answer: keyof QuestionOptions; // "A" | "B" | "C" | "D"
  status: "active" | "inactive"; 
  instructor: string;
  difficulty: "easy" | "medium" | "hard"; // inferred from value
  points: number;
  type: "FE" | "BE" | "DB" ; // expand as needed
}






export interface CreateAndUpdateQuestionProps {
  title: string;
  description: string;
  options: QuestionOptions;
  answer: keyof QuestionOptions; // "A" | "B" | "C" | "D"
  difficulty: "easy" | "medium" | "hard"; 
  type: "FE" | "BE" | "DB"; 
}






export interface QuestionAddAndUpdateProps{
  title:string | null;
  errorMessage:string| null
  onCreate:(dataInfo:CreateAndUpdateQuestionProps)=>Promise<void>;
  onUpdate:(dataInfo:CreateAndUpdateQuestionProps,groupId:string)=>Promise<void>
  onClose:()=>void;
  currentQuestion:QuestionListProps | null
}





