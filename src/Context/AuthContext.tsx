import { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { AuthContextType, LogedInResponseData} from "../Interfaces/Context.interface";

 // eslint-disable-next-line react-refresh/only-export-components
 export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthContextProvider({children}:{children:ReactNode}){
const [logedInData, setLogedInData] = useState<LogedInResponseData | undefined>(() => {
  const cookie = Cookies.get("LOGEDDATA");
  return cookie ? JSON.parse(cookie) : undefined;
});



    return <AuthContext.Provider value={{logedInData,setLogedInData}}>
        {children}
    </AuthContext.Provider>
}

















export { AuthContextProvider }