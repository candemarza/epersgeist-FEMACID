import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const GoHomeButton = () => {
   const navigate = useNavigate();
   return (
      <div className="goBack">
         <IoIosArrowBack onClick={() => navigate('/')} />
      </div>
   );
};

export default GoHomeButton;