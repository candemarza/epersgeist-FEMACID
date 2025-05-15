import "../css/Pagination.css";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

const Pagination = ({ currentPage, amountOfPages, onPageChange }) => {
   return (
      <div className="paginator">
         <PastPage currentPage={currentPage} onPageChange={onPageChange} />
         <p className="paginator-pages">
            {currentPage} de {amountOfPages}
         </p>
         <NextPage
            currentPage={currentPage}
            amountOfPages={amountOfPages}
            onPageChange={onPageChange}
         />
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
