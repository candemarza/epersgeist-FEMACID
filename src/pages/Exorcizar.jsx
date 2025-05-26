import "./css/Exorcizar.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import API from "../service/api";

const Exorcizar = () => {
   const { id } = useParams();
   const [mediumExorcista, setMediumExorcista] = useState({});
   const [mediums, setMediums] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({});

   const navigate = useNavigate();
   const goBack = () => {
      navigate(-1);
   };

   useEffect(() => {
      API.getMediumById(id).then((res) => {
         setMediumExorcista(res.data);

         API.getMediums().then((response) => {
            const filtered = response.data.filter(
               (medium) =>
                  medium.ubicacion.nombre === res.data.ubicacion.nombre &&
                  medium.id !== res.data.id &&
                  demoniosDe(medium).length > 0
            );
            setMediums(filtered);
            setSelectedMedium(filtered[0]);
         });
      });
   }, [id]);

   const demoniosDe = (medium) => {
      return medium.espiritus.filter(
         (espiritu) => espiritu.tipo === "Demoniaco"
      );
   };

   const exorcizar = () => {
      API.exorcizar(mediumExorcista.id, selectedMedium.id).then(() => {
         alert(`Exorcizado a ${selectedMedium.nombre}`);
         //en realidad deberia chequear si el medium a exorcizar
         //se quedo sin demonios, decir exitoso
         //se quedo con menso demonios, semi exitoso
         //se quedo con el mismo numero de demonios, decir que no se pudo exorcizar
         //si yo perdi angeles, decir que perdi algun angel
         //si perdi todos deci que cagamos las peras
         //uno no dice que lo otro no pasar es un case of para cada cosa?

         //si sigo teniendo angles, y el exorcizado sigue teniendo demoniso preguntar si quiero de nuevo
         //si tengo angeles y el exorcizado no tiene demonios, hacer un refresh de la lista, y decir queres exorcizar a otro?
      });
   };

   return (
      <div>
        <div className="goBack">
                    <IoIosArrowBack onClick={goBack} />
         </div>
         <h1 className="exorcizar-title">Elige al medium a exorcizar</h1>
         {mediums.length === 0 ? (
            <div className="no-mediums">
               <p>No hay mediums disponibles para exorcizar.</p>
            </div>
         ) : (
            <>
               <div className="medium-list">
                  {mediums.map((medium) => (
                     <div
                        key={medium.id}
                        className={`medium-item ${
                           selectedMedium.id === medium.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedMedium(medium)}
                     >
                        <h2>{medium.nombre}</h2>
                        <h2>Mana: {medium.mana}</h2>
                        <h2>Demonios: {demoniosDe(medium).length}</h2>
                     </div>
                  ))}
               </div>
               <button onClick={exorcizar}>
                  Exorcizar a {selectedMedium.nombre}
               </button>
            </>
         )}
      </div>
   );
};

export default Exorcizar;
