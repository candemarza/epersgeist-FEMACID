import "./css/Exorcizar.css";
import "../components/css/MediumCard.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import { getMediumImg } from "../imageMappers/MediumsMapper";
import PopUpExorcismo from "../components/PopUpExorcismo";
import Carousel from "../components/Carousel";
import GoBackButton from "../components/GoBackButton";

const Exorcizar = () => {
   const { id } = useParams();
   const [mediumExorcista, setMediumExorcista] = useState({});
   const [mediums, setMediums] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({});
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
      API.getMediumById(id).then((res) => {
         setMediumExorcista(res.data);

         API.getMediums().then((response) => {
            const filtered = response.data.filter(
               (medium) =>
                  medium.ubicacion.nombre === res.data.ubicacion.nombre &&
                  medium.id !== res.data.id &&
                  demoniosDe(medium).length > 0
            );
            setMediums(filtered);
            setSelectedMedium(filtered[0]);
         });
      });
   }, [id]);

   const onRefresh = () => {
      API.getMediums().then((response) => {
         const filtered = response.data.filter(
            (medium) =>
               medium.ubicacion.nombre === mediumExorcista.ubicacion.nombre &&
               medium.id !== mediumExorcista.id &&
               demoniosDe(medium).length > 0
         );
         setMediums(filtered);
         setSelectedMedium(filtered[0]);
      });
   };

   const demoniosDe = (medium) => {
      return medium.espiritus.filter(
         (espiritu) => espiritu.tipo === "Demoniaco"
      );
   };

   const angelesDe = (medium) => {
      return medium.espiritus.filter(
         (espiritu) => espiritu.tipo === "Angelical"
      );
   };

   const exorcizar = () => {
      API.exorcizar(mediumExorcista.id, selectedMedium.id).then(() => {
         setShowPopup(true);
      });
   };

   return (
      <div>
        <GoBackButton />
         <h1 className="exorcizar-title">Elige al medium a exorcizar</h1>
         {mediums.length === 0 ? (
            <div className="no-mediums">
               <p>No hay mediums disponibles para exorcizar.</p>
            </div>
         ) : (
            <>
               <Carousel
                  items={mediums}
                  selected={selectedMedium}
                  setSelected={setSelectedMedium}
                  renderItem={({ item, selected, onClick }) => (
                     <ChooseExorcizarCard
                        medium={item}
                        key={item.id}
                        selected={selected}
                        onClick={onClick}
                        demonios={demoniosDe(item).length}

                     />
                  )}
               />
               <button onClick={exorcizar}>
                  Exorcizar a {selectedMedium.nombre}
               </button>
            </>
         )}
         {showPopup && (
            <PopUpExorcismo
               IDmediumExorcista={mediumExorcista.id}
               angelesExorcistas={angelesDe(mediumExorcista)}
               IDmediumExorcizado={selectedMedium.id}
               demoniosExorcizados={demoniosDe(selectedMedium)}
               onClose={() => setShowPopup(false)}
               onRefresh={onRefresh}
            />
         )}
      </div>
   );
};

const ChooseExorcizarCard = ({ medium, selected, onClick, demonios }) => {
   const mediumImg = getMediumImg(medium.nombre);

   return (
      <div
         key={medium.id}
         className={`choose-medium-card ${selected ? "selectedCard" : ""}`}
         onClick={onClick}
      >
         <img
            className="choose-medium-img"
            src={mediumImg}
            alt={medium.nombre}
         />
         <h2 className="choose-medium-nombre">{medium.nombre}</h2>
         <h2 className="choose-medium-mana">Mana: {medium.mana}</h2>
         <h2 className="choose-medium-espiritus">Demonios: {demonios}</h2>
      </div>
   );
};

export default Exorcizar;
