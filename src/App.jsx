import { Routes, Route, Outlet } from "react-router-dom";
import { useRef } from "react";
import Home from "./pages/Home";
import Ubicaciones from "./pages/Ubicaciones";
import Espiritus from "./pages/Espiritus";
import Mediums from "./pages/Mediums";
import Demonios from "./pages/Demonios";
import music from "./assets/welcome.mp3";

function App() {
   const audioRef = useRef(null);

   return (
      <>
         <audio ref={audioRef} src={music} loop />
         <Routes>
            <Route element={<Outlet context={{ audioRef }} />}>
               <Route path="/" element={<Home />} />
               <Route path="/demonios" element={<Demonios />} />
            </Route>
            <Route path="/ubicaciones" element={<Ubicaciones />} />
            <Route path="/espiritus" element={<Espiritus />} />
            <Route path="/mediums" element={<Mediums />} />
            <Route path="*" element={<h1>404 Page Not Faound</h1>} />
         </Routes>
      </>
   );
}

export default App;
