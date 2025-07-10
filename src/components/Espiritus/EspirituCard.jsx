import "../css/Card.css";
import "../css/EspirituCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import EditEspirituCard from "./EditEspirituCard";
import demoniacoImg from "../../assets/demoniaco.jpg";
import angelicalImg from "../../assets/angelical.jpg";

const EspirituCard = ({ espiritu, onDelete, onUpdate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [espirituData, setEspirituData] = useState(espiritu);
  const [meidumName, setMediumName] = useState("");
  const navigate = useNavigate();

  const backgroundImage =
    espirituData.tipo === "Demoniaco" ? demoniacoImg : angelicalImg;

  useEffect(() => {
    setEspirituData(espiritu);
    setIsEditing(false);
  }, [espiritu]);

  const handleDelete = () => {
    API.deleteEspiritu(espirituData.id).then(() => {
      setShowPopup(false);
      onDelete();
    });
  };

  const handleSave = (updatedEspiritu) => {
    onUpdate();
    setEspirituData(updatedEspiritu);
    setIsEditing(false);
  };

  const conectar = () => {
    navigate(`/espiritus/${espirituData.id}/conectarAMedium`);
  };

  useEffect(() => {
    if (espirituData.mediumId) {
      API.getMediumById(espirituData.mediumId)
        .then((response) => {
          setMediumName(response.data.nombre);
        })
        .catch(() => {
          setMediumName(null);
        });
    } else {
      setMediumName("");
    }
  }, [espirituData.mediumId]);

  return isEditing ? (
    <EditEspirituCard
      espiritu={espirituData}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <div
      className="card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="card-buttonContainer">
        <EditButton onClick={() => setIsEditing(true)} />
        <DeleteButton onClick={() => setShowPopup(true)} />
      </div>
      <div className="card-content">
        <h2 className={`card-nombre ${espirituData.tipo}-top`}>
          {espirituData.nombre}
        </h2>
        <div className="card-bottomContainer">
          <div className={`card-info ${espirituData.tipo}-bottom`}>
            <h3 className={`card-id ${espirituData.tipo}-bottom`}>
              ID: {espirituData.id}
            </h3>
            <h3 className={`card-id ${espirituData.tipo}-bottom`}>
              Ubicacion: {espirituData.ubicacion.nombre}
            </h3>
            {espirituData.mediumId && (
              <>
                <h3 className={`card-id ${espirituData.tipo}-bottom`}>
                  Medium: {meidumName}
                </h3>
                <div className="card-energia-container">
                  <h2 className={`card-energia ${espirituData.tipo}-bottom`}>
                    Nivel de conexion:
                  </h2>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${espirituData.nivelDeConexion}%`,
                      }}
                    ></div>
                  </div>
                  <p
                    className={`card-energia-porcentaje ${espirituData.tipo}-bottom`}
                  >
                    {espirituData.nivelDeConexion}%
                  </p>
                </div>
              </>
            )}
            {!espirituData.mediumId && (
              <div className="espiritu-buttonContainer">
                <button
                  className={`card-button ${
                    espirituData.tipo === "Angelical"
                      ? "Angelical-button"
                      : "Demoniaco-button"
                  }`}
                  onClick={conectar}
                >
                  Conectar A
                </button>
              </div>
            )}
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
      <p>¿Estás seguro de que deseas eliminar este espiritu?</p>
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

export default EspirituCard;
