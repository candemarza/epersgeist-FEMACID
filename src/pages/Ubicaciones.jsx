import "./css/GetAll.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import UbicacionesContent from "../components/Ubicacion/UbicacionesContent";
import TipoToggle from "../components/TipoToggle";
import GoHomeButton from "../components/GoHomeButton.jsx";

const Ubicaciones = () => {
   const [ubicaciones, setUbicaciones] = useState([]);
   const [selectedUbicacion, setSelectedUbicacion] = useState({
      id: "",
      nombre: "",
      tipo: "",
      flujoDeEnergia: "",
   });

   const [search, setSearch] = useState("");
   const [showPopup, setShowPopup] = useState(false);
   const { id } = useParams();
   const navigate = useNavigate();

   const handleSearch = (e) => {
      e.preventDefault();
      if (search) {
         API.getUbicacionById(search)
            .then((res) => {
               setSelectedUbicacion(res.data);
               setSearch("");
            })
            .catch(() => {
               setSelectedUbicacion(null);
               setSearch("");
            });
      }
   };

   useEffect(() => {
      API.getUbicaciones().then((res) => {
         setUbicaciones(res.data);
      });
   }, []);

   useEffect(() => {
      if (ubicaciones.length > 0) {
         if (id) {
            const found = ubicaciones.find((e) => String(e.id) === String(id));
            setSelectedUbicacion(found || null);
         } else {
            setSelectedUbicacion(ubicaciones[0]);
         }
      }
   }, [ubicaciones, id]);

   const setSelected = (ubicacion) => {
      setSelectedUbicacion(ubicacion);
      navigate(`/ubicaciones/${ubicacion.id}`);
   };

   const refreshUbicaciones = (ubicacionSeleccionada = null) => {
      API.getUbicaciones().then((res) => {
         setUbicaciones(res.data);
         setSelectedUbicacion(ubicacionSeleccionada || res.data[0]);
      });
   };

   const handleShowCreatePopUp = () => {
      setShowPopup(true);
   };

   const handleCreate = () => {
      setShowPopup(false);
   };

   return (
      <>
         <GoHomeButton />
         {ubicaciones.length === 0 ? (
            <>
               <div className="getAll-noItems">
                  <h2 className="getAll-noItems-title">
                     No hay ubicaciones disponibles :(
                  </h2>
                  <p className="getAll-noItems-subtitle">
                     Prueba creando una ubicacion
                  </p>
                  <CreateButton onClick={handleShowCreatePopUp} />
               </div>
               {showPopup && (
                  <CreatePopUp
                     onCreate={handleCreate}
                     onCancel={() => setShowPopup(false)}
                     setSelected={setSelected}
                     refreshUbicaciones={refreshUbicaciones}
                  />
               )}
            </>
         ) : (
            <>
               <div className="getAllContainer">
                  <div className="searchContainer">
                     <SearchBar
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                     />
                     <CreateButton onClick={handleShowCreatePopUp} />
                  </div>
                  <UbicacionesContent
                     ubicaciones={ubicaciones}
                     selectedUbicacion={selectedUbicacion}
                     setSelected={setSelected}
                     refreshUbicaciones={refreshUbicaciones}
                  />
               </div>
               {showPopup && (
                  <CreatePopUp
                     onCreate={handleCreate}
                     onCancel={() => setShowPopup(false)}
                     setSelected={setSelected}
                     refreshUbicaciones={refreshUbicaciones}
                  />
               )}
            </>
         )}
      </>
   );
};

const CreatePopUp = ({
   onCreate,
   onCancel,
   refreshUbicaciones,
   setSelected,
}) => {
   const [nombre, setNombre] = useState("");
   const [flujoDeEnergia, setFlujoDeEnergia] = useState("");
   const [tipo, setTipo] = useState("Cementerio");
   const [error, setError] = useState("");

   const handleCreate = async () => {
      if (!nombre.trim() || !flujoDeEnergia) {
         setError("Por favor complete todos los campos.");
         return;
      }

      const flujoNum = Number(flujoDeEnergia);
      if (isNaN(flujoNum)) {
         setError("Pedazo de hdp, el flujo de energía debe ser un número.");
         return;
      }
      if (flujoNum < 0) {
         setError("El flujo de energía no puede ser negativo.");
         return;
      }
      if (flujoNum > 100) {
         setError("El flujo de energía no puede ser mayor a 100.");
         return;
      }

      const ubicacionBodyDTO = {
         nombre,
         flujoDeEnergia: flujoNum,
         tipo,
      };

      API.createUbicacion(ubicacionBodyDTO)
         .then((res) => {
            onCreate();
            refreshUbicaciones(res.data);
            setSelected(res.data);
         })
         .catch(() => {
            setError("El nombre de la ubicacion ya esta en uso!");
         });
   };

   return (
      <div className="popup-overlay">
         <div className="popup-create">
            <h2 className="create-title">Crear nueva ubicacion</h2>
            <div className="create-inputs">
               <div className="create-input-container">
                  <p className="create-input-label">Nombre</p>
                  <input
                     type="text"
                     className="create-input"
                     placeholder="Nombre de la ubicacion..."
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                  />
               </div>
               <div className="create-input-container">
                  <p className="create-input-label">Flujo de energía</p>
                  <input
                     type="number"
                     className="create-input"
                     placeholder="Flujo de energia..."
                     value={flujoDeEnergia}
                     onChange={(e) => setFlujoDeEnergia(e.target.value)}
                  />
               </div>
            </div>
            <TipoToggle
               tipo={tipo}
               setTipo={setTipo}
               opciones={["Cementerio", "Santuario"]}
            />
            {error && <div className="error">{error}</div>}
            <div className="popup-buttons">
               <button className="popup-button cancel" onClick={onCancel}>
                  Cancelar
               </button>
               <button className="popup-button confirm" onClick={handleCreate}>
                  Crear
               </button>
            </div>
         </div>
      </div>
   );
};

export default Ubicaciones;
