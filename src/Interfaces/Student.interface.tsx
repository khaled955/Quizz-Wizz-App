export interface GroupInfo {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface StudentListWithGroupsProps {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: GroupInfo;
}



export interface StudentListCardProps{
index:number;
onDelete:(studentId:string)=>void;
onShow:()=>void;
studentInfo:StudentListWithGroupsProps

}



