import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { GroupCardProps } from "../../../../../Interfaces/Groups.interface";

export default function GroupListCard({groupInfo,onDelete,onUpdate}:GroupCardProps) {
  return (
    <div className="group-card-container border-[1px] rounded-lg border-main-border-color p-3">
      <div className="group-card-box flex justify-between items-center flex-wrap">

           {/* header text */}
          <div className="text-body">
            <h2 className="text-lg font-medium">Group: <span className="text-sm text-gray-600 dark:text-amber-400 font-bold">{groupInfo.name}</span></h2>
            <p className="">No Of Students: <span className="text-sm text-gray-600">{groupInfo.students.length}</span></p>
        </div>
     
         {/*  status */}
        <div>
         <span className="status inline-block"> <i className="fa-solid fa-circle-check"></i> {groupInfo.status}</span>
        </div>

             {/* action btn */}
           <div className="action-btn flex gap-2 items-center">
          <FaEdit onClick={()=>{onUpdate(groupInfo)}} className="cursor-pointer  hover:text-gray-700 transition-colors duration-300"/>  
          <FaRegTrashCan onClick={()=> onDelete(groupInfo._id)} className=" cursor-pointer hover:text-red-600 transition-colors duration-300"/>  
        </div>
      </div>
    </div>
  )
}
