import "./css/Button.css";

import { BiSolidPencil } from "react-icons/bi";

const EditButton = ({ onClick }) => {
    return (
        <div className="epers-button" onClick={onClick}>
           <BiSolidPencil className="epers-button-edit" />
        </div>
    );
}

export default EditButton;