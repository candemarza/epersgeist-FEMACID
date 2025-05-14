import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import API from "../service/api";
import { useNavigate } from "react-router-dom";
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
         API.getUbicacionById(search)
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
         })
         .catch((error) => {
            console.error("Error al cargar los Mediums:", error);
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
               refreshUbicaciones={refreshUbicaciones}
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
            <TipoToggle
               tipo={tipo}
               setTipo={setTipo}
               opciones={["Cementerio", "Santuario"]}
            />
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
