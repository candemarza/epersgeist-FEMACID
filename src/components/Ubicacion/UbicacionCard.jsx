import "../css/Card.css";
import "../css/UbicacionCard.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import API from "../../service/api";
import cementerioImg from "../../assets/cementerio.jpg";
import santuarioImg from "../../assets/santuario.jpg";
import { useEffect, useState } from "react";

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
      <EditCard
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

const EditCard = ({ ubicacion, onSave, onCancel }) => {
   const [editedNombre, setEditedNombre] = useState(ubicacion.nombre);
   const [editedFlujoDeEnergia, setEditedFlujoDeEnergia] = useState(
      ubicacion.flujoDeEnergia
   );
   const [error, setError] = useState("");

   const handleSaveChanges = () => {
      if (!editedFlujoDeEnergia) {
         setError("El flujo de energia no puede estar vacio");
         return;
      }
      if (editedFlujoDeEnergia < 0 ) {
         setError("El flujo de energia no puede ser negativo");
         return;
      }
      if (editedFlujoDeEnergia > 100) {
         setError("El flujo de energia no puede ser mayor a 100");
         return;
      }
      if (!editedNombre.trim()) {
         setError("El nombre no puede estar vacio");
         return;
      }
      const updateBodyDTO = {
         nombre: editedNombre,
         flujoDeEnergia: editedFlujoDeEnergia,
      };

      API.updateUbicacion(ubicacion.id, updateBodyDTO)
         .then(() => {
            onSave({ ...ubicacion, ...updateBodyDTO });
         })
         .catch(() => {
            setError("El nombre de la ubicacion ya existe");
         });
   };

   const backgroundImage =
      ubicacion.tipo === "Cementerio" ? cementerioImg : santuarioImg;

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
               className={`card-nombre-edit ${ubicacion.tipo}-top ${ubicacion.tipo}-edit`}
               value={editedNombre}
               onChange={(e) => setEditedNombre(e.target.value)}
            />
            <div className="card-bottomContainer">
               <div className={`card-info ${ubicacion.tipo}-bottom`}>
                  <h3 className="card-id">ID: {ubicacion.id}</h3>
                  <div className="card-energia-container">
                     <h2 className="card-energia">Flujo de Energia:</h2>
                     <input
                        className={`card-energia-edit ${ubicacion.tipo}-bottom`}
                        value={editedFlujoDeEnergia}
                        onChange={(e) =>
                           setEditedFlujoDeEnergia(e.target.value)
                        }
                     />
                  </div>
               </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="ubicacion-buttonContainer">
               <button className="card-button" onClick={onCancel}>
                  Descartar
               </button>
               <button
                  className="card-button"
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
