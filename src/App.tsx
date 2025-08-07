import { Toaster } from "react-hot-toast"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Modules/AuthenticationModules/Components/Login/Login"
import Register from "./Modules/AuthenticationModules/Components/Register/Register"
import ForgetPassword from "./Modules/AuthenticationModules/Components/ForgetPassword/ForgetPassword"
import ResetPassword from "./Modules/AuthenticationModules/Components/ResetPassword/ResetPassword"
import AuthLayout from "./Modules/AuthenticationModules/Pages/AuthLayout/AuthLayout"
import MasterLayout from "./Modules/SharedModules/Pages/MasterLayout/MasterLayout"
import NotFound from "./Modules/SharedModules/Pages/NotFound/NotFound"
import ChangePassword from "./Modules/AuthenticationModules/Components/ChangePassword/ChangePassword"
import { AuthContextProvider } from "./Context/AuthContext"
import GroupList from "./Modules/InstructorModules/Components/Group/GroupList/GroupList"
import StudentList from "./Modules/InstructorModules/Components/Students/StudentList/StudentList"
import QuestionsList from "./Modules/InstructorModules/Components/Questions/QuestionsList/QuestionsList"
import QuizzesList from "./Modules/InstructorModules/Components/Quizzes/QuizzesList/QuizzesList"
import Results from "./Modules/InstructorModules/Components/Results/Results"
import Dashboard from "./Modules/InstructorModules/Components/Dashboard/Dashboard"
import LearnerDashboard from "./Modules/LearnerModules/Components/LearnerDashboard/LearnerDashboard"
import LearnerResults from "./Modules/LearnerModules/Components/LearnerResults/LearnerResults"
import ProtectedRoute from "./Modules/SharedModules/Components/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./Modules/SharedModules/Components/GuestRoute/GuestRoute"
import LearnerQuizz from "./Modules/LearnerModules/Components/LearnerQuizzes/Quizz/LearnerQuizz"
import Certificate from "./Modules/LearnerModules/Components/LearnerQuizzes/Certificate/Certificate"
import StatusIndicator from "./Modules/SharedModules/Components/StatusIndicator/StatusIndicator"
import useOnlineStatus from "./Hooks/useOnlineStatus"

function App() {

const isOnline = useOnlineStatus()
const routes = createBrowserRouter([{path:"/" , element: <GuestRoute><AuthLayout/></GuestRoute> ,children:[
  {index:true , element:<Login/>},
  {path:"login" , element:<Login/>},
  {path:"register" , element:<Register/>},
  {path:"forget-password" , element:<ForgetPassword/>},
  {path:"reset-password" , element:<ResetPassword/>},
  {path:"*" , element:<NotFound/>},
]},

// Instructor pathes
{path:"dashboard" , element: <ProtectedRoute><MasterLayout/></ProtectedRoute> , children:[
 { index:true , element:<Dashboard/>},
 { path:"quizzes" , element:<QuizzesList/>},
 { path:"questions-list" , element:<QuestionsList/>},
 { path:"students", element:<StudentList/>},
 { path:"results" , element:<Results/>},
 { path:"groups-list" , element:<GroupList/>},
 { path:"change-password" , element:<ChangePassword/>},
 { path:"*" , element:<NotFound/>},
]},

// learner pathes

{path:"learner" , element: <ProtectedRoute> <MasterLayout/></ProtectedRoute> , children:[
 { index:true , element:<LearnerDashboard/>},
 { path:"quizzes" , element:<LearnerQuizz/>},
 { path:"certificate/:id" , element:<Certificate/>},
 { path:"results" , element:<LearnerResults/>},
 { path:"change-password" , element:<ChangePassword/>},
 { path:"*" , element:<NotFound/>},
]},



])









  return (
    <>
    <AuthContextProvider>
     <RouterProvider router={routes}></RouterProvider>
</AuthContextProvider>
    <Toaster/>
    {!isOnline &&     <StatusIndicator/>
}
    </>
  )
}

export default App
