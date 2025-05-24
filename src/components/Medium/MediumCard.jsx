import "../css/Card.css";
import "../css/MediumCard.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import API from "../../service/api";
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

   const manaPorcentaje = (
      (mediumData.mana * 100) /
      mediumData.manaMax
   ).toFixed(0);

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

   const tieneAngeles = mediumData.espiritus.some(
      (espiritu) => espiritu.tipo === "Angelical"
   );

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
                  <h3 className="card-energia-max">
                     Mana Max: {mediumData.manaMax}
                  </h3>
                  <div className="card-energia-container">
                     <h2 className="card-energia">Mana:</h2>
                     <div className="progress-bar">
                        <div
                           className="progress-bar-fill"
                           style={{
                              width: `${manaPorcentaje}%`,
                           }}
                        ></div>
                     </div>
                     <p className="card-energia-porcentaje">
                        {manaPorcentaje}%
                     </p>
                  </div>
                  {/* <div className="medium-buttonContainer">
                     <button className="card-button">Invocar</button>
                     <button className="card-button">Descansar</button>
                     <button className="card-button">Mover</button>
                     {tieneAngeles && (
                        <button className="card-button">Exorcizar</button>
                     )}
                  </div> */}
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
   const [editedManaMax, setEditedManaMax] = useState(medium.manaMax);
   const [error, setError] = useState("");

   const handleSaveChanges = () => {
      if (editedManaMax < 0) {
         setError("El mana maximo no puede ser menor a 0");
         return;
      }
      if (editedManaMax === "") {
         setError("El mana maximo no puede estar vacio");
         return;
      }
      if (editedManaMax < medium.mana) {
         setError("El mana maximo no puede ser menor al mana actual");
         return;
      }
      if (!editedNombre.trim()) {
         setError("El nombre no puede estar vacio");
         return;
      }

      const updateBodyDTO = {
         nombre: editedNombre,
         manaMax: editedManaMax,
      };

      API.updateMedium(medium.id, updateBodyDTO)
         .then(() => {
            onSave({ ...medium, ...updateBodyDTO });
         })
         .catch(() => {
            setError("Algo malio sal");
         });
   };

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

   return (
      <div
         className="card"
         style={{ backgroundImage: `url(${backgroundImage()})` }}
      >
         <div className="card-buttonContainer">
            <div style={{ height: "50px", width: "50px" }} />
         </div>
         <div className="card-content">
            <input
               className="card-nombre-edit medium-nombre"
               type="text"
               value={editedNombre}
               onChange={(e) => setEditedNombre(e.target.value)}
            />
            <div className="card-bottomContainer">
               <div className="card-info medium-bottom">
                  <h3 className="card-id">ID: {medium.id}</h3>
                  <h3 className="card-id">
                     Ubicacion: {medium.ubicacion.nombre}
                  </h3>
                  <h3 className="card-id">
                     Espiritus: {medium.espiritus.length}
                  </h3>
                  <div className="card-energia-container">
                     <h3 className="card-energia-max">Mana Max:</h3>
                     <input
                        className="card-energia-edit"
                        type="number"
                        value={editedManaMax}
                        onChange={(e) => setEditedManaMax(e.target.value)}
                     />
                  </div>
               </div>
               {error && <div className="error">{error}</div>}
               <div className="medium-buttonContainer">
                  <button className="card-button" onClick={handleSaveChanges}>
                     Guardar cambios
                  </button>
                  <button className="card-button" onClick={onCancel}>
                     Cancelar
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
   <div className="popup-overlay">
      <div className="popup-delete">
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
