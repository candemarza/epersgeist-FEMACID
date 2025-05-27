import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const GoBackButton = () => {
   const navigate = useNavigate();
   return (
      <div className="goBack">
         <IoIosArrowBack onClick={() => navigate(-1)} />
      </div>
   );
};

export default GoBackButton;