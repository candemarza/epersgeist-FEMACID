import { Routes, Route, Outlet } from "react-router-dom";
import { useRef } from "react";
import music from "./assets/welcome.mp3";
import Home from "./pages/Home";
import Ubicaciones from "./pages/Ubicaciones";
import Espiritus from "./pages/Espiritus";
import Mediums from "./pages/Mediums";
import Demonios from "./pages/Demonios";
import ConectarAMedium from "./pages/ConectarAMedium";
import InvocarEspiritu from "./pages/InvocarEspiritu";
import Exorcizar from "./pages/Exorcizar";
import Realidades from "./pages/Realidades";
import Realidad from "./pages/Realidad";
import Fog from "./components/Fog";

function App() {
  const audioRef = useRef(null);

  return (
    <>
      <audio ref={audioRef} src={music} loop />

      <Fog />

      <div className="content-wrapper">
        <Routes>
          <Route element={<Outlet context={{ audioRef }} />}>
            <Route path="/" element={<Home />} />
            <Route path="/demonios" element={<Demonios />} />
          </Route>

          <Route path="/ubicaciones" element={<Outlet />}>
            <Route index element={<Ubicaciones />} />
            <Route path=":id" element={<Ubicaciones />} />
          </Route>

          <Route path="/realidadesParalelas" element={<Outlet />}>
            <Route index element={<Realidades />} />
            <Route path=":id" element={<Realidad />} />
          </Route>

          <Route path="/espiritus" element={<Outlet />}>
            <Route index element={<Espiritus />} />
            <Route path=":id" element={<Espiritus />} />
            <Route path=":id/conectarAMedium" element={<ConectarAMedium />} />
          </Route>

          <Route path="/mediums" element={<Outlet />}>
            <Route index element={<Mediums />} />
            <Route path=":id" element={<Mediums />} />
            <Route path=":id/invocarEspiritu" element={<InvocarEspiritu />} />
            <Route path=":id/exorcizar" element={<Exorcizar />} />
          </Route>

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
