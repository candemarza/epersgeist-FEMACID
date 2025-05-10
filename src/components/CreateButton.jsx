import React from "react";
import "./css/Button.css";

import { BiPlus } from "react-icons/bi";

const CreateButton = ({ onClick }) => {
   return (
      <div className="epers-button" onClick={onClick}>
         <BiPlus className="epers-button-create" />
      </div>
   );
};

export default CreateButton;
