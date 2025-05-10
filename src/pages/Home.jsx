import React from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();
    const goToPage = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <button onClick={() => goToPage("ubicaciones")}>
                Ubicaciones
            </button>
            <button onClick={() => goToPage("espiritus")}>
                Espiritus
            </button>
            <button onClick={() => goToPage("mediums")}>
                Mediums
            </button>    
        </div>
    );
}
export default Home;