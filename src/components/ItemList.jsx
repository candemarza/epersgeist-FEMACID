import { FaChurch } from "react-icons/fa";
import { GiHastyGrave } from "react-icons/gi";
import { GiDevilMask } from "react-icons/gi";
import { GiAngelOutfit } from "react-icons/gi";
import { GiSunPriest } from "react-icons/gi";
import "./css/ItemList.css";

const ItemList = ({ items, setSelected, selected }) => {

   const getIconByType = (tipo) => {
      switch (tipo) {
         case "Cementerio":
            return <GiHastyGrave className="items-list-icon" />;
         case "Santuario":
            return <FaChurch className="items-list-icon" />;
         case "Angelical":
            return <GiAngelOutfit className="items-list-icon" />;
         case "Demoniaco":
            return <GiDevilMask className="items-list-icon" />;
         default:
            return <GiSunPriest className="items-list-icon" />;
      }
   };

   return (
      <div className="items-list">
         {items.map((item) => (
            <div
               key={item.id}
               className={`items-list-item ${
                  selected === item.id ? "selected" : ""
               }`}
               onClick={() => setSelected(item)}
            >
               {getIconByType(item.tipo)}
               <h2 className="items-list-nombre">{item.nombre}</h2>
               <h3 className="items-list-id">{item.id}</h3>
            </div>
         ))}
      </div>
   );
};

export default ItemList;
