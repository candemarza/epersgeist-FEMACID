import { getDemonioImg } from "./DemoniosMapper";

const DemonCard = ({ id, name, nivelConexion, mediumId }) => {
   const demonImg = getDemonioImg(name, id);
   return (
      <div className="demon-card">
         <img src={demonImg} alt={name} className="demon-card-img" />
         <h3 className="demon-card-name">{name}</h3>
         <p className="demon-card-nivel">Nivel de conexión: {nivelConexion}</p>
         {mediumId ? (
            <p className="demon-card-estadoCivil">Medium: {id}</p>
         ) : (
            <p className="demon-card-estadoCivil">Disponible ;)</p>
         )}
      </div>
   );
};

export default DemonCard;
