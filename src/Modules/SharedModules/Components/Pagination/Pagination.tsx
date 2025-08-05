// type PaginationProps = {
//   totalItems: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// };

// export default function Pagination({
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   onPageChange,
// }: PaginationProps) {
//    const totalPages = Math.ceil(totalItems / itemsPerPage);

//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex justify-center mt-4 space-x-2">
//       {Array.from({ length: totalPages }, (_, i) => (
//         <button
//           key={i}
//           onClick={() => onPageChange(i + 1)}
//           className={`px-4 py-2 rounded-full ${
//             currentPage === i + 1
//               ? 'bg-amber-300 text-white'
//               : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
//           }`}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   );
// }





import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  // Build a smart range with ellipses
  const createPageRange = () => {
    const delta = 2;
    const range: (number | "...")[] = [];
    let l = 0;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        if (l + 1 !== i) {
          range.push("...");
        }
        range.push(i);
        l = i;
      }
    }
    return range;
  };

  const pages = createPageRange();

  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-full 
          ${currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600"}
        `}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dot-${idx}`} className="px-2 text-gray-500">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full 
              ${currentPage === p
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"}
            `}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-full
          ${currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600"}
        `}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}




