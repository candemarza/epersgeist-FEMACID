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
   );
};

const UbicacionNotFound = () => {
   return (
      <div className="ubicacionCard-404">
         <h2 className="ubicacionCard-404-title">No existe la ubicacion buscada :( </h2>
         <p className="ubicacionCard-404-sugestion">Prueba buscando otra ubicacion</p>
      </div>
   );
};


export default UbicacionesContent;
