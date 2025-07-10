import { useNavigate, useOutletContext } from "react-router-dom";
import "./css/Home.css";
import background from "../assets/bg.png";

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
    <div className="home-container">
      <div
        className="home-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="home-content">
          <h1 className="home-title">Bienvenidas a Epersgeist</h1>

          <div className="button-group">
            <button onClick={() => goToPage("ubicaciones")}>Ubicaciones</button>
            <button onClick={() => goToPage("espiritus")}>Espíritus</button>
            <button onClick={() => goToPage("mediums")}>Mediums</button>
            <button onClick={() => goToPage("realidadesParalelas")}>
              Realidades
            </button>
          </div>
          <button className="button-infierno" onClick={handleMusicAndGo}>
            <span className="glitch-text">I̵̘̦̫͈͇̥̦̙̩̬̿̈̈́͌̐͛́͊̚ͅN̸̨̛̲̫̙͂́̎F̸̣̼̦̈͑́̽̊I̶͖̮̝̳̐Ȇ̸͓̟͔̙̖͔̰͍̖̞͋̔̓͌͂͘͜͝͝Ȓ̷̨̢̞̀͆̐̕Ņ̷̪̲͈͈̫̥̿̐́͘O̵̙͇̐̓͘</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
