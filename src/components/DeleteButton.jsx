import React from "react";
import "./css/Button.css";

import { IoTrash } from "react-icons/io5";

const DeleteButton = ({ onClick }) => {
    return (
        <div className="epers-button" onClick={onClick}>
           <IoTrash className="epers-button-edit" />
        </div>
    );
}

export default DeleteButton;