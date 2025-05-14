import "../css/Card.css";
import "../css/Card.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import API from "../../service/API";
import mediumImg from "../../assets/medium.png";
import lolo from "../../assets/lolo.png";
import olol from "../../assets/olol.png";
import { useEffect, useState } from "react";

const MediumCard = ({ medium, onDelete, onUpdate }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [mediumData, setMediumData] = useState(medium);

   const backgroundImage = () => {
         switch (medium.nombre.toLowerCase()) {
            case "lolo":
               return lolo;
            case "olol":
               return olol;
            default:
               return mediumImg;
         }
      };

   useEffect(() => {
      setMediumData(medium);
      setIsEditing(false);
   }, [medium]);

   const handleDelete = () => {
      API.deleteMedium(mediumData.id).then(() => {
         setShowPopup(false);
         onDelete();
      });
   };

   const handleSave = (updatedMedium) => {
      setMediumData(updatedMedium);
      setIsEditing(false);
      onUpdate();
   };

   return isEditing ? (
      <EditCard
         medium={mediumData}
         onSave={handleSave}
         onCancel={() => setIsEditing(false)}
      />
   ) : (
      <div
         className="card"
         style={{ backgroundImage: `url(${backgroundImage()})` }}
      >
         <div className="card-buttonContainer">
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setShowPopup(true)} />
         </div>
         <div className="card-content">
            <h2 className="card-nombre medium-nombre">{mediumData.nombre}</h2>
            <div className="card-bottomContainer">
               <div className="card-info medium-bottom">
                  <h3 className="card-id">ID: {mediumData.id}</h3>
                  <h3 className="card-id">
                     Ubicacion: {mediumData.ubicacion.nombre}
                  </h3>

                  <h3 className="card-id">
                     Espiritus: {mediumData.espiritus.length}
                  </h3>
                  <div className="card-energia-container">
                     <h2 className="card-energia">
                        Mana Max: {mediumData.manaMax}
                     </h2>
                     <h2 className="card-energia">Mana:</h2>
                     <div className="progress-bar">
                        <div
                           className="progress-bar-fill"
                           style={{
                              width: `${mediumData.mana}%`,
                           }}
                        ></div>  {/* Cambia al valor de manaMax/100 a lo que corresponda */}
                     </div>
                     <p className="card-energia-porcentaje">
                        {mediumData.mana}%
                     </p>
                  </div>

                  <div className="medium-buttonContainer">
                     <button className="card-button">Conectar A</button>
                  </div>
               </div>
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

const EditCard = ({ medium, onSave, onCancel }) => {
   const [editedNombre, setEditedNombre] = useState(medium.nombre);

   const handleSaveChanges = () => {
      const updateBodyDTO = {
         nombre: editedNombre,
      };

      API.updateMedium(medium.id, updateBodyDTO)
         .then(() => {
            onSave({ ...medium, ...updateBodyDTO });
         })
         .catch((error) => {
            console.error("Error al actualizar medium:", error);
         });
   };

   const backgroundImage =
      medium.tipo === "Demoniaco" ? demoniacoImg : angelicalImg;

   return (
      <>
         <h1>edit</h1>
      </>
   );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
   <div className="popup-overlay">
      <div className="popup">
         <p>¿Estás seguro de que deseas eliminar este medium?</p>
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

export default MediumCard;
