import React from "react";
import EditButton from "./EditButton";

const UbicacionCard = ({ ubicacion }) => {
   return (
      <div className="ubicacionCard-selected">
         <EditButton />
         <h2>{ubicacion.nombre}</h2>
         <h2>{ubicacion.tipo}</h2>
         <h2>{ubicacion.flujoDeEnergia}</h2>
         <h3>{ubicacion.id}</h3>
      </div>
   );
};
export default UbicacionCard;
