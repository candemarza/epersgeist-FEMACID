import React from "react";
import art from "../assets/art.jpeg";
import { useEffect, useState } from "react";
import API from "../service/api";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();
    const goToPage = () => {
        navigate(`/ubicaciones`);
    }

    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <button onClick={() => goToPage}>
                Ubicaciones
            </button>    
        </div>
    );
}
export default Home;