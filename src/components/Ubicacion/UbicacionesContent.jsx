import UbicacionesList from "./UbicacionesList";
import UbicacionCard from "./UbicacionCard";

const UbicacionesContent = ({
   ubicaciones,
   selectedUbicacion,
   setSelected,
   refreshUbicaciones,
}) => {

   
   return (
      ubicaciones.length === 0 ? (
         <NoUbicaciones />
      ) : (
         <div className="contentContainer">
         <div className="listContainer">
            <UbicacionesList
                  ubicaciones={ubicaciones}
                  setSelected={setSelected}
                  selected={selectedUbicacion?.id}
               />
         </div>
         <div className="cardContainer">
            {selectedUbicacion ? (
               <UbicacionCard
                  ubicacion={selectedUbicacion}
                  onDelete={refreshUbicaciones}
               />
            ) : (
               <UbicacionNotFound />
            )}
         </div>
      </div>
      )
   );
};

const UbicacionNotFound = () => {
   return (
      <div className="ubicacionCard-404">
         <h2>No existe la ubicacion buscada :( </h2>
         <p>Prueba buscando otra ubicacion</p>
      </div>
   );
}

const NoUbicaciones = () => {
   return (
      <div className="ubicacionCard-noUbicaciones">
         <h2>No hay ubicaciones disponibles</h2>
         <p>Prueba creando una nueva ubicacion</p>
      </div>
   );
}

export default UbicacionesContent;
