import "../css/EspirituCard.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import API from "../../service/API";
import demoniacoImg from "../../assets/demoniaco.jpg";
import angelicalImg from "../../assets/angelical.jpg";
import { useEffect, useState } from "react";

const EspirituCard = ({ espiritu, onDelete }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [espirituData, setEspirituData] = useState(espiritu);

   const backgroundImage =
      espirituData.tipo === "Demoniaco" ? demoniacoImg : angelicalImg;

   useEffect(() => {
      setEspirituData(espiritu);
      setIsEditing(false);
   }, [espiritu]);

   const handleDelete = () => {
      API.deleteEspiritu(espirituData.id).then(() => {
         setShowPopup(false);
         onDelete();
      });
   };

   const handleSave = (updatedEspiritu) => {
      setEspirituData(updatedEspiritu);
      setIsEditing(false);
   };

   return isEditing ? (
      <EditCard
         espiritu={espirituData}
         onSave={handleSave}
         onCancel={() => setIsEditing(false)}
      />
   ) : (
      <div
         className="espirituCard"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="espirituCard-buttonContainer">
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setShowPopup(true)} />
         </div>
         <div className="espirituCard-content">
            <h2 className={`espirituCard-nombre ${espirituData.tipo}-top`}>
               {espirituData.nombre}
            </h2>
            <div className="espirituCard-bottomContainer">
               <div className={`espirituCard-info ${espirituData.tipo}-bottom`}>
                  <h3 className="espirituCard-id">ID: {espirituData.id}</h3>
                  <h3 className="espirituCard-id">
                     Ubicacion: {espirituData.ubicacion.nombre}
                  </h3>
                  {espirituData.mediumId && (
                     <>
                        <h3 className="espirituCard-id">
                           Medium: {espirituData.mediumId}
                        </h3>
                        <div className="espirituCard-conexion-container">
                           <h2 className="espirituCard-conexion">
                              Nivel de conexion:
                           </h2>
                           <div className="progress-bar">
                              <div
                                 className="progress-bar-fill"
                                 style={{
                                    width: `${espirituData.nivelDeConexion}%`,
                                 }}
                              ></div>
                           </div>
                           <p className="espirituCard-conexion-porcentaje">
                              {espirituData.nivelDeConexion}%
                           </p>
                        </div>
                     </>
                  )}
                  {!espirituData.mediumId && (
                     <div className="espiritu-buttonContainer">
                        <button className="espirituCard-button">
                           Conectar A
                        </button>
                     </div>
                  )}
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

const EditCard = ({ espiritu, onSave, onCancel }) => {
   const [editedNombre, setEditedNombre] = useState(espiritu.nombre);

   const handleSaveChanges = () => {
      const updateBodyDTO = {
         nombre: editedNombre
      };

      API.updateEspiritu(espiritu.id, updateBodyDTO)
         .then(() => {
            onSave({ ...espiritu, ...updateBodyDTO });
         })
         .catch((error) => {
            console.error("Error al actualizar espiritu:", error);
         });
   };

   const backgroundImage =
      espiritu.tipo === "Demoniaco" ? demoniacoImg : angelicalImg;

   return (
      <div
         className="espirituCard"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="espirituCard-buttonContainer">
            <div style={{ height: "50px", width: "50px" }} />
         </div>
         <div className="espirituCard-content">
            <input
               type="text"
               className={`espirituCard-nombre-edit ${espiritu.tipo}-top`}
               value={editedNombre}
               onChange={(e) => setEditedNombre(e.target.value)}
            />
            <div className="espirituCard-bottomContainer">
               <div className={`espirituCard-info ${espiritu.tipo}-bottom`}>
                  <h3 className="espirituCard-id">ID: {espiritu.id}</h3>
                  <h3 className="espirituCard-id">
                     Ubicacion: {espiritu.ubicacion.nombre}
                  </h3>
                  {espiritu.mediumId && (
                     <>
                        <h3 className="espirituCard-id">
                           Medium: {espiritu.mediumId}
                        </h3>
                        <div className="espirituCard-conexion-container">
                           <h2 className="espirituCard-conexion">
                              Nivel de conexion:
                           </h2>
                           <div className="progress-bar">
                              <div
                                 className="progress-bar-fill"
                                 style={{
                                    width: `${espiritu.nivelDeConexion}%`,
                                 }}
                              ></div>
                           </div>
                           <p className="espirituCard-conexion-porcentaje">
                              {espiritu.nivelDeConexion}%
                           </p>
                        </div>
                     </>
                  )}
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
         <p>¿Estás seguro de que deseas eliminar este espiritu?</p>
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

export default EspirituCard;
