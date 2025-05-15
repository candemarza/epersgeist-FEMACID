import "./css/Demonios.css";
import { useEffect, useState } from "react";
import API from "../service/api";
import DemoniosContainer from "../components/Demonios/DemoniosContainer";
import Pagination from "../components/Demonios/Pagination";


const Demonios = () => {
   const [pageDTO, setPageDTO] = useState({
      espiritus: [],
      currentPage: 1,
      amountOfPages: 1,
      amountOfElements: 6,
      orden: "asc"
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
            window.scrollTo({ top: 0, behavior: "smooth" });
         })
         .catch(console.log("malio sal"));
   };

   return (
      <div className="demonios">
         <h1 className="demonios-title">Bienvenides al infierno!</h1>
         <DemoniosContainer
            demonios={pageDTO.espiritus}
         />
         <Pagination
            currentPage={pageDTO.currentPage}
            amountOfPages={pageDTO.amountOfPages}
            onPageChange={handleChangePage}
         />
      </div>
   );
};
export default Demonios;
