import "./css/TipoToggle.css"; // Asegúrate de crear un archivo CSS para los estilos

const TipoToggle = ({ tipo, setTipo, opciones }) => {

   return (
      <div className="create-tipo-container">
         <p className="create-input-label">Tipo</p>
         <div className="tipo-toggle">
            <div className={`tipo-option ${tipo === opciones[0] ? "active" : ""}`}
                onClick={() => setTipo(opciones[0])}>
               {opciones[0]}
            </div>
            <div className={`tipo-option ${tipo === opciones[1] ? "active" : ""}`}
                onClick={() => setTipo(opciones[1])}>
               {opciones[1]}
            </div>
         </div>
      </div>
   );
};

export default TipoToggle;