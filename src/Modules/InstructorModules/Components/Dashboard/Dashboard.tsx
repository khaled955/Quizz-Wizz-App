import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { CompletedQuizzProps } from "../../../../Interfaces/quizz.interface";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { QUESTION, QUIZ, STUDENT } from "../../../../Services/endPoint";
import { StudentWithGroup } from "../../../../Interfaces/Dashboard.interface";
import useAuth from "../../../../Hooks/useAuth";

const Dashboard = () => {
  const [quizzesList, setQuizzesList] = useState<CompletedQuizzProps[]>([]);
  const [hardQuestions, setHardQuestions] = useState(0);
  const [easyQuestions, setEasyQuestions] = useState(0);
  const [mediumQuestions, setMediumQuestions] = useState(0);
  const [topFiveStudents, setTopFiveStudents] = useState<StudentWithGroup[]>([]);
const{logedInData , logOut} = useAuth()



  const fetchAllQuizzes = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(QUIZ.FIRST_FIVE_INCOMMING);
      setQuizzesList(data);
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data.message || "Something went wrong");
    }
  }, []);

  const fetchTopFiveStudents = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(STUDENT.GET_TOP_FIVE_STUDENTS);
      setTopFiveStudents(data);
    } catch (error) {

      if (isAxiosError(error)) toast.error(error.response?.data.message || "Something went wrong");
    }
  }, []);

  const fetchDifficultyCounts = useCallback(async () => {
    try {
      const [easyRes, mediumRes, hardRes] = await Promise.all([
        axiosInstance.post(QUESTION.EASY_QUESTIONS),
        axiosInstance.post(QUESTION.MEDIUM_QUESTIONS),
        axiosInstance.post(QUESTION.HARD_QUESTIONS),
      ]);
      setEasyQuestions(easyRes.data.length);
      setMediumQuestions(mediumRes.data.length);
      setHardQuestions(hardRes.data.length);
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data.message || "Error fetching difficulties");
    }
  }, []);



  useEffect(() => {
    


if(logedInData?.profile.role === "Instructor"){


  fetchAllQuizzes();
    fetchTopFiveStudents();
    fetchDifficultyCounts();
}else{
  logOut()
    return;
}



  }, [fetchAllQuizzes, fetchTopFiveStudents, fetchDifficultyCounts,logedInData?.profile.role,logOut]);

  const quizzes = useMemo(() => {
    return quizzesList.map((quizz) => ({
      title: quizz.title,
      questionNumber: quizz.questions.length,
    }));
  }, [quizzesList]);

  const fiveStudentsData = useMemo(() => {
    return topFiveStudents.map((student) => ({
      name: student.first_name,
      score: student.avg_score,
    }));
  }, [topFiveStudents]);

  const questionTypesData = [
    { type: "Easy", count: easyQuestions },
    { type: "Medium", count: mediumQuestions },
    { type: "Hard", count: hardQuestions },
  ];

  const resultsSummary = [
    { status: "Quizzes", count: quizzesList.length },
    {
      status: "Participants",
      count: quizzesList.reduce((sum, q) => sum + (q.participants || 0), 0),
    },
  ];




const colors = 
  window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? ["#fbbf24", "#fb923c", "#f472b6", "#a78bfa", "#60a5fa"] // vibrant for dark mode
    : ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"]; // pastel for light mode



  return (
    <div className="p-4 grid gap-8 grid-cols-1 md:grid-cols-2">



      {/* Quiz Stats */}

     {quizzes.length > 0 &&  <div className="shadow-lg p-4 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">Quiz Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={quizzes}>
            <XAxis dataKey="title" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Bar dataKey="questionNumber" fill={colors[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
}
      {/* Question Difficulties */}
      <div className="shadow-lg p-4 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">Question Difficulties</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={questionTypesData}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {questionTypesData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Students */}
      <div className="shadow-lg p-4 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">Top 5 Students</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={fiveStudentsData}>
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="name" type="category" stroke="#888" />
            <Tooltip />
            <Bar dataKey="score" fill={colors[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Results Summary */}
      <div className="shadow-lg p-4 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">Summary</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resultsSummary}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {resultsSummary.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;









