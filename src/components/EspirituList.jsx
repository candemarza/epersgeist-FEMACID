import { GiDevilMask } from "react-icons/gi";
import { GiAngelOutfit } from "react-icons/gi";
import "./css/EspirituList.css";

const EspirituList = ({ items }) => {

   const getIconByType = (tipo) => {
      switch (tipo) {
        case "Angelical":
            return <GiAngelOutfit className="items-list-icon" />;
         case "Demoniaco":
            return <GiDevilMask className="items-list-icon" />;
      }
   };

   return (
      <div className="espiritu-list">
         <h2>Espíritus en esta realidad</h2>
         {items.map((item) => (
            <div
               key={item.id}
               className={"espiritu-list-item"}
            >
               {getIconByType(item.tipo)}
               <h2 className="espiritu-list-nombre">{item.nombre}</h2>
            </div>
         ))}
      </div>
   );
};

export default EspirituList;
