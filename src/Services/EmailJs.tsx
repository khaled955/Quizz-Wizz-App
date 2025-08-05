/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from "@emailjs/browser";

export const sendQuizEmails = async ({
  students,
  quizCode,
  scheduleTime,
  templateParams,
}: {
  students: { email: string; first_name: string; last_name: string }[];
  quizCode: string;
  scheduleTime: string;
  templateParams?: Record<string, any>;
}) => {
  for (const student of students) {
    await emailjs.send(
      "service_4h8uw4a",
      "template_kzmo02d", // ✅ Your actual EmailJS template ID
      {
        to_name: `${student.first_name} ${student.last_name}`, // ✅ Name will appear in the email
        to_email: student.email,
        quiz_code: quizCode,
        schedule_time: scheduleTime,
        website_name: "WizQuizz",
        ...templateParams,
      },
      "BuLSxG_iIAfXVXU-4" // ✅ Your public key
    );
  }
};





