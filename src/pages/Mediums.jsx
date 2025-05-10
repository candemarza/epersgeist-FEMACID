import API from "../service/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mediums = () => {
    const [mediums, setMediums] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        API.getMediums().then((res) => {
            setMediums(res.data);
        });
    }
    , []);

    return (
        <div className="mediums">
            <h1>Mediums</h1>
            <div className="mediums-list">
                {mediums.map((medium) => (
                    <div key={medium.id} className="medium-card" >
                        <h2>{medium.nombre}</h2>
                        <p>{medium.mana}</p>
                        <p>{medium.id}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate("/")}>
                Volver a la página de inicio
            </button>
        </div>
    );
}

export default Mediums;
