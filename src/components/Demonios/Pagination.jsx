import "../css/Pagination.css";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import explosion from "../../assets/explosion.gif";

const Pagination = ({ currentPage, amountOfPages, onPageChange }) => {
   const [showExplotion, setShowExplotion] = useState(false);

   const handleExplosion = (newPage) => {
      setShowExplotion(true);
      setTimeout(() => {
         setShowExplotion(false);
      }, 1000);
      onPageChange(newPage);
   };

   return (
      <div className="paginator">
         {showExplotion && (
            <div className="explosion">
               <img src={explosion} alt="explosion" />
            </div>
         )}
         <div className="paginator-container">
            <PastPage
               currentPage={currentPage}
               onPageChange={handleExplosion}
            />
            <p className="paginator-pages">
               {currentPage} de {amountOfPages}
            </p>
            <NextPage
               currentPage={currentPage}
               amountOfPages={amountOfPages}
               onPageChange={handleExplosion}
            />
         </div>
      </div>
   );
};

const PastPage = ({ currentPage, onPageChange }) => {
   return currentPage === 1 ? (
      <IoMdArrowDropleft className="paginator-arrow-disabled" />
   ) : (
      <IoMdArrowDropleft
         className="paginator-arrow"
         onClick={() => onPageChange(currentPage - 1)}
      />
   );
};

const NextPage = ({ currentPage, amountOfPages, onPageChange }) => {
   return currentPage === amountOfPages ? (
      <IoMdArrowDropright className="paginator-arrow-disabled" />
   ) : (
      <IoMdArrowDropright
         className="paginator-arrow"
         onClick={() => onPageChange(currentPage + 1)}
      />
   );
};

export default Pagination;
