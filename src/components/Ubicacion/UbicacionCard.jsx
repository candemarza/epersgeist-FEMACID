import "../css/UbicacionCard.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import API from "../../service/API";
import cementerioImg from "../../assets/cementerio.jpg";
import santuarioImg from "../../assets/santuario.jpg";
import { useEffect, useState } from "react";

const UbicacionCard = ({ ubicacion, onDelete }) => {
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
      setUbicacionData(updatedUbicacion);
      setIsEditing(false);
   };

   return isEditing ? (
      <EditCard
         ubicacion={ubicacionData}
         onSave={handleSave}
         onCancel={() => setIsEditing(false)}
      />
   ) : (
      <div
         className="ubicacionCard"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="ubicacionCard-buttonContainer">
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setShowPopup(true)} />
         </div>
         <div className="ubicacionCard-content">
            <h2 className={`ubicacionCard-nombre ${ubicacionData.tipo}-top`}>
               {ubicacionData.nombre}
            </h2>
            <div className="ubicacionCard-bottomContainer">
               <div
                  className={`ubicacionCard-info ${ubicacionData.tipo}-bottom`}
               >
                  <h3 className="ubicacionCard-id">ID: {ubicacionData.id}</h3>
                  <div className="ubicacionCard-flujo-container">
                     <h2 className="ubicacionCard-flujo">Flujo de Energia:</h2>
                     <div className="progress-bar">
                        <div
                           className="progress-bar-fill"
                           style={{ width: `${ubicacionData.flujoDeEnergia}%` }}
                        ></div>
                     </div>
                     <p className="ubicacionCard-flujo-porcentaje">
                        {ubicacionData.flujoDeEnergia}%
                     </p>
                  </div>
               </div>
               <div className="ubicacion-buttonContainer">
                  <button className="ubicacionCard-button">Espiritus</button>
                  <button className="ubicacionCard-button">
                     MediumsSinEspiritus
                  </button>
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

const EditCard = ({ ubicacion, onSave, onCancel }) => {
   const [editedNombre, setEditedNombre] = useState(ubicacion.nombre);
   const [editedFlujoDeEnergia, setEditedFlujoDeEnergia] = useState(
      ubicacion.flujoDeEnergia
   );

   const handleSaveChanges = () => {
      const updateBodyDTO = {
         nombre: editedNombre,
         flujoDeEnergia: editedFlujoDeEnergia,
      };

      API.updateUbicacion(ubicacion.id, updateBodyDTO)
         .then(() => {
            onSave({ ...ubicacion, ...updateBodyDTO });
         })
         .catch((error) => {
            console.error("Error al actualizar la ubicación:", error);
         });
   };

   const backgroundImage =
      ubicacion.tipo === "Cementerio" ? cementerioImg : santuarioImg;

   return (
      <div
         className="ubicacionCard"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="ubicacionCard-buttonContainer">
            <div style={{ height: "50px", width: "50px" }} />
         </div>
         <div className="ubicacionCard-content">
            <input
               type="text"
               className={`ubicacionCard-nombre-edit ${ubicacion.tipo}-top`}
               value={editedNombre}
               onChange={(e) => setEditedNombre(e.target.value)}
            />
            <div className="ubicacionCard-bottomContainer">
               <div className={`ubicacionCard-info ${ubicacion.tipo}-bottom`}>
                  <h3 className="ubicacionCard-id">ID: {ubicacion.id}</h3>
                  <div className="ubicacionCard-flujo-container">
                     <h2 className="ubicacionCard-flujo">Flujo de Energia:</h2>
                     <input
                        className={`ubicacionCard-flujo-edit ${ubicacion.tipo}-bottom`}
                        value={editedFlujoDeEnergia}
                        onChange={(e) =>
                           setEditedFlujoDeEnergia(e.target.value)
                        }
                     />
                  </div>
               </div>
            </div>
            <div className="ubicacion-buttonContainer">
               <button className="ubicacionCard-button" onClick={onCancel}>
                  Descartar
               </button>
               <button
                  className="ubicacionCard-button"
                  onClick={handleSaveChanges}
               >
                  Guardar
               </button>
            </div>
         </div>
      </div>
   );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
   <div className="popup-overlay">
      <div className="popup">
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
