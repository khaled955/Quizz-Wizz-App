import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";






export default function MySidebar({ isCollapsed, handleToggleCollapse, darkMood }: { isCollapsed: boolean, handleToggleCollapse: () => void, darkMood: string | null }) {
  const { logedInData } = useAuth()
  const { pathname } = useLocation()

  return (
    <aside
      className={`transition-all duration-500 top-0 ${isCollapsed ? 'w-[80px]' : 'w-[250px]'} min-h-screen`}
      style={{ position: "fixed", left: 0, bottom: 0 }}
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <Sidebar collapsed={isCollapsed} className="absolute top-0 bottom-0 min-h-screen side-bar-box">
        <Menu
          className="min-h-screen pt-24 dark:bg-gray-900 dark:text-white"
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: `${darkMood === "dark" ? "rgb(251 191 36)" : ""}`,
              },
              borderTop: '1px solid rgba(0,0,0,0.1)',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            },
          }}
        >
          <MenuItem
            onClick={handleToggleCollapse}
            aria-label="Toggle sidebar collapse"
          >


            


             {isCollapsed && <IoIosArrowDroprightCircle className={`text-3xl ml-2 transition-all duration-300 ${darkMood === "dark" ? "text-blue-400" : ""}`}/>}
             {!isCollapsed && <IoIosArrowDropleftCircle className={`text-3xl ml-2 transition-all duration-300 ${darkMood === "dark" ? "text-blue-400" : ""}`}/>}


          </MenuItem>

          {logedInData?.profile.role === "Instructor" && <>
            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<RxDashboard className='text-2xl'/>}
              component={<Link to="/dashboard" />}
              aria-label="Instructor Dashboard"
            > Dashboard</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/questions-list" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard/questions-list" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<FaRegQuestionCircle className='text-2xl'/>}
              component={<Link to="/dashboard/questions-list" />}
              aria-label="Questions"
            > Questions</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/students" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard/students" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<PiStudent className='text-2xl'/>}
              component={<Link to="/dashboard/students" />}
              aria-label="Students"
            > Students</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/results" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard/results" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<MdOutlineFreeCancellation className='text-2xl'/>}
              component={<Link to="/dashboard/results" />}
              aria-label="Results"
            > Results</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/groups-list" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard/groups-list" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<MdGroups className='text-2xl'/>}
              component={<Link to="/dashboard/groups-list" />}
              aria-label="Groups"
            > Groups</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/dashboard/quizzes" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/dashboard/quizzes" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<MdOutlineQuiz className='text-2xl'/>}
              component={<Link to="/dashboard/quizzes" />}
              aria-label="Quizzes"
            > Quizzes</MenuItem>
          </>}

          {logedInData?.profile.role === "Student" && <>
            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/learner" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/learner" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<RxDashboard className='text-2xl'/>}
              component={<Link to="/learner" />}
              aria-label="Learner Dashboard"
            > Dashboard</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/learner/quizzes" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/learner/quizzes" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<MdOutlineQuiz className='text-2xl'/>}
              component={<Link to="/learner/quizzes" />}
              aria-label="Learner Quizzes"
            > Quizzes</MenuItem>

            <MenuItem
              className={`border-t-[1px] border-b-[1px] ${pathname === "/learner/results" && darkMood === "dark" ? "active-side-dark" : ""} ${pathname === "/learner/results" && darkMood !== "dark" ? "active-side-light" : ""}`}
              icon={<MdOutlineFreeCancellation className='text-2xl'/>}
              component={<Link to="/learner/results" />}
              aria-label="Learner Results"
            > Results</MenuItem>
          </>}
        </Menu>
      </Sidebar>
    </aside>
  );
}





