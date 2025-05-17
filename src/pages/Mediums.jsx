import "./css/GetAll.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import MediumContent from "../components/Medium/MediumContent";
import { IoIosArrowBack } from "react-icons/io";

const Mediums = () => {
   const [mediums, setMediums] = useState([]);
   const [selectedMedium, setSelectedMedium] = useState({
      id: "",
      nombre: "",
      tipo: "",
      nivelDeConexion: "",
      mediumId: "",
   });

   const [search, setSearch] = useState("");
   const [showPopup, setShowPopup] = useState(false);

   const navigate = useNavigate();
   const goHome = () => {
      navigate(`/`);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      if (search) {
         API.getMediumById(search)
            .then((res) => {
               setSelectedMedium(res.data);
               setSearch("");
            })
            .catch(() => {
               setSelectedMedium(null);
               setSearch("");
            });
      }
   };

   useEffect(() => {
      API.getMediums().then((res) => {
         setMediums(res.data);
         setSelectedMedium(res.data[0]);
      });
   }, []);

   const setSelected = (medium) => {
      setSelectedMedium(medium);
   };

   const refreshMediums = (selectedMedium = null) => {
      API.getMediums()
         .then((res) => {
            setMediums(res.data);
            setSelectedMedium(selectedMedium || res.data[0]);
         });
   };

   const handleShowCreatePopUp = () => {
      setShowPopup(true);
   };

   const handleCreate = () => {
      setShowPopup(false);
   };

   return mediums.length === 0 ? (
      <>
         <div className="goBack">
            <IoIosArrowBack onClick={goHome} />
         </div>
         <div className="getAll-noItems">
            <h2 className="getAll-noItems-title">
               No hay mediums disponibles :(
            </h2>
            <p className="getAll-noItems-subtitle">Prueba creando un medium</p>
            <CreateButton onClick={handleShowCreatePopUp} />
         </div>
         {showPopup && (
            <CreatePopUp
               onCreate={handleCreate}
               onCancel={() => setShowPopup(false)}
               setSelected={setSelected}
               refreshMediums={refreshMediums}
            />
         )}
      </>
   ) : (
      <>
         <div className="goBack">
            <IoIosArrowBack onClick={goHome} />
         </div>
         <div className="getAllContainer">
            <div className="searchContainer">
               <SearchBar
                  search={search}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
               ></SearchBar>
               <CreateButton onClick={handleShowCreatePopUp} />
            </div>
            <MediumContent
               mediums={mediums}
               selectedMedium={selectedMedium}
               setSelected={setSelected}
               refreshMediums={refreshMediums}
            />
         </div>
         {showPopup && (
            <CreatePopUp
               onCreate={handleCreate}
               onCancel={() => setShowPopup(false)}
               setSelected={setSelected}
               refreshMediums={refreshMediums}
            />
         )}
      </>
   );
};

const CreatePopUp = ({ onCreate, onCancel, refreshMediums, setSelected }) => {
   const [nombre, setNombre] = useState("");
   const [ubicacionID, setUbicacionID] = useState("");
   const [mana, setMana] = useState("");
   const [manaMax, setManaMax] = useState("");
   const [error, setError] = useState("");

   const [ubicaciones, setUbicaciones] = useState([]);

   useEffect(() => {
      API.getUbicaciones().then((res) => {
         setUbicaciones(res.data);
      });
   }, []);

   const handleCreate = () => {
      if (!nombre.trim() || !ubicacionID || !mana || !manaMax) {
         setError("Por favor complete todos los campos.");
         return;
      }
      if (isNaN(mana) || isNaN(manaMax)) {
         setError("Pedazo de hdp, Mana y Mana Max deben ser números.");
         return;
      }
      if (Number(mana) > Number(manaMax)) {
         setError("Mana no puede ser mayor que Mana Max.");
         return;
      }

      if (Number(manaMax) < 0) {
         setError("ManaMax no puede ser negativo.");
         return;
      }
      if (Number(mana) < 0) {
         setError("Mana no puede ser negativo.");
         return;
      }

      const mediumBodyDTO = {
         nombre,
         mana,
         manaMax,
         ubicacionID,
      };

      API.createMedium(mediumBodyDTO)
         .then((res) => {
            onCreate();
            refreshMediums(res.data);
            setSelected(res.data);
         })
         .catch(() => {
             setError("Algo malio sal");
         });
   };

   return (
      <div className="popup-overlay">
         <div className="popup-create">
            <h2 className="create-title">Crear nuevo medium</h2>
            <div className="create-inputs">
               <div className="create-input-container">
                  <p className="create-input-label">Nombre</p>
                  <input
                     type="text"
                     className="create-input"
                     placeholder="Nombre del medium..."
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                  />
               </div>
               <div className="create-input-container">
                  <p className="create-input-label">Ubicación</p>
                  <select
                     className="create-input"
                     value={ubicacionID}
                     onChange={(e) => setUbicacionID(e.target.value)}
                  >
                     <option value="">Selecciona una ubicación...</option>
                     {ubicaciones.map((ubicacion) => (
                        <option key={ubicacion.id} value={ubicacion.id}>
                           {ubicacion.nombre}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <div className="create-inputs">
               <div className="create-input-container">
                  <p className="create-input-label">Mana Max</p>
                  <input
                     type="text"
                     className="create-input"
                     placeholder="Mana Maximo del medium..."
                     value={manaMax}
                     onChange={(e) => setManaMax(e.target.value)}
                  />
               </div>
               <div className="create-input-container">
                  <p className="create-input-label">Mana</p>
                  <input
                     type="text"
                     className="create-input"
                     placeholder="Mana del medium..."
                     value={mana}
                     onChange={(e) => setMana(e.target.value)}
                  />
               </div>
            </div>
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

export default Mediums;
