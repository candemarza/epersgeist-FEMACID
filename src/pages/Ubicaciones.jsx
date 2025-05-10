import API from "../service/api";
import { useEffect, useState } from "react";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import UbicacionesList from "../components/UbicacionesList";
import "./css/GetAll.css";

const Ubicaciones = () => {
   const [ubicaciones, setUbicaciones] = useState([]);
   const [selectedUbicacion, setSelectedUbicacion] = useState({
      id: "",
      nombre: "",
      tipo: "",
      flujoDeEnergia: "",
   });

   const [search, setSearch] = useState("");

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

   return (
    <div className="getAllContainer">
       <div className="searchContainer">
          <SearchBar
             search={search}
             setSearch={setSearch}
             handleSearch={handleSearch}
          ></SearchBar>
          <CreateButton></CreateButton>
       </div>
       <div className="contentContainer">
          <div className="listContainer">
             {ubicaciones.length === 0 ? (
                <>
                    <p>No hay ubicaciones disponibles</p>
                    <button>Crear nueva ubicacion</button>
                </>
             ) : (
                <UbicacionesList ubicaciones={ubicaciones} />
             )}
          </div>
          <div className="ubicacionCard">
             {ubicaciones.length === 0 ? (
                <div className="ubicacionCard-inexistent">
                   <p>No hay ubicaciones disponibles</p>
                   <button>Crear nueva ubicacion</button>
                </div>
             ) : selectedUbicacion ? (
                <div
                   key={selectedUbicacion.id}
                   className="ubicacionCard-selected"
                >
                   <button>Editar</button>
                   <h2>{selectedUbicacion.nombre}</h2>
                   <h2>{selectedUbicacion.tipo}</h2>
                   <h2>{selectedUbicacion.flujoDeEnergia}</h2>
                   <h3>{selectedUbicacion.id}</h3>
                </div>
             ) : (
                <div className="ubicacionCard-inexistent">
                   <p>No existe la ubicacion buscada</p>
                   <button>Crear nueva ubicacion</button>
                </div>
             )}
          </div>
       </div>
    </div>
 );
};

export default Ubicaciones;
