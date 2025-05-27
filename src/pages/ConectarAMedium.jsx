import "./css/ConectarAMedium.css";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/api";
import { getMediumImg } from "../imageMappers/MediumsMapper";
import GoBackButton from "../components/GoBackButton";

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

   const scrollRef = useRef();

   const scrollMediums = (direction) => {
      const container = scrollRef.current;
      const scrollAmount = 500;

      container.scrollBy({
         left: scrollAmount * direction,
         behavior: "smooth",
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
                  <div className="mediums-carrousel">
                     <div
                        className="scroll-arrow"
                        onClick={() => scrollMediums(-1)}
                     >
                        ◀
                     </div>
                     <div className="medium-list-wrapper" ref={scrollRef}>
                        <div className="medium-list">
                           {mediumsAvailable.map((medium) => (
                              <ChooseMediumCard
                                 medium={medium}
                                 key={medium.id}
                                 selected={selectedMedium.id === medium.id}
                                 onClick={() => setSelected(medium)}
                              />
                           ))}
                        </div>
                     </div>
                     <div
                        className="scroll-arrow"
                        onClick={() => scrollMediums(1)}
                     >
                        ▶
                     </div>
                  </div>
                  <button onClick={handleConectar}>
                     Conectar con {selectedMedium.nombre}
                  </button>
               </>
            )}
         </div>
         {showPopupSuccess && (
            <div className="popup">
               <div className="popup-content">
                  <h2>Conexión exitosa!!</h2>
                  <p>Te conectaste con {selectedMedium.nombre}</p>
                  <button onClick={goBack}>Volver</button>
               </div>
            </div>
         )}
         {showPopupError && (
            <div className="popup">
               <div className="popup-content">
                  <h2>Error al conectar con medium</h2>
                  <p>{selectedMedium.nombre} tiene mucho flow B)</p>
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

const ChooseMediumCard = ({ medium, selected, onClick }) => {
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
            <p className="choose-medium-mana">Mana: {medium.mana}</p>
         </div>
      </>
   );
};

export default ConectarAMedium;
