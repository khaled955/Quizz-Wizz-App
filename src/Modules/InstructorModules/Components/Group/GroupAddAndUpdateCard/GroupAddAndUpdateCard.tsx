import {useEffect, useState } from "react"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { ImSpinner4 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Controller,useForm } from "react-hook-form"
import MultiSelectInput from "../MultiSelectInput/MultiSelectInput"
import { CreateGroupProps, GroupAddAndUpdateProps, GroupStudentProps } from "../../../../../Interfaces/Groups.interface";
import useAuth from "../../../../../Hooks/useAuth";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import { GROUP, STUDENT } from "../../../../../Services/endPoint";
import { GROUP_MODULE } from "../../../../../Services/validation";

export default function GroupAddAndUpdateCard({errorMessage,onClose,onCreate,title ,currentGroup,onUpdate}:GroupAddAndUpdateProps) {
  const [studentsList , setStudentsList] = useState<GroupStudentProps[] | []>([])

  const[isLoading , setIsLoading] = useState(false)

const{logedInData} = useAuth()

const{register,handleSubmit,formState:{errors,isSubmitting},control,reset}= useForm<CreateGroupProps>({"mode":"onChange",defaultValues:{
  name:currentGroup?.name || "",
  students:currentGroup? currentGroup.students:[],

}})




useEffect(() => {
  async function fetchStudents() {
    setIsLoading(true);
    try {
      // Step 1: fetch students not in any group
      const { data: unassignedStudents } = await axiosInstance.get(STUDENT.GET_ALL_WITHOUT_GROUP);

      let assignedStudents: GroupStudentProps[] = [];

      // Step 2: fetch full group details if updating
      if (title === "Update Current Group" && currentGroup?._id) {
        const { data: groupDetails } = await axiosInstance.get(GROUP.GET_BY_ID(currentGroup._id));
        assignedStudents = groupDetails.students || [];
      }

      // Step 3: merge assigned + unassigned students without duplicates
      const allStudents = [...assignedStudents];

      const assignedIds = new Set(assignedStudents.map(s => s._id));
      unassignedStudents.forEach((student: GroupStudentProps) => {
        if (!assignedIds.has(student._id)) {
          allStudents.push(student);
        }
      });

      setStudentsList(allStudents);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (logedInData?.profile.role === "Instructor") fetchStudents();
}, [logedInData, title, currentGroup]);









  useEffect(() => {
    // Reset form when currentGroup changes
    if (currentGroup) {
      reset({
        name: currentGroup.name,
        students: currentGroup.students
      })
    } else {
      reset({
        name: "",
        students: []
      })
    }
  }, [currentGroup, reset])














  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center z-50 bg-gray-600/40 items-center">
      <div className="form-box bg-white w-full sm:w-[40%] pb-5">
        <form onSubmit={handleSubmit((data)=>{
          if(title ==="Set up a new Group")onCreate(data)
            if(title === "Update Current Group" && currentGroup) onUpdate(data,currentGroup?._id)
        })}>
        <div className="form-header flex justify-between border-[1px] border-main-border-color items-center">
            <h2 className="px-3 font-bold capitalize text-gray-600 text-2xl">{title}</h2>
            <div className="act-btn flex">
                <button disabled={isSubmitting} type="submit" className="true-btn p-3 border-l-[1px] border-main-border-color">
                  <FaCheck className="cursor-pointer text-2xl"/>
                </button>
                <button onClick={onClose} disabled={isSubmitting} type="button" className="false-btn p-3  border-l-[1px] border-main-border-color">
                  <IoCloseSharp className="cursor-pointer text-2xl"/>
                </button>
            </div>
        </div>

        <div className="form-inputs px-3 py-6">
          {/* group name input */}
          <div className="group-name border-[1px] border-main-border-color rounded-2xl flex overflow-hidden mb-1">
            <label className="bg-[#ffeddf] p-3" htmlFor="groupName">Group Name</label>
            <input
            {...register("name",GROUP_MODULE.NAME)}
            className="border-0 outline-0 grow" type="text"  id="groupName"/>
          </div>
           {errors.name && <p className="error-message">{errors.name.message}</p>}




           
          {/*  student lis inputs */}
          {isLoading?<div className="flex justify-center items-center"><ImSpinner4 className="text-3xl animate-spin"/></div>:studentsList.length > 0 ? <Controller
  control={control}
  name="students"
  defaultValue={[]}
  rules={{
    validate: (value) =>
      value.length > 0 || "You must select at least one student"
  }}
  render={({ field: { value, onChange } }) => (
    <MultiSelectInput
      students={studentsList}
      selected={value}
      onChange={onChange}
    />
  )}
/>
 
:<p className=" text-red-700 capitalize text-center"> No Students Available Now</p>}


        </div>
   {errors.students && <p className="error-message mb-3 ml-3">{errors.students.message}</p>}

{errorMessage && <p className="error-message text-black text-center mb-3 ml-3">{errorMessage}</p>}
      </form>
      </div>
    </div>
  )
}
