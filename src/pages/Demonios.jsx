import "./css/Demonios.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";
import DemoniosContainer from "../components/Demonios/DemoniosContainer";
import Pagination from "../components/Demonios/Pagination";
import { IoIosArrowBack } from "react-icons/io";
import GoBackButton from "../components/GoBackButton";

const Demonios = () => {
   const [pageDTO, setPageDTO] = useState({
      espiritus: [],
      currentPage: 1,
      amountOfPages: 1,
      amountOfElements: 4,
      orden: "asc",
   });

   useEffect(() => {
      API.espiritusDemoniacos(1)
         .then((response) => {
            setPageDTO(response.data);
         })
         .catch(() => {
            console.log("malio sal");
         });
   }, []);

   const handleChangePage = (newPage) => {
      API.espiritusDemoniacos(newPage)
         .then((response) => {
            setPageDTO(response.data);
         })
         .catch(console.log("malio sal"));
   };

   return (
      <>
        <GoBackButton/>
         <div className="demonios">
            <div className="demonios-title-container">
               <h1 className="demonios-title">Bienvenides al infierno!</h1>
            </div>
            <DemoniosContainer demonios={pageDTO.espiritus} />
            <Pagination
               currentPage={pageDTO.currentPage}
               amountOfPages={pageDTO.amountOfPages}
               onPageChange={handleChangePage}
            />
         </div>
      </>
   );
};
export default Demonios;
