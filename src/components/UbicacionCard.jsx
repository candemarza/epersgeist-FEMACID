import React from "react";
import EditButton from "./EditButton";
import "./css/UbicacionCard.css";
import cementerioImg from "../assets/cementerio.jpg";
import santuarioImg from "../assets/santuario.jpg";

const UbicacionCard = ({ ubicacion }) => {
   return (
      <div className="ubicacionCard">
         <EditButton />
         <h3 className="ubicacionCard-id">{ubicacion.id}</h3>
         <h2 className="ubicacionCard-nombre">{ubicacion.nombre}</h2>
         {ubicacion.tipo === "Cementerio" ? (
            <img className="ubicacionCard-tipo-img" src={cementerioImg} alt="Cementerio" />
         ) : (
            <img className="ubicacionCard-tipo-img" src={santuarioImg} alt="Santuario" />
         )}

         <h2 className="ubicacionCard-tipo">{ubicacion.tipo}</h2>
         <h2 className="ubicacionCard-flujo" >{ubicacion.flujoDeEnergia}</h2>
      </div>
   );
};
export default UbicacionCard;
