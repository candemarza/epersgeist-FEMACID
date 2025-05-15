import DemonCard from './DemonCard';    

const DemoniosContainer = ({ demonios }) => {
   return (
      <div className="demonios-container">
         {Array.isArray(demonios) && demonios.length > 0 ? (
            demonios.map((demonio) => (
               <DemonCard
                  key={demonio.id}
                  id={demonio.id}
                  name={demonio.nombre}
                  nivelConexion={demonio.nivelDeConexion}
                  mediumId={demonio.mediumId}
               />
            ))
         ) : (
            <div className="no-demonios">
               <h2>No hay demonios disponibles</h2>
            </div>
         )}
      </div>
   );
};
export default DemoniosContainer;
