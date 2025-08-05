import { ReactNode } from "react"
import useAuth from "../../../../Hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}:{children:ReactNode}) {
 const{logedInData} = useAuth()
 if(logedInData){
  return children 
}else{
 return <Navigate to="/login"/>
   }



}
