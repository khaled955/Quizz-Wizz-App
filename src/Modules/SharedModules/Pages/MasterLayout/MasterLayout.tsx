import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MySidebar from "../../Components/MySidebar/MySidebar";
import { useCallback, useState } from "react";
export default function MasterLayout() {
  const[isCollapsed , setIsCollapsed] = useState(false)
const[showSideBar , setShowSideBar] = useState(false)
const[dark , setDark] = useState<string | null>(()=>{
 return  localStorage.getItem('theme')
})



const handleToggleMode = useCallback(function(){
  const newTheme = localStorage.getItem("theme")==="light"?"dark":"light";
  localStorage.setItem("theme" , newTheme)
setDark(newTheme)

},[])



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


<div className={`min-vh-screen flex p-0 overflow-hidden ${dark}`}>

<div className={`${showSideBar ? "block":"hidden"} sm:block`}>
  <MySidebar darkMood={dark} handleToggleCollapse={handleToggleCollapse} isCollapsed={isCollapsed}/>
</div>

  <div className={`grow dark:bg-gray-800 dark:text-white min-h-screen`}>
    <div className={`mt-20 py-3 w-full px-2 ${marginClass} ${marginClassFromSm}`}>
  <Navbar mode={dark} onToggleMode={handleToggleMode} handleToggleSideBar={handleToggleSideBar} showSideBar={showSideBar}/>
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








