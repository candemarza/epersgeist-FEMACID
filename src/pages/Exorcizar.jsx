import "./css/Exorcizar.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/api";


const Exorcizar = () => {
    return (
        <div className="exorcizar">
            <h1 className="exorcizar-title">Elige al medium a exorcizar</h1>
        </div>
    );
}

export default Exorcizar;