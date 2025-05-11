import API from "../service/API";
import "./css/GetAll.css";
import { useEffect, useState } from "react";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import UbicacionesContent from "../components/Ubicacion/UbicacionesContent";
import TipoToggle from "../components/TipoToggle";

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

   const handleSearch = (e) => {
      e.preventDefault();
      if (search) {
         API.getUbicacionById(search)
            .then((res) => {
               setSelectedUbicacion(res.data);
            })
            .catch(() => {
               setSelectedUbicacion(null);
            });
      }
   };

   useEffect(() => {
      API.getUbicaciones().then((res) => {
         setUbicaciones(res.data);
         setSelectedUbicacion(res.data[0]);
      });
   }, []);

   const setSelected = (ubicacion) => {
      setSelectedUbicacion(ubicacion);
   };

   const refreshUbicaciones = (ubicacionSeleccionada = null) => {
      API.getUbicaciones()
         .then((res) => {
            setUbicaciones(res.data);
            setSelectedUbicacion(ubicacionSeleccionada || res.data[0]);
         })
         .catch((error) => {
            console.error("Error al cargar las ubicaciones:", error);
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
         <div className="getAllContainer">
            <div className="searchContainer">
               <SearchBar
                  search={search}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
               ></SearchBar>
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

   const handleCreate = () => {
      const ubicacionBodyDTO = {
         nombre,
         flujoDeEnergia,
         tipo,
      };

      API.createUbicacion(ubicacionBodyDTO)
         .then((res) => {
            onCreate();
            refreshUbicaciones(res.data);
            setSelected(res.data);
         })
         .catch((error) => {
            console.error("Error al crear la ubicación:", error);
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
            <TipoToggle tipo={tipo} setTipo={setTipo} opciones={["Cementerio", "Santuario"]} />
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
