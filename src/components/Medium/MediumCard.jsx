import "../css/Card.css";
import "../css/MediumCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import MediumEditCard from "./MediumEditCard";
import { getMediumImg } from "../../imageMappers/MediumsMapper";

const MediumCard = ({ medium, onDelete, onUpdate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mediumData, setMediumData] = useState(medium);
  const navigate = useNavigate();

  const mediumImg = getMediumImg(mediumData.nombre);

  const manaPorcentaje = ((mediumData.mana * 100) / mediumData.manaMax).toFixed(
    0
  );

  useEffect(() => {
    setMediumData(medium);
    setIsEditing(false);
  }, [medium]);

  const handleDelete = () => {
    API.deleteMedium(mediumData.id).then(() => {
      setShowPopup(false);
      onDelete();
    });
  };

  const handleSave = (updatedMedium) => {
    setMediumData(updatedMedium);
    setIsEditing(false);
    onUpdate();
  };

  const tieneAngeles = mediumData.espiritus.some(
    (espiritu) => espiritu.tipo === "Angelical"
  );

  const invocar = () => {
    navigate(`/mediums/${mediumData.id}/invocarEspiritu`);
  };

  const exorcizar = () => {
    navigate(`/mediums/${mediumData.id}/exorcizar/`);
  };

  const descansar = () => {
    API.descansarMedium(mediumData.id).then(() => {
      //unPopUp de descansando...
      onUpdate();
    });
  };

  return isEditing ? (
    <MediumEditCard
      medium={mediumData}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <div className="card" style={{ backgroundImage: `url(${mediumImg})` }}>
      <div className="card-buttonContainer">
        <EditButton onClick={() => setIsEditing(true)} />
        <DeleteButton onClick={() => setShowPopup(true)} />
      </div>
      <div className="card-content">
        <h2 className="card-nombre medium-nombre">{mediumData.nombre}</h2>
        <div className="card-bottomContainer">
          <div className="card-info medium-bottom">
            <h3 className="card-id">ID: {mediumData.id}</h3>
            <h3 className="card-id">
              Ubicacion: {mediumData.ubicacion.nombre}
            </h3>

            <h3 className="card-id">
              Espiritus: {mediumData.espiritus.length}
            </h3>
            <h3 className="card-energia-max">Mana Max: {mediumData.manaMax}</h3>
            <div className="card-energia-container">
              <h2 className="card-energia">Mana:</h2>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${manaPorcentaje}%`,
                  }}
                ></div>
              </div>
              <p className="card-energia-porcentaje">{manaPorcentaje}%</p>
            </div>
            <div
              className="card-buttonContainer"
              style={{ justifyContent: "center" }}
            >
              <button className="card-button" onClick={invocar}>
                Invocar
              </button>
              <button className="card-button" onClick={descansar}>
                Descansar
              </button>
              {/* <button className="card-button">Mover</button> */}
              {tieneAngeles && (
                <button className="card-button" onClick={exorcizar}>
                  Exorcizar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <DeletePopUp
          onDelete={handleDelete}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
  <div className="popup-overlay">
    <div className="popup-delete">
      <p>¿Estás seguro de que deseas eliminar este medium?</p>
      <div className="popup-buttons">
        <button className="popup-button confirm" onClick={onDelete}>
          Sí
        </button>
        <button className="popup-button cancel" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  </div>
);

export default MediumCard;
