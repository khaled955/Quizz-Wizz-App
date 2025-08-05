import { ReactNode } from "react"
import useAuth from "../../../../Hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function GuestRoute({children}:{children:ReactNode}) {

 const{logedInData} = useAuth()
 if(!logedInData){
  return children 
}else{

   if(logedInData.profile.role === "Instructor") return <Navigate to="/dashboard"/>
   if(logedInData.profile.role !== "Instructor") return <Navigate to="/learner"/>
   }









};
