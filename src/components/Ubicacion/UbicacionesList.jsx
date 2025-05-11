import { FaChurch } from "react-icons/fa";
import { GiHastyGrave } from "react-icons/gi";
import "../css/UbicacionesList.css";

const UbicacionesList = ({ ubicaciones, setSelected, selected }) => {
   return (
      <div className="ubicaciones-list">
         {ubicaciones.map((ubicacion) => (
            <div
               key={ubicacion.id}
               className={`ubicaciones-list-item ${
                  selected === ubicacion.id ? "selected" : ""
               }`}
               onClick={() => setSelected(ubicacion)}
            >
               {ubicacion.tipo === "Cementerio" ? (
                  <GiHastyGrave className="ubicacion-list-icon" />
               ) : (
                  <FaChurch className="ubicacion-list-icon" />
               )}
               <h2 className="ubicacion-list-nombre">{ubicacion.nombre}</h2>
               <h3 className="ubicacion-list-id">{ubicacion.id}</h3>
            </div>
         ))}
      </div>
   );
};

export default UbicacionesList;
