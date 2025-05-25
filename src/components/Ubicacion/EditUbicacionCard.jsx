import "../css/Card.css";
import "../css/UbicacionCard.css";
import { useState } from "react";
import API from "../../service/api";
import cementerioImg from "../../assets/cementerio.jpg";
import santuarioImg from "../../assets/santuario.jpg";


const EditUbicacionCard = ({ ubicacion, onSave, onCancel }) => {
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

export default EditUbicacionCard;