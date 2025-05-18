import { useEffect, useState } from "react";
import API from "../../service/api";
import { getEspirituImg } from "../../imageMappers/EspiritusMapper";
import "../css/DemonCard.css";

const DemonCard = ({ id, name, mediumId }) => {
   const [meidumName, setMediumName] = useState("");

   useEffect(() => {
      if (mediumId) {
         API.getMediumById(mediumId)
            .then((response) => {
               setMediumName(response.data.nombre);
            })
            .catch(() => {
               setMediumName(null);
            });
      } else {
         setMediumName("");
      }
   }, [mediumId]);

   const demonImg = getEspirituImg(name, id, 'demoniaco');
   return (
      <div className="demon-card">
         <img src={demonImg} alt={name} className="demon-card-img" />
         <h3 className="demon-card-name">{name}</h3>
      
         {mediumId ? (
            <p className="demon-card-estadoCivil">Medium: {meidumName}</p>
         ) : (
            <p className="demon-card-estadoCivil">Disponible ;)</p>
         )}
      </div>
   );
};

export default DemonCard;
