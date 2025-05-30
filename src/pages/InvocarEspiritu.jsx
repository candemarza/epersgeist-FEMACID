import "./css/InvocarEspiritu.css";
import "../components/css/EspirituCard.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/api";
import { getEspirituImg } from "../imageMappers/EspiritusMapper";
import GoBackButton from "../components/GoBackButton";
import Carousel from "../components/Carousel";

const InvocarEspiritu = () => {
   const params = useParams();
   const [espiritusAvailable, setEspiritusAvailable] = useState([]);
   const [selectedEspiritu, setSelectedEspiritu] = useState({});
   const [medium, setMedium] = useState({});
   const [showPopupSuccess, setShowPopupSuccess] = useState(false);
   const [showPopupError, setShowPopupError] = useState(false);
   const navigate = useNavigate();
   const goBack = () => {
      navigate(-1);
   };

   useEffect(() => {
      API.getMediumById(params.id).then((res) => {
         setMedium(res.data);
         API.getEspiritus().then((espiritusRes) => {
            const filtered = espiritusRes.data.filter(
               (espiritu) =>
                  espiritu.ubicacion?.nombre !== res.data.ubicacion?.nombre &&
                  ((res.data.ubicacion?.tipo === "Cementerio" &&
                     espiritu.tipo === "Demoniaco") ||
                     (res.data.ubicacion?.tipo === "Santuario" &&
                        espiritu.tipo === "Angelical"))
            );
            setEspiritusAvailable(filtered);
            setSelectedEspiritu(filtered[0]);
         });
      });
   }, []);

   const setSelected = (espiritu) => {
      setSelectedEspiritu(espiritu);
   };

   const handleInvocar = () => {
      API.invocarEspiritu(medium.id, selectedEspiritu.id)
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
         <div className="invocar-espiritu">
            <h1 className="invocar-title">Elige al espíritu a invocar</h1>
            {espiritusAvailable.length === 0 ? (
               <div className="no-espiritus">
                  <p>No hay espíritus disponibles para invocar.</p>
               </div>
            ) : (
               <>
                  <Carousel
                     items={espiritusAvailable}
                     selected={selectedEspiritu}
                     setSelected={setSelectedEspiritu}
                     renderItem={({ item, selected, onClick }) => (
                        <ChooseEspirituCard
                           espiritu={item}
                           key={item.id}
                           selected={selected}
                           onClick={onClick}
                        />
                     )}
                  />
                  <button onClick={handleInvocar}>
                     Invocar a {selectedEspiritu?.nombre}
                  </button>
               </>
            )}
         </div>
         {showPopupSuccess && (
            <div className="popup-overlay">
               <div className="popup-create">
                  <h2 className="popup-title">¡Invocación exitosa!</h2>
                  <p className="popup-subtitle">
                     Invocaste a {selectedEspiritu?.nombre} con {medium?.nombre}
                  </p>
                  <button onClick={goBack}>Volver</button>
               </div>
            </div>
         )}
         {showPopupError && (
            <div className="popup-overlay">
               <div className="popup-create">
                  <h2 className="popup-title" > Error al invocar espíritu</h2>
                  <p className="popup-subtitle">{selectedEspiritu?.nombre} no pudo ser invocado.</p>
                  <button onClick={() => setShowPopupError(false)}>
                     Intentar con otro espíritu
                  </button>
                  <button onClick={goBack}>Volver</button>
               </div>
            </div>
         )}
      </>
   );
};

const ChooseEspirituCard = ({ espiritu, selected, onClick }) => {
   const espirituImg = getEspirituImg(espiritu.nombre);

   return (
      <div
         className={`choose-espiritu-card ${selected ? "selectedCard" : ""}`}
         onClick={onClick}
      >
         <img
            className="choose-espiritu-img"
            src={espirituImg}
            alt={espiritu.nombre}
         />
         <h2 className="choose-espiritu-nombre">{espiritu.nombre}</h2>
         <p className="choose-espiritu-tipo">{espiritu.tipo}</p>
      </div>
   );
};

export default InvocarEspiritu;
