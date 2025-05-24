import "../css/Card.css";
import "../css/EspirituCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import demoniacoImg from "../../assets/demoniaco.jpg";
import angelicalImg from "../../assets/angelical.jpg";

const EspirituCard = ({ espiritu, onDelete, onUpdate }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [espirituData, setEspirituData] = useState(espiritu);
   const [meidumName, setMediumName] = useState("");
   const navigate = useNavigate();

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
      onUpdate();
      setEspirituData(updatedEspiritu);
      setIsEditing(false);
   };

   const conectar = () => {
      navigate(`/conectarEspiritu/${espirituData.id}`);
   };

   useEffect(() => {
      if (espirituData.mediumId) {
         API.getMediumById(espirituData.mediumId)
            .then((response) => {
               setMediumName(response.data.nombre);
            })
            .catch(() => {
               setMediumName(null);
            });
      } else {
         setMediumName("");
      }
   }, [espirituData.mediumId]);

   return isEditing ? (
      <EditCard
         espiritu={espirituData}
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
            <h2 className={`card-nombre ${espirituData.tipo}-top`}>
               {espirituData.nombre}
            </h2>
            <div className="card-bottomContainer">
               <div className={`card-info ${espirituData.tipo}-bottom`}>
                  <h3 className="card-id">ID: {espirituData.id}</h3>
                  <h3 className="card-id">
                     Ubicacion: {espirituData.ubicacion.nombre}
                  </h3>
                  {espirituData.mediumId && (
                     <>
                        <h3 className="card-id">Medium: {meidumName}</h3>
                        <div className="card-energia-container">
                           <h2 className="card-energia">Nivel de conexion:</h2>
                           <div className="progress-bar">
                              <div
                                 className="progress-bar-fill"
                                 style={{
                                    width: `${espirituData.nivelDeConexion}%`,
                                 }}
                              ></div>
                           </div>
                           <p className="card-energia-porcentaje">
                              {espirituData.nivelDeConexion}%
                           </p>
                        </div>
                     </>
                  )}
                  {!espirituData.mediumId && (
                     <div className="espiritu-buttonContainer">
                        <button className="card-button" onClick={conectar}>
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
   const [error, setError] = useState("");

   const handleSaveChanges = () => {
      if (!editedNombre.trim()) {
         setError("El nombre no puede estar vacío");
         return;
      }

      const updateBodyDTO = {
         nombre: editedNombre,
      };

      API.updateEspiritu(espiritu.id, updateBodyDTO)
         .then(() => {
            onSave({ ...espiritu, ...updateBodyDTO });
         })
         .catch(() => {
            setError("Algo malio sal");
         });
   };

   const backgroundImage =
      espiritu.tipo === "Demoniaco" ? demoniacoImg : angelicalImg;

   return (
      <div
         className="card"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="card-buttonContainer">
            <div style={{ height: "50px", width: "50px" }} />
         </div>
         <div className="card-content">
            <input
               type="text"
               className={`card-nombre-edit ${espiritu.tipo}-top`}
               value={editedNombre}
               onChange={(e) => setEditedNombre(e.target.value)}
            />
            <div className="card-bottomContainer">
               <div className={`card-info ${espiritu.tipo}-bottom`}>
                  <h3 className="card-id">ID: {espiritu.id}</h3>
                  <h3 className="card-id">
                     Ubicacion: {espiritu.ubicacion.nombre}
                  </h3>
                  {espiritu.mediumId && (
                     <>
                        <h3 className="card-id">Medium: {espiritu.mediumId}</h3>
                        <div className="card-energia-container">
                           <h2 className="card-energia">Nivel de conexion:</h2>
                           <div className="progress-bar">
                              <div
                                 className="progress-bar-fill"
                                 style={{
                                    width: `${espiritu.nivelDeConexion}%`,
                                 }}
                              ></div>
                           </div>
                           <p className="card-energia-porcentaje">
                              {espiritu.nivelDeConexion}%
                           </p>
                        </div>
                     </>
                  )}
               </div>
            </div>
            {error && <div className="error">{error}</div>}
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
      <div className="popup-delete">
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
