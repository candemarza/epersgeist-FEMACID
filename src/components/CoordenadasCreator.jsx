import { useState } from "react";

const CoordenadasCreator = ({ coordenadas, setCoordenadas }) => {
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    
    const handleAddCoordenada = () => {
        if (latitud.trim() === "" || longitud.trim() === "") {
            return;
        }
        setCoordenadas([...coordenadas, { latitud, longitud }]);
        setLatitud("");
        setLongitud("");
    };
    
    const handleRemoveCoordenada = (index) => {
        const newCoordenadas = [...coordenadas];
        newCoordenadas.splice(index, 1);
        setCoordenadas(newCoordenadas);
    };
    
    return (
        <div className="popup-input-container">
            <div className="popup-input-coordenadas">
            <p className="popup-input-label">Coordenadas (al menos 3)</p>
            <input
                type="text"
                className="popup-input"
                placeholder="Latitud..."
                value={latitud}
                onChange={(e) => setLatitud(e.target.value)}
            />
            <input
                type="text"
                className="popup-input"
                placeholder="Longitud..."
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
            />
            <button
                className="popup-button add"
                onClick={handleAddCoordenada}
                disabled={!latitud || !longitud}
            >
                Agregar
            </button>
            </div>
            <ul className="coordenadas-list">
                {coordenadas.map((coord, index) => (
                    <li key={index} className="coordenada-item">
                        Lat: {coord.latitud}, Lng: {coord.longitud}
                        <button
                            className="popup-button remove"
                            onClick={() => handleRemoveCoordenada(index)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoordenadasCreator;