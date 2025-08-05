
 export const baseURL = "https://upskilling-egypt.com:3005/api";



 export const AUTH = {
   REGISTER: `/auth/register`,
   LOGIN: `/auth/login`,
   CHANGE_PASSWORD: `/auth/change-password`,
   LOGOUT: `auth/logout`,
   FORGOT_PASSWORD: `auth/forgot-password`,
   RESET_PASSWORD: `auth/reset-password`,
 };

 export const GROUP = {
   GET_ALL: `/group`,
   CREATE_GROUP: `/group`,
   GET_BY_ID: (id: string) => `/group/${id}`,
   UPDATE_GROUP: (id: string) => `/group/${id}`,
   DELETE_GROUP: (id: string) => `/group/${id}`,
 };

 export const STUDENT = {
   GET_ALL: `/student`,
   GET_ALL_WITHOUT_GROUP: `/student/without-group`,
   GET_BY_ID: (id: string) => `/student/${id}`,
   GET_TOP_FIVE_STUDENTS: `/student/top-five`,
   UPDATE_MY_ACC: `/student`,
   DELETE_STUDENT: (id: string) => `/student/${id}`,
   DELETE_FROM_GROUP: (id: string, id2: string) => `/student/${id}/${id2}`,
   ADD_TO_GROUP: (id: string, id2: string) => `/student/${id}/${id2}`,
   UPDATE_STUDENT_GROUP: (id: string, id2: string) => `/student/${id}/${id2}`,
 };

 export const QUESTION = {
   GET_ALL: `/question`,
   GET_BY_ID: (id: string) => `/question/${id}`,
   CREATE_QUESTION: `/question`,
   UPDATE_QUESTION: (id: string) => `/question/${id}`,
   DELETE_QUESTION: (id: string) => `/question/${id}`,
   HARD_QUESTIONS :`/question/search?difficulty=hard`,
   MEDIUM_QUESTIONS :`/question/search?difficulty=medium`,
   EASY_QUESTIONS :`/question/search?difficulty=easy`,
   BE_QUESTIONS :`/question/search?type=BE`,
   FE_QUESTIONS :`/question/search?type=FE`,
   DB_QUESTIONS :`/question/search?type=DB`,


SEARCH_QUESTION: (difficulty: string, type: string) => {
  const queryParams: string[] = [];

  if (difficulty) queryParams.push(`difficulty=${difficulty}`);
  if (type) queryParams.push(`type=${type}`);

  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  return `${baseURL}/question/search${queryString}`;
}



 };

 export const QUIZ = {
   GET_ALL: `/quiz`,
   GET_BY_ID: (id: string) => `/quiz/${id}`,
   CREATE_QUIZ: `/quiz`,
   UPDATE_QUIZ: (id: string) => `/quiz/${id}`,
   DELETE_QUIZ: (id: string) => `/quiz/${id}`,
   JOIN_QUIZ: `/quiz/join`,
   SUBMIT: (id: string) => `/quiz/submit/${id}`,
   QUESTIONS_WITHOUT_ANSWERS: (id: string) => `quiz/without-answers/${id}`,
   ALL_RESULTS: `quiz/result`,
   FIRST_FIVE_INCOMMING: `quiz/incomming`,
   LAST_FIVE_COMPLETED: `quiz/completed`,
   REASSIGN: (id: string) => `quiz/reassign/${id}`,
 };




export const LEARNER = {
  GET_FIRST_FIVE_INCOMMING :`/quiz/incomming`,
  LAST_FIVE_COMPLETED:`/quiz/completed`,
  GET_ALL_RESULTS:`/quiz/result`,
  JOIN_QUIZ:`/quiz/join`,
  SUBMIT_QUIZZ:(quizzId:string)=>`/quiz/submit/${quizzId}`,
  GET_QUESTIONS_WITHOUT_ANSWERS:(quizzId:string)=>`/quiz/without-answers/${quizzId}`,
  
}




