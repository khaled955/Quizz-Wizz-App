import photo1 from "../../../../../assets/images/students/1.avif"
import photo2 from "../../../../../assets/images/students/2.webp"
import photo3 from"../../../../../assets/images/students/3.avif"
import photo4 from"../../../../../assets/images/students/4.avif"
import photo5 from"../../../../../assets/images/students/5.jpg"
import photo6 from"../../../../../assets/images/students/6.jpg"
import photo7 from"../../../../../assets/images/students/7.webp"
import photo8 from"../../../../../assets/images/students/8.avif"
import photo9 from"../../../../../assets/images/students/9.avif"
import photo10 from"../../../../../assets/images/students/10.avif"
import { FaRegTrashCan } from "react-icons/fa6"
import { FaEye } from "react-icons/fa";
import { StudentListCardProps } from "../../../../../Interfaces/Student.interface"

const studentsAvatar = [photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,
  photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,
  photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,
  photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,
  photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10
]



export default function StudentListCard({index,onDelete,onShow,studentInfo}:StudentListCardProps) {
  return (
   <div className="group-card-container border-[1px] rounded-lg border-main-border-color p-3">
         <div className="group-card-box flex justify-between items-center flex-wrap">
   

        {/* avatar */}
             <div>
              <div className="avatar">
              <img className="size-24" src={studentsAvatar[index] || photo1} alt="avatar" />
             </div>
             <div>
              <p className="text-sm text-gray-500 capitalize dark:text-amber-400 font-bold"> <span>{studentInfo.first_name}</span> <span>{studentInfo.last_name}</span>
</p>
             </div>
             </div>

              {/* header text */}
             <div className="text-body">
               <h2 className=" font-medium">Group: <span className="text-sm font-light text-gray-600 dark:text-blue-500">{studentInfo.group?.name ||"Un Known Group"}</span></h2>
               <p className="text-sm">{studentInfo.group.students.length}-{studentInfo.group.students.length === 1 ?"Student":"Students"}</p>
           </div>
        
          
   
                {/* action btn */}
              <div className="action-btn flex gap-2 items-center">
             <FaRegTrashCan onClick={()=>{onDelete(studentInfo._id)}}  className=" cursor-pointer hover:text-red-600 transition-colors duration-300 text-xl"/>  
             <FaEye onClick={onShow} className="cursor-pointer text-xl hover:text-blue-600 transition-colors duration-300"/>
           </div>
         </div>
       </div>




  )

}
