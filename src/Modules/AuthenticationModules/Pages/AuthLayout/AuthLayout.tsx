import { Outlet } from "react-router-dom"
import authLogo from "../../../../assets/images/App-logo.png"
import authImg from "../../../../assets/images/AuthImge.png"
export default function AuthLayout() {
  return (
   <>
   <div className="auth-container min-h-screen max-w-screen p-7 bg-black overflow-x-hidden">

{/* header */}
<div className="auth-header mb-3">
  <div className="logo">
 <img className="w-[50]" src={authLogo} alt="auth-logo" />
  </div>
</div>
<div className="auth-body flex gap-4 flex-wrap justify-center md:justify-start items-center">
<div className="form-box flex-1">
  <Outlet></Outlet>
</div>
<div className="auth-img">
  <img className="w-100 rounded-xs" src={authImg} alt="auth-img" />
</div>
</div>
   </div>
   </>
  )
}
