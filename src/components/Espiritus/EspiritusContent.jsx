import ItemList from "../ItemList";
import EspirituCard from "./EspirituCard";

const EspiritusContent = ({
   espiritus,
   selectedEspiritu,
   setSelected,
   refreshEspiritus,
}) => {
   return (
      <div className="contentContainer">
         <div className="listContainer">
            <ItemList
               items={espiritus}
               setSelected={setSelected}
               selected={selectedEspiritu?.id}
            />
         </div>
         <div className="cardContainer">
            {selectedEspiritu ? (
               <EspirituCard
                  espiritu={selectedEspiritu}
                  onDelete={refreshEspiritus}
               />
            ) : (
               <EspirituNotFound />
            )}
         </div>
      </div>
   );
};

const EspirituNotFound = () => {
   return (
      <div className="ubicacionCard-404">
         <h2 className="ubicacionCard-404-title">No existe el espiritu buscado :( </h2>
         <p className="ubicacionCard-404-subtitle">Prueba buscando otro espiritu</p>
      </div>
   );
};


export default EspiritusContent;
