import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO date string
  onShow:()=>void;
  id:string;
  onSet:(id:string)=>void;
  onTitle:(currentTitle:string)=>void;
  title:string;
}

const CountDownTimer = ({ targetDate ,onShow,id,onSet,onTitle,title}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showJoinButton, setShowJoinButton] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);

  useEffect(() => {
    const updateCountdown = () => {
      const targetUTC = Date.parse(targetDate);
      const nowUTC = Date.now();
      const diff = targetUTC - nowUTC;

      if (diff <= 0) {
        setTimeLeft(0);
        setShowJoinButton(false);
        setIsTimeOut(true);
      } else {
        setTimeLeft(diff);
        setIsTimeOut(false);
        setShowJoinButton(diff <= 4 * 60 * 60 * 1000); // show if < 4 hours
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);

  return (
    <div className="text-sm font-semibold text-blue-600 relative">
      {!isTimeOut && timeLeft > 0 && (
        <p>{`${days}Day ${hours}h ${minutes}m ${seconds}s`}</p>
      )}

      <AnimatePresence>
        {showJoinButton && !isTimeOut && (
          <motion.button
          onClick={()=>{
            onShow()
            onSet(id)
            onTitle(title)
          }}
            className="px-3 py-1 rounded-xl bg-blue-600 text-white cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            Join Now
          </motion.button>
          
        )}
      </AnimatePresence>

      {isTimeOut && (
        <p className="text-red-600 font-bold mt-2 animate-pulse">Time Out</p>
      )}

    </div>
  );
};

export default CountDownTimer;


