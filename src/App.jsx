import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ubicaciones from "./pages/Ubicaciones";
import Espiritus from "./pages/Espiritus";
import Mediums from "./pages/Mediums";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/ubicaciones" element={<Ubicaciones />} />
         <Route path="/espiritus" element={<Espiritus />} />
         <Route path="/mediums" element={<Mediums />} />
         <Route path="*" element={<h1>404 Page Not Faound</h1>} />
      </Routes>
   );
}

export default App;
