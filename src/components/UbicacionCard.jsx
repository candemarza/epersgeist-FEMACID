import React from "react";
import EditButton from "./EditButton";
import "./css/UbicacionCard.css";
import cementerioImg from "../assets/cementerio.jpg";
import santuarioImg from "../assets/santuario.jpg";
import DeleteButton from "./DeleteButton";

const UbicacionCard = ({ ubicacion }) => {
   const backgroundImage =
      ubicacion.tipo === "Cementerio" ? cementerioImg : santuarioImg;

   return (
      <div
         className="ubicacionCard "
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         <div className="ubicacionCard-buttonContainer">
            <EditButton />
            {/* se pone la card de modo "edit" y te deja ahcer los cambios que quieras nomas, los botones de abajo se convienrten en confirmar/descartar y los de arriba no etsan mas*/}
            <DeleteButton />
            {/* mostrar un etsas seguro? si/no y que ese madne el delete */}
         </div>
         <div className="ubicacionCard-content">
            <h2 className={`ubicacionCard-nombre ${ubicacion.tipo}-top`}>
               {ubicacion.nombre}
            </h2>
            <div className="ubicacionCard-bottomContainer">
               <div className={`ubicacionCard-info ${ubicacion.tipo}-bottom`}>
                  <h3 className="ubicacionCard-id">ID: {ubicacion.id}</h3>
                  <div className="ubicacionCard-flujo-container">
                     <h2 className="ubicacionCard-flujo">Flujo de Energia: </h2>
                     <div className="progress-bar">
                        <div
                           className="progress-bar-fill"
                           style={{ width: `${ubicacion.flujoDeEnergia}%` }}
                        ></div>
                     </div>
                     <p className="ubicacionCard-flujo-porcentaje">
                        {ubicacion.flujoDeEnergia}%
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
      </div>
   );
};
export default UbicacionCard;
