import API from "../service/api";
import "./css/GetAll.css";
import { useEffect, useState } from "react";
import CreateButton from "../components/CreateButton";
import SearchBar from "../components/SearchBar";
import UbicacionesList from "../components/UbicacionesList";
import UbicacionCard from "../components/UbicacionCard";

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

   const setSelected = (ubicacion) => {
        setSelectedUbicacion(ubicacion);
    };


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
                <UbicacionesList ubicaciones={ubicaciones} setSelected={setSelected} selected={selectedUbicacion.id} />
             )}
          </div>
          <div className="cardContainer">
             {ubicaciones.length === 0 ? (
                <div className="ubicacionCard-404">
                   <p>No hay ubicaciones disponibles</p>
                   <button>Crear nueva ubicacion</button>
                </div>
             ) : selectedUbicacion ? (
                <UbicacionCard ubicacion={selectedUbicacion} />
             ) : (
                <div className="ubicacionCard-404">
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
