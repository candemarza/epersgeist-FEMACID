import API from "../service/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.getUbicaciones().then((res) => {
            setUbicaciones(res.data);
        });
    }
    , []);

    return (
        <div className="ubicaciones">
            <h1>Ubicaciones</h1>
            <div className="ubicaciones-list">
                {ubicaciones.map((ubicacion) => (
                    <div key={ubicacion.id} className="ubicacion-card" >
                        <h2>{ubicacion.nombre}</h2>
                        <p>{ubicacion.tipo}</p>
                        <p>{ubicacion.id}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate("/")}>
                Volver a la página de inicio
            </button>
        </div>
    );
}

export default Ubicaciones;
