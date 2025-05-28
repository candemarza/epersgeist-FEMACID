import "./css/Exorcizar.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import API from "../service/api";
import PopUpExorcismo from "../components/PopUpExorcismo";

const Exorcizar = () => {
   const { id } = useParams();
   const [mediumExorcista, setMediumExorcista] = useState({});
   const [mediums, setMediums] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({});
   const [showPopup, setShowPopup] = useState(false);

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

   const angelesDe = (medium) => {
      return medium.espiritus.filter(
         (espiritu) => espiritu.tipo === "Angelical"
      );
   };

   const exorcizar = () => {
      API.exorcizar(mediumExorcista.id, selectedMedium.id).then(() => {
         setShowPopup(true);
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
         {showPopup && (
            <PopUpExorcismo
               IDmediumExorcista={mediumExorcista.id}
               angelesExorcistas={angelesDe(mediumExorcista)}
               IDmediumExorcizado={selectedMedium.id}
               demoniosExorcizados={demoniosDe(selectedMedium)}
            />
         )}
      </div>
   );
};



export default Exorcizar;
