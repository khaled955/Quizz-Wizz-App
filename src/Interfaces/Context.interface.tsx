import { UserProfile } from "./Hookes.interface";

 export interface AuthContextType {
 
  logedInData:LogedInResponseData | undefined;
  setLogedInData:(logedInData:LogedInResponseData | undefined)=>void;
}


export interface LogedInResponseData {
  accessToken: string;
  profile: UserProfile;
}
