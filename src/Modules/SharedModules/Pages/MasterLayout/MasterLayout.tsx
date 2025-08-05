import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MySidebar from "../../Components/MySidebar/MySidebar";
import { useCallback, useState } from "react";
export default function MasterLayout() {
  const[isCollapsed , setIsCollapsed] = useState(false)
const[showSideBar , setShowSideBar] = useState(false)








  const handleToggleCollapse = useCallback(function(){
    setIsCollapsed((current)=>!current)
  },[])

  const handleToggleSideBar = useCallback(function(){
    setShowSideBar((current)=>!current)
  },[])


  const marginClass = `
    ${showSideBar && isCollapsed ? 'ml-[80px]' : ''}
    ${showSideBar && !isCollapsed ? 'ml-[250px]' : ''}
    transition-all duration-200
  `;
  const marginClassFromSm = `
    ${!showSideBar && isCollapsed ? 'sm:ml-[80px]' : ''}
    ${!showSideBar && !isCollapsed ? 'sm:ml-[250px]' : ''}
    transition-all duration-200
  `;






  return (
<>


<div className=" min-vh-screen flex p-0 overflow-hidden">

<div className={`${showSideBar ? "block":"hidden"} sm:block`}>
  <MySidebar handleToggleCollapse={handleToggleCollapse} isCollapsed={isCollapsed}/>
</div>

  <div className="grow" >
    <div className={`mt-20 py-3 w-full px-2 ${marginClass} ${marginClassFromSm}`}>
  <Navbar handleToggleSideBar={handleToggleSideBar} showSideBar={showSideBar}/>
<div className="flex overflow-x-hidden overflow-y-auto">
<div className="w-full sm:w-[80%] overflow-y-auto">
      <Outlet></Outlet>

</div>
</div>
    </div>
  </div>




</div>

</>
  )
}








