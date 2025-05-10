import React from "react";
import { GiPirateGrave } from "react-icons/gi";
import { FaChurch } from "react-icons/fa";
import { TbGrave2 } from "react-icons/tb";
import { GiHastyGrave } from "react-icons/gi";
import { MdOutlineChurch } from "react-icons/md";
import { GiChurch } from "react-icons/gi";
import { TbBuildingChurch } from "react-icons/tb";
import { PiChurch } from "react-icons/pi";
import { TbGrave } from "react-icons/tb";
import "./css/UbicacionesList.css";

const UbicacionesList = ({ ubicaciones }) => {
    return (
        <div className="ubicaciones-list">
            {ubicaciones.map((ubicacion) => (
                <div key={ubicacion.id} className="ubicaciones-list-item">
                    {(ubicacion.tipo == "Cementerio" ? <GiHastyGrave className="ubicacion-list-icon" /> : <FaChurch className="ubicacion-list-icon"/>) }
                    <h2 className="ubicacion-list-nombre">{ubicacion.nombre}</h2>
                    <h3 className="ubicacion-list-id">{ubicacion.id}</h3>
                </div>
            ))}
        </div>
    );
};


{/*                 <GiPirateGrave />
                    <TbGrave2 />
                    <GiHastyGrave />
                    <TbGrave />
                    <p></p>
                    <FaChurch />
                    <MdOutlineChurch />
                    <GiChurch />
                    <TbBuildingChurch />
                    <PiChurch /> */}
export default UbicacionesList;