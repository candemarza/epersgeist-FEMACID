import UbicacionesList from "./UbicacionesList";
import UbicacionCard from "./UbicacionCard";

const UbicacionesContent = ({
   ubicaciones,
   selectedUbicacion,
   setSelected,
   refreshUbicaciones,
}) => {
   return (
      <div className="contentContainer">
         <div className="listContainer">
            {ubicaciones.length === 0 ? (
               <>
                  <p>No hay ubicaciones disponibles</p>
                  <button>Crear nueva ubicacion</button>
               </>
            ) : (
               <UbicacionesList
                  ubicaciones={ubicaciones}
                  setSelected={setSelected}
                  selected={selectedUbicacion.id}
               />
            )}
         </div>
         <div className="cardContainer">
            {ubicaciones.length === 0 ? (
               <div className="ubicacionCard-404">
                  <p>No hay ubicaciones disponibles</p>
                  <button>Crear nueva ubicacion</button>
               </div>
            ) : selectedUbicacion ? (
               <UbicacionCard
                  ubicacion={selectedUbicacion}
                  onDelete={refreshUbicaciones}
               />
            ) : (
               <div className="ubicacionCard-404">
                  <p>No existe la ubicacion buscada</p>
                  <button>Crear nueva ubicacion</button>
               </div>
            )}
         </div>
      </div>
   );
};

export default UbicacionesContent;
