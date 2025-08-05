/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormWatch } from "react-hook-form";


/*********************** fIRST Name *******************************************************/ 
export const FIRST_NAME_VALIDATION = {required:"First Name Is Required",pattern:{
                        value:/^[A-Za-z][A-Za-z0-9]{2,7}$/ ,
                        message:"Must Start with letter and not less than 3 and not increase 8 And Must Have Number"
                      }}



/*********************** last Name *******************************************************/ 


 export const LAST_NAME_VALIDATION = {required:"Last Name Is Required"} 




 /*********************** Email *******************************************************/ 

 
 export const EMAIL_VALIDATION = {required:"Email is Required",pattern:{
                        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:"Invalid Email"

                      }}





 /*********************** Role *******************************************************/ 

 export const ROLE_VALIDATION = {required:"Role Is Required"} 
 
 


 /*********************** Password *******************************************************/ 

 export const PASSWORD_VALIDATION = {required:"Password Is Required",pattern:{
                        value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                        message:"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"


                      }}



 /*********************** New Password *******************************************************/ 

export const NEW_PASSWORD_VALIDATION = (watch: UseFormWatch<any>) => ({
  required: "Password is required",
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message:
      "Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character",
  },
  validate: (value: string) =>
    value !== watch("password") || "New password must be different",
});






 /*********************** OTP *******************************************************/ 

export const OTP_VALIDATION = {required:"Otp Is Required",pattern:{value:/[a-zA-Z0-9]{6}/,message:"Otp Is 6 Characters"}}                


 /*********************** Group Module *******************************************************/ 

export const GROUP_MODULE = {
  NAME:{required:"Group Name Is Required",pattern:{
              value:/^[A-Za-z].*/,
              message:"Group Name Must Start With Letter"
            }},
  STUDENTS:{required:"Must Select At Least One Student"},
}





export const QUIZZ_MODULE={
  QUIZZ_DURATION:{required:"Duration Is Required",min:{value:1,message:"Duration Must Be More than 1 Minute"},max:{value:120,message:"Maximum Time Is 120 Minute"}},
  QUIZZ_QUESTION_NUMBER:{required:"Question Number Is Required",min:{value:1,message:"At least One Question"}},
  QUIZZ_SCHEDULE:{
    required: "Schedule is required",
    // toDo
    // validate: (value:string) => {
    //   const selectedDate = new Date(value);
    //   const nowPlus1Hour = new Date();
    //   nowPlus1Hour.setHours(nowPlus1Hour.getHours() + 1);
    //   return selectedDate >= nowPlus1Hour || "Schedule must be at least 1 hour from now";
    // },
  },
  QUIZZ_SCORE_PER_QUESTION:{required:"Score Is Required" ,min:{value:1,message:"At Least 1 Per Question"},max:{value:10,message:"Max Score 10 Per Question"}},
  QUIZZ_TITLE:{required:"Title Is Required",pattern:{value:/^[a-zA-Z][a-zA-Z0-9]/,message:"Title Must Start With Letter"}},
}






