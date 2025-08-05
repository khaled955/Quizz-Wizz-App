import { useEffect, useRef, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronCircleDown } from 'react-icons/fa';
export default function Navbar({handleToggleSideBar,showSideBar}:{showSideBar:boolean,handleToggleSideBar:()=>void}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
 const navigate = useNavigate()
const{ logOut ,logedInData}= useAuth()

const changePaasswordPath = logedInData?.profile.role === "Instructor"?"/dashboard/change-password":"/learner/change-password"


useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);







  return (
    <header className="fixed left-0 right-0 z-10 top-0  w-full bg-white dark:bg-gray-900 shadow">
      <nav className="mx-auto flex items-center justify-between px-4 py-3">
        {/* ───────────────────────── Left: Burger toggle ─────────────────────── */}
       <div>
         <button
          aria-label="Toggle sidebar"
          onClick={handleToggleSideBar}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800 sm:hidden"
        >
          {showSideBar ? <AiOutlineClose className="h-6 w-6" /> : <AiOutlineMenu className="h-6 w-6" />}
        </button>
       </div>

        {/* ───────────────────────── Center: Brand ───────────────────────────── */}
       
        

        {/* ───────────────────────── Right: User dropdown ────────────────────── */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
           
              
           
            <div className="sm:flex flex-col items-start">
              <span className="capitalize">{logedInData?.profile?.first_name} {logedInData?.profile?.last_name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{logedInData?.profile?.role}</span>
            </div>
            <FaChevronCircleDown className=" w-4" />
          </button>

          {/* Dropdown panel */}
            {isDropdownOpen && (
        

 <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                  onClick={() => navigate(changePaasswordPath)}
                >
                  <TbLockPassword className="me-2"/>
                  Change Password
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 flex items-center"
                  onClick={logOut}
                >
                  <LuLogOut className="me-2"/>
                  Logout
                </button>
              </div>


            )}
        </div>
      </nav>

     
    </header>
  );
}
