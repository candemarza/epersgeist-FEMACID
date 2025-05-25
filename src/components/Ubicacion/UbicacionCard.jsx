import "../css/Card.css";
import "../css/UbicacionCard.css";
import { useEffect, useState } from "react";
import API from "../../service/api";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import EditUbicacionCard from "./EditUbicacionCard";
import cementerioImg from "../../assets/cementerio.jpg";
import santuarioImg from "../../assets/santuario.jpg";

const UbicacionCard = ({ ubicacion, onDelete, onUpdate }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [ubicacionData, setUbicacionData] = useState(ubicacion);

   const backgroundImage =
      ubicacionData.tipo === "Cementerio" ? cementerioImg : santuarioImg;

   useEffect(() => {
      setUbicacionData(ubicacion);
      setIsEditing(false);
   }, [ubicacion]);

   const handleDelete = () => {
      API.deleteUbicacion(ubicacionData.id).then(() => {
         setShowPopup(false);
         onDelete();
      });
   };

   const handleSave = (updatedUbicacion) => {
      onUpdate();
      setUbicacionData(updatedUbicacion);
      setIsEditing(false);
   };

   return isEditing ? (
      <EditUbicacionCard
         ubicacion={ubicacionData}
         onSave={handleSave}
         onCancel={() => setIsEditing(false)}
      />
   ) : (
      <div
         className="card"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="card-buttonContainer">
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setShowPopup(true)} />
         </div>
         <div className="card-content">
            <h2 className={`card-nombre ${ubicacionData.tipo}-top`}>
               {ubicacionData.nombre}
            </h2>
            <div className="card-bottomContainer">
               <div
                  className={`card-info ${ubicacionData.tipo}-bottom`}
               >
                  <h3 className="card-id">ID: {ubicacionData.id}</h3>
                  <div className="card-energia-container">
                     <h2 className="card-energia">Flujo de Energia:</h2>
                     <div className="progress-bar">
                        <div
                           className="progress-bar-fill"
                           style={{ width: `${ubicacionData.flujoDeEnergia}%` }}
                        ></div>
                     </div>
                     <p className="card-energia-porcentaje">
                        {ubicacionData.flujoDeEnergia}%
                     </p>
                  </div>
               </div>
               {/* <div className="ubicacion-buttonContainer">
                  <button className="card-button">Espiritus</button>
                  <button className="card-button">
                     MediumsSinEspiritus
                  </button>
               </div> */}
            </div>
         </div>
         {showPopup && (
            <DeletePopUp
               onDelete={handleDelete}
               onCancel={() => setShowPopup(false)}
            />
         )}
      </div>
   );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
   <div className="popup-overlay">
      <div className="popup-delete">
         <p>¿Estás seguro de que deseas eliminar esta ubicacion?</p>
         <div className="popup-buttons">
            <button className="popup-button confirm" onClick={onDelete}>
               Sí
            </button>
            <button className="popup-button cancel" onClick={onCancel}>
               No
            </button>
         </div>
      </div>
   </div>
);

export default UbicacionCard;
