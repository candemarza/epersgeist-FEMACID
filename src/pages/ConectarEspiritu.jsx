import "./css/ConectarEspiritus.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";

const ConectarEspiritu = () => {
   const params = useParams();
   const [mediumsAvailable, setMediumsAvailable] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({});
   const [espiritu, setEspiritu] = useState({});

   useEffect(() => {
      API.getEspirituById(params.id).then((res) => {
         setEspiritu(res.data);
         API.getMediums().then((mediumsRes) => {
            const filtered = mediumsRes.data.filter(
               (medium) => medium.ubicacion.nombre === res.data.ubicacion.nombre
            );
            setMediumsAvailable(filtered);
            setSelectedMedium(filtered[0]);
         });
      });
   }, []);

   const setSelected = (medium) => {
      setSelectedMedium(medium);
   };

   const handleConectar = () => {
      API.conectarEspiritu(espiritu.id, selectedMedium.id)
         .then(() => {
            alert(`Conectado con ${selectedMedium.nombre}`);
         })
         .catch((error) => {
            console.error("Error al conectar:", error);
            alert("Error al conectar con el medium.");
         });
   }

   return (
      <div className="conectar-espiritu">
         <h1>Elige a tu medium</h1>
         {mediumsAvailable.length === 0 ? (
            <div className="no-mediums">
               <p>No hay mediums disponibles.</p>
            </div>
         ) : (
            <div className="medium-list">
               {mediumsAvailable.map((medium) => (
                  <div
                     key={medium.id}
                     className={`medium-card ${
                        selectedMedium.id === medium.id ? "selected" : ""
                     }`}
                     onClick={() => setSelected(medium)}
                  >
                     <h2>{medium.nombre}</h2>
                     <p>Mana actual: {medium.mana}</p>
                  </div>
               ))}
               <button onClick={handleConectar}>Conectar con {selectedMedium.nombre}</button>
            </div>
         )}
      </div>
   );
};

export default ConectarEspiritu;
