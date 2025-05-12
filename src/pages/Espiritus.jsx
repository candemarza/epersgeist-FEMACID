import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import API from "../service/api" 
import { useNavigate } from "react-router-dom";
import EspiritusContent from "../components/Espiritus/EspiritusContent";
import { IoIosArrowBack } from "react-icons/io";

const Espiritus = () => {
   const [espiritus, setEspiritus] = useState([]);
   const [selectedEspiritu, setSelectedEspiritu] = useState({
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
         setSelectedEspiritu(res.data[0]);
      });
   }, []);

   const setSelected = (espiritu) => {
      setSelectedEspiritu(espiritu);
   };

   const refreshEspiritus = ( selectedEspiritu = null) => {
      API.getUbicaciones()
         .then((res) => {
            setEspiritu(res.data);
            setSelectedEspiritu(selectedEspiritu || res.data[0]);
         })
         .catch((error) => {
            console.error("Error al cargar los Espiritus:", error);
         });
   };

   const handleShowCreatePopUp = () => {
      setShowPopup(true);
   };

   const handleCreate = () => {
      setShowPopup(false);
   };

   return espiritus.length === 0 ? (
      <>
         <div className="goBack">
            <IoIosArrowBack onClick={goHome} />
         </div>
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

export default Espiritus;
