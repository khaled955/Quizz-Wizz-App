import { useCallback, useEffect, useState } from "react";
import GroupListCard from "../GroupListCard/GroupListCard";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import GroupAddAndUpdateCard from "../GroupAddAndUpdateCard/GroupAddAndUpdateCard";
import { CreateGroupProps, Group } from "../../../../../Interfaces/Groups.interface";
import useAuth from "../../../../../Hooks/useAuth";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import { GROUP } from "../../../../../Services/endPoint";
import Loading from "../../../../SharedModules/Pages/Loading/Loading";
import Pagination from "../../../../SharedModules/Components/Pagination/Pagination";
import DeleteConfirmModal from "../../../../SharedModules/Components/ConfirmationModel/ConfirmationModel";
import { FaLayerGroup } from 'react-icons/fa';



const ITEMS_PER_PAGE = 6;


export default function GroupList() {
const[groupList , setGroupList] = useState<Group[] | null>(null)
 const [currentPage, setCurrentPage] = useState(1);
 const[title , setTitle] = useState<string | null>(null)
 const[showAddAndUpdateCard , setShowAddAndUpdateCard] = useState(false)
 const [showDeletMessage , setShowDeletMessage]= useState(false)
const[errorMessage , setErrorMessage] = useState(null)
const[isLoading , setIsLoading] = useState(false)
const[selectGroupId , setSelectedGroupId] = useState<string| null>(null)
const[currentGroup,setCurrentGroup] = useState<Group | null>(null)
const{logedInData,logOut} = useAuth()




// setting for pagination
 const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = groupList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  // fetch Groups
  const fetchGroups = useCallback( async function(){

try {
    const{data} = await axiosInstance.get(GROUP.GET_ALL)
      setGroupList(data)

} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message)
}


 },[])



//  update current group

const handleUpdateCurrentGroup = useCallback(  async function(dataInfo:CreateGroupProps,groupId:string){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:GROUP.UPDATE_GROUP(groupId),
      method: "PUT",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record updated successfully"){
 toast.success( data.message || "Group Updated successfully")
   await fetchGroups()
   setTimeout(()=>{
    setShowAddAndUpdateCard(false)
   },1500)
}
 




  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
    }
  }finally{
    toast.dismiss(toastId)
  }

},[fetchGroups])


const createNewGroup = useCallback(  async function(dataInfo:CreateGroupProps){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:GROUP.CREATE_GROUP,
      method: "POST",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record created successfully"){
  toast.success( data.message || "Group created successfully")
   await fetchGroups()
   setTimeout(()=>{
    setShowAddAndUpdateCard(false)
   },1500)
}



  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
    }
  }finally{
    toast.dismiss(toastId)
  }

},[fetchGroups])








const handleDeletGroup = useCallback(async function(){
  const toastId = toast.loading("Waiting.....")
 setErrorMessage(null)
 setIsLoading(true)
 try {
  
const{data} = await axiosInstance.delete(GROUP.DELETE_GROUP(selectGroupId!))

if(data.message === "Record deleted successfully"){
  toast.success(data.message || "Group deleted successfully")
   await fetchGroups()
setTimeout(() => {
  setShowDeletMessage(false)
}, 1500);

}

 } catch (error) {
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some Thing Go Wrong!")
  }
 }finally{
  toast.dismiss(toastId)
  setIsLoading(false)
  setSelectedGroupId(null)
 }

},[selectGroupId,fetchGroups])







useEffect(()=>{

if(logedInData?.profile.role === "Instructor"){
    fetchGroups()
}else{
  logOut()
    return;
}

},[logedInData,logOut,fetchGroups])


// event handler
const handleShowAddAndUpdateModel = useCallback(function(){
  setTitle("Set up a new Group")
  setShowAddAndUpdateCard(true)
},[])



if(!paginatedData) return <Loading/>
  return (
   <div className="group-list-container">
    
    {/* add btn */}
    <div className="add-btn text-end">
        <button onClick={handleShowAddAndUpdateModel} className="addBtn"> <i className="fa-solid fa-circle-plus"></i> Add Group</button>
       </div>

      {/* body of component */}
    <div className="group-list-box rounded-2xl px-4 border-[1px] border-[#f3f4f6] mt-4 py-6">

      <span className=" text-xl mb-4 font-bold flex items-center gap-3"> <FaLayerGroup className="text-3xl"/>Group List</span>

{/*  display data */}
{paginatedData.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

{paginatedData?.map((group:Group)=> <GroupListCard onDelete={(groupId:string)=>{
setSelectedGroupId(groupId)
setShowDeletMessage(true)
}} 
onUpdate={(currentGroup:Group)=>{setCurrentGroup(currentGroup)
  setTitle("Update Current Group")
  setShowAddAndUpdateCard(true)
}}
key={group._id} groupInfo={group}/>)}
</div>:<p className="text-center text-lg font-bold text-gray-500 dark:text-white"> No Groups Available Now</p>}

<Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} totalItems={groupList?.length || 0}/>
    </div>
   
   {/* add and update form pop up */}

{showAddAndUpdateCard &&  <GroupAddAndUpdateCard errorMessage={errorMessage} onClose={()=>{
  setShowAddAndUpdateCard(false)
  setTitle(null)
  setCurrentGroup(null)
}} 
onCreate={createNewGroup} 
title={title}
currentGroup={currentGroup}
onUpdate={handleUpdateCurrentGroup}
/>
}

{/* delet model */}
{showDeletMessage && <DeleteConfirmModal isOpen={showDeletMessage} onClose={()=>{
  setSelectedGroupId(null)
  setShowDeletMessage(false)
}}
  onConfirm={handleDeletGroup}
  title="Are you sure you want to delete this Group?"
  description="This Action Will Remove This Group From Your List"
  loading={isLoading}
  />}





   </div>
  )
}
