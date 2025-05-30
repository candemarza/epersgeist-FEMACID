import "./css/ConectarAMedium.css";
import "../components/css/MediumCard.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/api";
import { getMediumImg } from "../imageMappers/MediumsMapper";
import GoBackButton from "../components/GoBackButton";
import Carousel from "../components/Carousel";

const ConectarAMedium = () => {
   const params = useParams();
   const [mediumsAvailable, setMediumsAvailable] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({});
   const [espiritu, setEspiritu] = useState({});
   const [showPopupSuccess, setShowPopupSuccess] = useState(false);
   const [showPopupError, setShowPopupError] = useState(false);
   const navigate = useNavigate();
   const goBack = () => {
      navigate(-1);
   };

   useEffect(() => {
      API.getEspirituById(params.id).then((res) => {
         setEspiritu(res.data);
         API.getMediums().then((mediumsRes) => {
            const filtered = mediumsRes.data.filter(
               (medium) => medium.ubicacion.nombre === res.data.ubicacion.nombre
            );
            setMediumsAvailable(filtered);
            setSelectedMedium(filtered[0]);
         });
      });
   }, []);

   const setSelected = (medium) => {
      setSelectedMedium(medium);
   };

   const handleConectar = () => {
      API.conectarEspiritu(espiritu.id, selectedMedium.id)
         .then(() => {
            setShowPopupSuccess(true);
         })
         .catch(() => {
            setShowPopupError(true);
         });
   };

   return (
      <>
         <GoBackButton />
         <div className="conectar-espiritu">
            <h1 className="conectar-title">Elige a tu medium</h1>
            {mediumsAvailable.length === 0 ? (
               <div className="no-mediums">
                  <p>No hay mediums disponibles.</p>
               </div>
            ) : (
               <>
                  <Carousel
                     items={mediumsAvailable}
                     selected={selectedMedium}
                     setSelected={setSelected}
                     renderItem={({ item, selected, onClick }) => (
                        <ChooseMediumCard
                           medium={item}
                           key={item.id}
                           selected={selected}
                           onClick={onClick}
                           espiritus={item.espiritus.length}
                        />
                     )}
                  />
                  <div onClick={handleConectar} className="conectar-button">
                     Conectar con {selectedMedium.nombre}
                  </div>
               </>
            )}
         </div>
         {showPopupSuccess && (
            <div className="popup-overlay">
               <div className="popup-create">
                  <h2 className="popup-title">Conexión exitosa!!</h2>
                  <p className="popup-subtitle">Te conectaste con {selectedMedium.nombre}</p>
                  <button onClick={goBack}>Volver</button>
               </div>
            </div>
         )}
         {showPopupError && (
            <div className="popup-overlay">
               <div className="popup-create">
                  <h2 className="popup-title">Error al conectar con medium</h2>
                  <p className="popup-subtitle">{selectedMedium.nombre} tiene mucho flow B)</p>
                  <button onClick={() => setShowPopupError(false)}>
                     Intentar con otro medium
                  </button>
                  <button onClick={goBack}>Volver</button>
               </div>
            </div>
         )}
      </>
   );
};

const ChooseMediumCard = ({ medium, selected, onClick, espiritus }) => {
   const mediumImg = getMediumImg(medium.nombre);

   return (
      <>
         <div
            className={`choose-medium-card ${selected ? "selectedCard" : ""}`}
            onClick={onClick}
         >
            <img
               className="choose-medium-img"
               src={mediumImg}
               alt={medium.nombre}
            />
            <h2 className="choose-medium-nombre">{medium.nombre}</h2>
            <h2 className="choose-medium-mana">Mana: {medium.mana}</h2>
            <h2 className="choose-medium-espiritus">
               Espíritus : {espiritus} </h2>
         </div>
      </>
   );
};

export default ConectarAMedium;
