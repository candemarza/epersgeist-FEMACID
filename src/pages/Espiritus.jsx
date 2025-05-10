import API from "../service/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Espiritus = () => {
    const [espiritus, setEspiritus] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        API.getEspiritus().then((res) => {
            setEspiritus(res.data);
        });
    }
    , []);

    return (
        <div className="espiritus">
            <h1>Espiritus</h1>
            <div className="espiritus-list">
                {espiritus.map((espiritu) => (
                    <div key={espiritu.id} className="espiritu-card" >
                        <h2>{espiritu.nombre}</h2>
                        <p>{espiritu.tipo}</p>
                        <p>{espiritu.id}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate("/")}>
                Volver a la página de inicio
            </button>
        </div>
    );
}

export default Espiritus;
