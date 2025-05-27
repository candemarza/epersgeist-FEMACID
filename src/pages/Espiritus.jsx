import "./css/GetAll.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../service/api";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import EspiritusContent from "../components/Espiritus/EspiritusContent";
import TipoToggle from "../components/TipoToggle";
import GoBackButton from "../components/GoBackButton";

const Espiritus = () => {
   const [espiritus, setEspiritus] = useState([]);
   const { id } = useParams();
   const [selectedEspiritu, setSelectedEspiritu] = useState(null);

   const [search, setSearch] = useState("");
   const [showPopup, setShowPopup] = useState(false);

   const navigate = useNavigate();
   const goHome = () => {
      navigate(`/`);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      if (search) {
         API.getEspirituById(search)
            .then((res) => {
               setSelectedEspiritu(res.data);
               setSearch("");
            })
            .catch(() => {
               setSelectedEspiritu(null);
               setSearch("");
            });
      }
   };

   useEffect(() => {
      API.getEspiritus().then((res) => {
         setEspiritus(res.data);
      });
   }, []);

   useEffect(() => {
      if (espiritus.length > 0) {
         if (id) {
            const found = espiritus.find((e) => String(e.id) === String(id));
            setSelectedEspiritu(found || null);
         } else {
            setSelectedEspiritu(espiritus[0]);
         }
      }
   }, [espiritus, id]);

   const setSelected = (espiritu) => {
      setSelectedEspiritu(espiritu);
      navigate(`/espiritus/${espiritu.id}`);
   };

   const refreshEspiritus = (selectedEspiritu = null) => {
      API.getEspiritus().then((res) => {
         setEspiritus(res.data);
         setSelectedEspiritu(selectedEspiritu || res.data[0]);
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
         <GoBackButton />
         {espiritus.length === 0 ? (
            <>
               <div className="getAll-noItems">
                  <h2 className="getAll-noItems-title">
                     No hay espiritus disponibles :(
                  </h2>
                  <p className="getAll-noItems-subtitle">
                     Prueba creando un espiritu
                  </p>
                  <CreateButton onClick={handleShowCreatePopUp} />
               </div>
               {showPopup && (
                  <CreatePopUp
                     onCreate={handleCreate}
                     onCancel={() => setShowPopup(false)}
                     setSelected={setSelected}
                     refreshEspiritus={refreshEspiritus}
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
                  <EspiritusContent
                     espiritus={espiritus}
                     selectedEspiritu={selectedEspiritu}
                     setSelected={setSelected}
                     refreshEspiritus={refreshEspiritus}
                  />
               </div>
               {showPopup && (
                  <CreatePopUp
                     onCreate={handleCreate}
                     onCancel={() => setShowPopup(false)}
                     setSelected={setSelected}
                     refreshEspiritus={refreshEspiritus}
                  />
               )}
            </>
         )}
      </>
   );
};

const CreatePopUp = ({ onCreate, onCancel, refreshEspiritus, setSelected }) => {
   const [nombre, setNombre] = useState("");
   const [ubicacionID, setUbicacionID] = useState("");
   const [tipo, setTipo] = useState("Demoniaco");
   const [error, setError] = useState("");

   const [ubicaciones, setUbicaciones] = useState([]);

   useEffect(() => {
      API.getUbicaciones().then((res) => {
         setUbicaciones(res.data);
      });
   }, []);

   const handleCreate = () => {
      if (!nombre.trim() || !ubicacionID) {
         setError("Por favor complete todos los campos.");
         return;
      }

      const espirituBodyDTO = {
         nombre,
         ubicacionID,
         tipo,
      };

      API.createEspiritu(espirituBodyDTO)
         .then((res) => {
            onCreate();
            refreshEspiritus(res.data);
            setSelected(res.data);
         })
         .catch(() => {
            setError("malio sal");
         });
   };

   return (
      <div className="popup-overlay">
         <div className="popup-create">
            <h2 className="create-title">Crear nuevo espiritu</h2>
            <div className="create-inputs">
               <div className="create-input-container">
                  <p className="create-input-label">Nombre</p>
                  <input
                     type="text"
                     className="create-input"
                     placeholder="Nombre del espiritu..."
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                  />
               </div>
               <div className="create-input-container">
                  <p className="create-input-label">Ubicación</p>
                  <select
                     className="create-input select"
                     value={ubicacionID}
                     onChange={(e) => setUbicacionID(e.target.value)}
                  >
                     <option className="select-option" value="">
                        Selecciona una ubicación...
                     </option>
                     {ubicaciones.map((ubicacion) => (
                        <option key={ubicacion.id} value={ubicacion.id}>
                           {ubicacion.nombre}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <TipoToggle
               tipo={tipo}
               setTipo={setTipo}
               opciones={["Demoniaco", "Angelical"]}
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

export default Espiritus;
