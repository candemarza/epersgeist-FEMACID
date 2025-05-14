import ItemList from "../ItemList";
import MediumCard from "./MediumCard";

const MediumsContent = ({
   mediums,
   selectedMedium,
   setSelected,
   refreshMediums,
}) => {
   return (
      <div className="contentContainer">
         <div className="listContainer">
            <ItemList
               items={mediums}
               setSelected={setSelected}
               selected={selectedMedium?.id}
            />
         </div>
         <div className="cardContainer">
            {selectedMedium ? (
               <MediumCard
                  medium={selectedMedium}
                  onDelete={refreshMediums}
                  onUpdate={refreshMediums}
               />
            ) : (
               <MediumNotFound />
            )}
         </div>
      </div>
   );
};

const MediumNotFound = () => {
   return (
      <div className="ubicacionCard-404">
         <h2 className="ubicacionCard-404-title">No existe el medium buscado :( </h2>
         <p className="ubicacionCard-404-subtitle">Prueba buscando otro medium</p>
      </div>
   );
};


export default MediumsContent;
