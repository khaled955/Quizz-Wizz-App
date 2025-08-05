import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
export default function MySidebar({isCollapsed,handleToggleCollapse}:{isCollapsed:boolean,handleToggleCollapse:()=>void}) {
  const{logedInData}= useAuth()
  return (
    <div  className={`transition-all duration-500 top-0 ${isCollapsed ? 'w-[80px]' : 'w-[250px]'} min-h-screen`}
  style={{
    position: "fixed",
    left: 0,
    bottom: 0,
  }}>
      <Sidebar collapsed={isCollapsed} className=' absolute top-0 bottom-0 min-h-screen side-bar-box'>
  <Menu
  
  className='min-h-screen pt-24'
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem  onClick={handleToggleCollapse}>
  <i className={`fa-solid text-3xl ml-2 fa-circle-chevron-${isCollapsed ? 'left' : 'right'} transition-all duration-300`}></i>
</MenuItem>


{logedInData?.profile.role === "Instructor" && <>

  <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-grip text-2xl"></i>} component={<Link to="/dashboard" />}> Dashboard</MenuItem>
    <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-circle-question text-2xl"></i>} component={<Link to="/dashboard/questions-list" />}> Questions</MenuItem>
    <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-users text-2xl"></i>} component={<Link to="/dashboard/students" />}> Students</MenuItem>
    <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-square-poll-vertical text-2xl"></i>} component={<Link to="/dashboard/results" />}> Results</MenuItem>
    <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-layer-group text-2xl"></i>} component={<Link to="/dashboard/groups-list" />}> Groups</MenuItem>
    <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-clipboard-question text-2xl"></i>} component={<Link to="/dashboard/quizzes" />}> Quizzes</MenuItem>

</>}
  

{logedInData?.profile.role === "Student" && <>

  <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-grip text-2xl"></i>} component={<Link to="/learner" />}> Dashboard</MenuItem>
  <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-clipboard-question text-2xl"></i>} component={<Link to="/learner/quizzes" />}> Quizzes</MenuItem>
  <MenuItem className='border-t-[1px] border-b-[1px]' icon={<i className="fa-solid fa-square-poll-vertical text-2xl"></i>} component={<Link to="/learner/results" />}> Results</MenuItem>



</>}


  </Menu>
</Sidebar>
    </div>
  )
}
















