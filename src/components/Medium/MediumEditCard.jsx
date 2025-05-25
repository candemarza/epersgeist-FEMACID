import "../css/Card.css";
import "../css/MediumCard.css";
import { useState } from "react";
import API from "../../service/api";
import { getMediumImg } from "../../imageMappers/MediumsMapper";


const MediumEditCard = ({ medium, onSave, onCancel }) => {
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

   const mediumImg = getMediumImg(medium.nombre);

   return (
      <div
         className="card"
         style={{ backgroundImage: `url(${mediumImg})` }}
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

export default MediumEditCard;