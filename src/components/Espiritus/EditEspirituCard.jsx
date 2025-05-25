import "../css/Card.css";
import "../css/EspirituCard.css";
import { useState } from "react";
import API from "../../service/api";
import demoniacoImg from "../../assets/demoniaco.jpg";
import angelicalImg from "../../assets/angelical.jpg";

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

export default EditCard;