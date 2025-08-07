import { FaAward } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import useAuth from "../../../../../Hooks/useAuth";
import QRCode from 'react-qr-code';
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import signatue from "../../../../../../public/images/signature-nadia.png"
import { useLocation, useNavigate} from "react-router-dom";



export default function Certificate() {
  const { logedInData } = useAuth();
const navigate = useNavigate()



  const{state:{score,title}} = useLocation()
 const certificateRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);






  const handleDownload = async () => {
  if (buttonRef.current) buttonRef.current.style.display = "none";

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!certificateRef.current) return;

  const canvas = await html2canvas(certificateRef.current, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("landscape", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`QuizzWiz_Certificate_${logedInData?.profile?.first_name}.pdf`);

  if (buttonRef.current) buttonRef.current.style.display = "block";
};






  return (
    <div className=" w-full h-[600px] fixed top-0 left-[50%] -translate-x-[50%] z-20 overflow-y-auto flex justify-center items-center">
      <div
        ref={certificateRef}      
      
      className="relative bg-white shadow-2xl border-8 border-purple-500 w-[90%] min-h-[600px] rounded-3xl p-10 text-center font-serif">
        {/* Heading */}
        <div className="flex flex-col items-center mb-8">
          <FaAward className="text-5xl text-purple-600 mb-2" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 uppercase tracking-wide">
            Certificate of Achievement
          </h1>
        </div>

        {/* Recipient Name */}
        <p className="text-gray-600 text-lg sm:text-xl mb-2">
          This certificate is proudly presented to
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700 mt-1 capitalize">
          {logedInData?.profile?.first_name} {logedInData?.profile?.last_name}
        </h2>

        {/* Achievement */}
        <p className="mt-4 text-gray-700 text-base sm:text-lg">
          For successfully completing the quiz <q className="capitalize text-3xl font-black">{title?title:""}</q> and achieving a score of:
        </p>
        <div className="text-4xl text-green-600 font-bold my-4">
          {score} %
        </div>

        {/* CEO Info */}
        <div className="mt-6 text-center flex flex-col items-center">
          <p className="text-gray-600 text-sm mb-1">Signed by</p>
          <p className="text-lg font-medium text-gray-800">
            Eng. Nadia Mohamed Taha – CEO, Quizz Wiz Academy
          </p>
          <img className="size-24" src={signatue} alt="signature" />
        </div>

        {/* QR Code */}
        <div className="absolute bottom-6 right-6 flex flex-col items-center text-sm text-gray-600">
          <div className="bg-white p-1 rounded-md shadow-md">
            <QRCode
              value={`${window.location.origin}/learner/certificate/${logedInData?.profile?._id}`}
              size={80}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
          <p className="mt-1">www.quizzwiz.com</p>
        </div>

        {/* Verified */}
        <div className="absolute bottom-6 left-6 text-left text-green-700 flex items-center gap-1">
          <FaRegCheckCircle className="text-xl" />
          <span>Verified by Quiz Wiz</span>
        </div>


    



      </div>



     {/* Download Button */}
      <button
      ref={buttonRef}
      onClick={ async ()=>{
         await handleDownload() 
         navigate("/learner")
     }}
       className=" cursor-pointer mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md absolute bottom-3"     >
     Download PDF
   </button>


    </div>
  );
}












