export interface Group {
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

export interface StudentWithGroup {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: "Student" | string;
  group: Group;
  avg_score: number;
}