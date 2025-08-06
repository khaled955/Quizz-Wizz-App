import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
export default function MySidebar({isCollapsed,handleToggleCollapse,darkMood}:{isCollapsed:boolean,handleToggleCollapse:()=>void,darkMood:string | null}) {
  const{logedInData}= useAuth()

const {pathname} = useLocation()

console.log(pathname)






  return (
    <div  className={`transition-all duration-500 top-0 ${isCollapsed ? 'w-[80px]' : 'w-[250px]'} min-h-screen`}
  style={{
    position: "fixed",
    left: 0,
    bottom: 0,
  }}>
      <Sidebar collapsed={isCollapsed} className=' absolute top-0 bottom-0 min-h-screen side-bar-box'>
  <Menu
  
  className='min-h-screen pt-24 dark:bg-gray-900 dark:text-white'
      menuItemStyles={{
    button: {
      '&:hover': {
        backgroundColor:`${darkMood === "dark" ?"rgb(251 191 36)":""}`
      },
      borderTop: '1px solid rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
    },


    
  }}




  >
    <MenuItem  onClick={handleToggleCollapse} >
  <i className={`fa-solid text-3xl ml-2 fa-circle-chevron-${isCollapsed ? 'left' : 'right'} transition-all duration-300 ${darkMood === "dark"?"text-blue-400":""}`}></i>
</MenuItem>


{logedInData?.profile.role === "Instructor" && <>

  <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-grip text-2xl"></i>} component={<Link to="/dashboard" />}> Dashboard</MenuItem>
    <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/questions-list" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard/questions-list" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-circle-question text-2xl"></i>} component={<Link to="/dashboard/questions-list" />}> Questions</MenuItem>
    <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/students" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard/students" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-users text-2xl"></i>} component={<Link to="/dashboard/students" />}> Students</MenuItem>
    <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/results" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard/results" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-square-poll-vertical text-2xl"></i>} component={<Link to="/dashboard/results" />}> Results</MenuItem>
    <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/groups-list" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard/groups-list" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-layer-group text-2xl"></i>} component={<Link to="/dashboard/groups-list" />}> Groups</MenuItem>
    <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/quizzes" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/dashboard/quizzes" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-clipboard-question text-2xl"></i>} component={<Link to="/dashboard/quizzes" />}> Quizzes</MenuItem>

</>}

{logedInData?.profile.role === "Student" && <>

  <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/learner" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/learner" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-grip text-2xl"></i>} component={<Link to="/learner" />}> Dashboard</MenuItem>
  <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/learner/quizzes" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/learner/quizzes" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-clipboard-question text-2xl"></i>} component={<Link to="/learner/quizzes" />}> Quizzes</MenuItem>
  <MenuItem className={`border-t-[1px] border-b-[1px] ${pathname === "/learner/results" && darkMood === "dark" ? "active-side-dark":""} ${pathname === "/learner/results" && darkMood !== "dark" ? "active-side-light":""}`} icon={<i className="fa-solid fa-square-poll-vertical text-2xl"></i>} component={<Link to="/learner/results" />}> Results</MenuItem>



</>}


  </Menu>
</Sidebar>
    </div>
  )
}
















