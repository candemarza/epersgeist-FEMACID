import { useState, useEffect } from "react";
import API from "../service/api";

const PopUpExorcismo = ({
   IDmediumExorcista,
   angelesExorcistas,
   IDmediumExorcizado,
   demoniosExorcizados,
}) => {
   const [mediumExorcista, setMediumExorcista] = useState({});
   const [mediumExorcizado, setMediumExorcizado] = useState({});
const [angelesExorcistasActuales, setAngelesExorcistasActuales] = useState([]);
const [demoniosExorcizadosActuales, setDemoniosExorcizadosActuales] = useState([]);

const demoniosDe = (medium) => {
   return medium.espiritus?.filter(
      (espiritu) => espiritu.tipo === "Demoniaco"
   ) || [];
};

const angelesDe = (medium) => {
   return medium.espiritus?.filter(
      (espiritu) => espiritu.tipo === "Angelical"
   ) || [];
};

useEffect(() => {
   API.getMediumById(IDmediumExorcista).then((res) => {
      setMediumExorcista(res.data);
      setAngelesExorcistasActuales(angelesDe(res.data));
   });
   API.getMediumById(IDmediumExorcizado).then((res) => {
      setMediumExorcizado(res.data);
      setDemoniosExorcizadosActuales(demoniosDe(res.data));
   });
}, [IDmediumExorcista, IDmediumExorcizado]);

const getExorcismoResultado = () => {
   const demoniosAntes = demoniosExorcizados.length;
   const demoniosDespues = demoniosExorcizadosActuales.length;

   const angelesAntes = angelesExorcistas.length;
   const angelesDespues = angelesExorcistasActuales.length;

   let exorcizadoMsg = "";
   if (demoniosDespues === 0) {
      exorcizadoMsg = "¡Exitoso! El medium fue librado de todos sus demonios";
   } else if (demoniosDespues < demoniosAntes) {
      exorcizadoMsg = "¡Semi-Exitoso! El medium fue librado de alguno de sus demonios, pero sigue infectado";
   } else {
      exorcizadoMsg = "¡Fallido! El medium sigue poseído por todos sus demonios :(";
   }

   let exorcistaMsg = "";
   if (angelesDespues === 0 && angelesAntes > 0) {
      exorcistaMsg = "Te hicieron concha y perdiste todos tus ángeles";
   } else if (angelesDespues < angelesAntes) {
      exorcistaMsg = "Perdiste al menos un ángel en el intento";
   } else {
      exorcistaMsg = "";
   }

   return { exorcizadoMsg, exorcistaMsg};
};

const { exorcizadoMsg, exorcistaMsg} = getExorcismoResultado();

   return (
      <div className="popup-exorcismo">
      <h2>Exorcismo realizado</h2>
      <p>{mediumExorcista.nombre} exorcizo a {mediumExorcizado.nombre}</p>
      <p>{exorcizadoMsg}</p>
      <p>{exorcistaMsg}</p>
      {angelesExorcistasActuales.length === 0 ? (
         <p>Te quedaste sin ángeles, intenta con otro medium.</p>
         //navigate(-1);
      ) : demoniosExorcizadosActuales.length === 0 ? (
         <p>El trabajo no esta termindado, podes exorcizar a otro medium</p>
         //closePopup, y refresh de mediums list en exorcizar.jsx
      ) : (
         <p>No te rindas, intenta nuevamente</p>
         //closePopup, y refresh de mediums list en exorcizar.jsx
      )}
    </div>
   );
};

export default PopUpExorcismo;
