import { useState, useEffect } from "react";

const CoordenadaInput = ({ coordenada, setCoordenada }) => {
    const [latitud, setLatitud] = useState(coordenada?.latitud || "");
    const [longitud, setLongitud] = useState(coordenada?.longitud || "");

    useEffect(() => {
        setCoordenada({ latitud, longitud });
    }, [latitud, longitud, setCoordenada]);

    return (
        <div className="popup-input-container">
            <div className="popup-input-coordenadas">
                <p className="popup-input-label">Coordenada</p>
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
            </div>
        </div>
    );
};

export default CoordenadaInput;