import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

const PopUpExorcismo = ({
   IDmediumExorcista,
   angelesExorcistas,
   IDmediumExorcizado,
   demoniosExorcizados,
   onClose,
   onRefresh,
}) => {
   const [mediumExorcista, setMediumExorcista] = useState({});
   const [mediumExorcizado, setMediumExorcizado] = useState({});
   const [angelesExorcistasActuales, setAngelesExorcistasActuales] = useState(
      []
   );
   const [demoniosExorcizadosActuales, setDemoniosExorcizadosActuales] =
      useState([]);
   const navigate = useNavigate();

   const demoniosDe = (medium) => {
      return (
         medium.espiritus?.filter(
            (espiritu) => espiritu.tipo === "Demoniaco"
         ) || []
      );
   };

   const angelesDe = (medium) => {
      return (
         medium.espiritus?.filter(
            (espiritu) => espiritu.tipo === "Angelical"
         ) || []
      );
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
         exorcizadoMsg =
            "¡Exitoso! El medium fue librado de todos sus demonios";
      } else if (demoniosDespues < demoniosAntes) {
         exorcizadoMsg =
            "¡Semi-Exitoso! El medium fue librado de alguno de sus demonios, pero sigue infectado";
      } else {
         exorcizadoMsg =
            "¡Fallido! El medium sigue poseído por todos sus demonios :(";
      }

      let exorcistaMsg = "";
      if (angelesDespues === 0 && angelesAntes > 0) {
         exorcistaMsg = "Te hicieron concha y perdiste todos tus ángeles";
      } else if (angelesDespues < angelesAntes) {
         exorcistaMsg = "Perdiste al menos un ángel en el intento";
      } else {
         exorcistaMsg = "";
      }

      return { exorcizadoMsg, exorcistaMsg };
   };

   const handleSinAngeles = () => {
      onClose();
      navigate(-1);
   };

   const handleExorcismoCompleto = () => {
      onClose();
      onRefresh();
   };

   const { exorcizadoMsg, exorcistaMsg } = getExorcismoResultado();

   return (
      <div className="popup-overlay">
      <div className="popup-create">
         <h2 className="popup-title">Exorcismo realizado</h2>
         <p className="popup-subtitle">
            {mediumExorcista.nombre} exorcizo a {mediumExorcizado.nombre}
         </p>
         <p className="popup-exorcizado-status">{exorcizadoMsg}</p>
         <p className="popup-exorcista-status" >{exorcistaMsg}</p>
         {angelesExorcistasActuales.length === 0 ? (
            <button className="popup-button-exorcismo" onClick={handleSinAngeles}>
               Te quedaste sin ángeles, no puedes seguir exorcizando.
            </button>
         ) : (
            <button className="popup-button-exorcismo" onClick={handleExorcismoCompleto}>
               {demoniosExorcizadosActuales.length === 0
                  ? "El trabajo no está terminado, podés exorcizar a otro medium"
                  : "Intentalo nuevamente"}
            </button>
         ) }
      </div>
      </div>
   );
};

export default PopUpExorcismo;
