export interface Group {
  _id: string;
  name: string;
  status: "active" | "inactive";
  instructor: string; 
  students: string[]; // array of student IDs
  max_students: number;
}


export interface GroupCardProps{
 groupInfo:Group
  onDelete:(groupId:string)=>void;
  onUpdate:(currentGroup:Group)=>void;
}

export interface GroupStudentProps {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "active" | "inactive"; 
  role: "Student" | "Instructor"; 
}






export interface CreateGroupProps {
name:string;
students:string[];
} 



export interface GroupAddAndUpdateProps{
  title:string | null;
  errorMessage:string| null
  onCreate:(dataInfo:CreateGroupProps)=>Promise<void>;
  onUpdate:(dataInfo:CreateGroupProps,groupId:string)=>Promise<void>
  onClose:()=>void;
  currentGroup:Group | null
}



export interface GroupDetailsProp {
  _id: string;
  name: string;
  status: "active" | "inactive";
  instructor: string; // ID of the instructor
  students: string[]; // Array of student IDs
  max_students: number;
}
