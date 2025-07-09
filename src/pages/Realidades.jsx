import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";
import GoHomeButton from "../components/GoHomeButton.jsx";
import "./css/Realidades.css";

const Realidades = () => {
   const [realidades, setRealidades] = useState([]);

   const navigate = useNavigate();

   useEffect(() => {
      API.getRealidades().then((res) => {
         setRealidades(res.data);
      });
   }, []);


   const setSelected = (realidad) => {
      navigate(`/realidadesParalelas/${realidad.id}`);
   };

   const trimId = (id) => {
      return `${id.slice(18, 25)}` ;
   }

   return (
      <>
         <GoHomeButton />
         {realidades.length === 0 ? (
            <h1>No hay realidades paralelas ... el tejido esta unido</h1>
         ) : (
            <div>
               <h1>El tejido de las realidades</h1>
               <div className="realidades-container">
                  {realidades.map((realidad) => (
                     <div
                        key={realidad.id}
                        className="realidad-card"
                        onClick={() => setSelected(realidad)}
                     >
                        <h2 className="realidad-card-title">{realidad.nombre}</h2>
                        <p className="realidad-card-id">{trimId(realidad.id)}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};

export default Realidades;
