import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../../../Hooks/useAuth";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import Loading from "../../../../SharedModules/Pages/Loading/Loading";
import Pagination from "../../../../SharedModules/Components/Pagination/Pagination";
import DeleteConfirmModal from "../../../../SharedModules/Components/ConfirmationModel/ConfirmationModel";
import { StudentListWithGroupsProps } from "../../../../../Interfaces/Student.interface";
import { STUDENT } from "../../../../../Services/endPoint";
import StudentListCard from "../StudentListCard/StudentListCard";
import StudentCardModal from "../StudentCardModal/StudentCardModal";




const ITEMS_PER_PAGE = 6;


export default function StudentList() {
const[studentList , setStudentList] = useState<StudentListWithGroupsProps[] | null>(null)
 const [currentPage, setCurrentPage] = useState(1);
 const [showDeletMessage , setShowDeletMessage]= useState(false)
const[isLoading , setIsLoading] = useState(false)
const[showStudentCardModal , setShowStudentCardModal] = useState(false)
const[selectStudentId , setSelectedStudentId] = useState<string| null>(null)
const[currentStudent,setCurrentStudent] = useState<StudentListWithGroupsProps | null>(null)
const[orignalStudentList , setOriginalStudentList] = useState<StudentListWithGroupsProps[] | null>(null)
const [searchValue, setSearchValue] = useState("");

const navigate = useNavigate()
const{logedInData} = useAuth()




// setting for pagination
 const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = orignalStudentList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  // fetch Groups
  const fetchStudents = useCallback( async function(){

try {
    const{data} = await axiosInstance.get(STUDENT.GET_ALL)
      setStudentList(data)
      setOriginalStudentList(data)

} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message)
}


 },[])











// Delete Student
const handleDeletStudent = useCallback(async function(){
  const toastId = toast.loading("Waiting.....")
 setIsLoading(true)
 try {
  
const{data} = await axiosInstance.delete(STUDENT.DELETE_STUDENT(selectStudentId!))

if(data.message === "Record deleted successfully"){
  toast.success(data.message || "Group deleted successfully")
   await fetchStudents()
setTimeout(() => {
  setShowDeletMessage(false)
}, 1000);

}

 } catch (error) {
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some Thing Go Wrong!")
  }
 }finally{
  toast.dismiss(toastId)
  setIsLoading(false)
  setSelectedStudentId(null)
 }

},[selectStudentId,fetchStudents])







useEffect(()=>{

if(logedInData?.profile.role === "Instructor"){
    fetchStudents()
}else{
    navigate("/dashboard")
    return;
}

},[logedInData,navigate,fetchStudents])



//  Search Function Logic
useEffect(() => {
  const timeout = setTimeout(() => {
    if (searchValue.trim().length > 0) {
      const searchByName = searchValue.trim().toLowerCase();

      const filteredStudents = (studentList || []).filter(
        (student: StudentListWithGroupsProps) =>
          student.first_name.toLowerCase().includes(searchByName) && student.group
      );

      setOriginalStudentList(filteredStudents);
      setCurrentPage(1);
    } else {
      setOriginalStudentList(studentList);
    }
  }, 400); // 400ms debounce

  return () => clearTimeout(timeout);
}, [searchValue, studentList]);







if(!paginatedData) return <Loading/>
  return (
   <div className="student-list-container w-full">
    
  
      {/* body of component */}
    <div className="group-list-box rounded-2xl px-4 border-[1px] border-[#f3f4f6] mt-4 py-6">

      <span className="inline-block text-xl mb-4 font-bold">Student List</span>

<div className="search-input mb-3">
  <input    onChange={(e) => setSearchValue(e.target.value)}
 type="search" className="border-[1px] border-gray-500 w-[100%] px-2 py-3 rounded-2xl outline-0" placeholder="Search By Name" />
</div>



{/*  display data */}
{paginatedData.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden">

{paginatedData?.map((student:StudentListWithGroupsProps,index:number)=> <StudentListCard index={index} onDelete={(studentId:string)=>{
setSelectedStudentId(studentId)
setShowDeletMessage(true)
}} 
onShow={()=>{
  setCurrentStudent(student)
  setShowStudentCardModal(true)
}}
key={student._id} studentInfo={student}/>)}
</div>:<p className="text-center text-lg font-bold text-gray-500"> No Students Available Now</p>}


{paginatedData.length > 0 && <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} totalItems={orignalStudentList?.length || 0}/>
}
    </div>
   


{/* delet model */}
{showDeletMessage && <DeleteConfirmModal isOpen={showDeletMessage} onClose={()=>{
  setSelectedStudentId(null)
  setShowDeletMessage(false)
}}
  onConfirm={handleDeletStudent}
  title="Are you sure you want to delete this Student?"
  description="This Action Will Remove The Student From Your List"
  loading={isLoading}
  />}


{/* Student Show Details Modal */}
{showStudentCardModal && <StudentCardModal
onClose={()=>{
  setShowStudentCardModal(false)
  setCurrentStudent(null)
}}
open={showStudentCardModal}
student={currentStudent}
/>}

   </div>
  )
}
