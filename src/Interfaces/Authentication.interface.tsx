export interface RegisterFormDataProps {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
}



export interface LoginFormDataProps {
  email: string;
  password: string;
}

export interface ForgetPasswordProps{
  email: string;
}



export interface ResetPasswordProps {
    "otp":string;
    "email":string;
    "password":string;
}



export interface ChangePasswordProps {
    "password":string,
    "password_new":string;
}


