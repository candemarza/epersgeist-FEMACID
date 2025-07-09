import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
   const { audioRef } = useOutletContext();

   const goToPage = (page) => {
      navigate(`/${page}`);
   };

   const handleMusicAndGo = () => {
      if (audioRef.current) audioRef.current.play();
      navigate("/demonios");
   };

   return (
      <div>
         <h1>Bienvenido a la página de inicio</h1>

         <button onClick={() => goToPage("ubicaciones")}>Ubicaciones</button>
         <button onClick={() => goToPage("espiritus")}>Espiritus</button>
         <button onClick={() => goToPage("mediums")}>Mediums</button>
         <button onClick={handleMusicAndGo}>Conoce nuestros demonios</button>
         <button onClick={() => goToPage("realidadesParalelas")}> Realidades </button>
      </div>
   );
};
export default Home;
