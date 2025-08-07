import { FaWifi } from 'react-icons/fa';
 export default function StatusIndicator() {

  return (
    <div className={`p-2 rounded fixed top-0 left-[50%] z-[9999999] text-center -translate-x-[50%] bg-white text-gray-800}`}>
      <p className="flex items-center gap-3">  Check Your Connection <FaWifi/></p>
    </div>
  );
}