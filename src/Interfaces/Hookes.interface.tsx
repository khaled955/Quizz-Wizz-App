export interface DecodedToken {
  _id: string;
  role: string;
  verified: boolean;
  iat: number;
  exp: number;
}



export interface DecodedDataInfo {
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
}




export interface UserProfile {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  group: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    max_students: number;
    students: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}



export interface DecodedTokenProp {
  email:string;
role:string;
}


