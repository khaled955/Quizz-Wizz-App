import { useEffect, useRef, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaChevronCircleDown, FaSun } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';



export default function Navbar({ handleToggleSideBar, showSideBar, onToggleMode, mode }: { showSideBar: boolean, handleToggleSideBar: () => void, onToggleMode: () => void, mode: string| null }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logOut, logedInData } = useAuth();

  const changePasswordPath = logedInData?.profile.role === "Instructor" ? "/dashboard/change-password" : "/learner/change-password";

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
    <header className="fixed left-0 right-0 top-0 z-10 w-full bg-white dark:bg-gray-900 shadow" role="banner">
      <nav className="mx-auto flex items-center justify-between px-4 py-3" aria-label="Primary Navigation">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle sidebar"
            onClick={handleToggleSideBar}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800 sm:hidden"
          >
            {showSideBar ? <AiOutlineClose className="h-6 w-6" aria-hidden="true" /> : <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />}
          </button>

<div className="mr-2 flex items-center gap-1 text-gray-700 dark:text-white">
<span><AiOutlineCloseCircle className="text-sm sm:text-2xl"/></span>
<span><FaRegCheckCircle className="text-sm sm:text-2xl"/></span>
<span className="text-sm sm:text-2xl">|Quiz Wizz</span>
</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMode}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="focus:outline-none"
          >
            {mode === "dark" ? <MdDarkMode className="text-white text-2xl cursor-pointer" aria-hidden="true" /> : <FaSun className="text-gray-800 text-2xl dark:text-yellow-300 cursor-pointer" aria-hidden="true" />}
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              aria-controls="user-menu"
            >
              <div className="flex flex-col items-start text-left">
                <span className="capitalize text-gray-700 dark:text-gray-200">{logedInData?.profile?.first_name} {logedInData?.profile?.last_name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{logedInData?.profile?.role}</span>
              </div>
              <FaChevronCircleDown className="w-4 text-gray-700 dark:text-gray-300" aria-hidden="true" />
            </button>

            {isDropdownOpen && (
              <div id="user-menu" className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50" role="menu">
                <button
                  onClick={() => navigate(changePasswordPath)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center text-gray-700 dark:text-gray-200"
                  role="menuitem"
                >
                  <TbLockPassword className="me-2" aria-hidden="true" />
                  Change Password
                </button>
                <button
                  onClick={logOut}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-600 flex items-center dark:text-red-400"
                  role="menuitem"
                >
                  <LuLogOut className="me-2" aria-hidden="true" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}


