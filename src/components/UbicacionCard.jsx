import React, { useState } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import API from "../service/API";
import "./css/UbicacionCard.css";
import cementerioImg from "../assets/cementerio.jpg";
import santuarioImg from "../assets/santuario.jpg";

const UbicacionCard = ({ ubicacion, onDelete }) => {
  const backgroundImage =
    ubicacion.tipo === "Cementerio" ? cementerioImg : santuarioImg;

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    API.deleteUbicacion(ubicacion.id).then(() => {
      setShowPopup(false);
      onDelete();
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <EditCard
      ubicacion={ubicacion}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <>
      <div
        className="ubicacionCard"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="ubicacionCard-buttonContainer">
          <EditButton onClick={() => setIsEditing(true)} />
          <DeleteButton onClick={() => setShowPopup(true)} />
        </div>
        <div className="ubicacionCard-content">
          <h2 className={`ubicacionCard-nombre ${ubicacion.tipo}-top`}>
            {ubicacion.nombre}
          </h2>
          <div className="ubicacionCard-bottomContainer">
            <div className={`ubicacionCard-info ${ubicacion.tipo}-bottom`}>
              <h3 className="ubicacionCard-id">ID: {ubicacion.id}</h3>
              <div className="ubicacionCard-flujo-container">
                <h2 className="ubicacionCard-flujo">Flujo de Energia:</h2>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${ubicacion.flujoDeEnergia}%` }}
                  />
                </div>
                <p className="ubicacionCard-flujo-porcentaje">
                  {ubicacion.flujoDeEnergia}%
                </p>
              </div>
            </div>
            <div className="ubicacion-buttonContainer">
              <button className="ubicacionCard-button">Espiritus</button>
              <button className="ubicacionCard-button">MediumsSinEspiritus</button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <DeletePopUp onDelete={handleDelete} onCancel={() => setShowPopup(false)} />
      )}
    </>
  );
};

const EditCard = ({ ubicacion, onSave, onCancel }) => {
  const [editedNombre, setEditedNombre] = useState(ubicacion.nombre);
  const [editedFlujoDeEnergia, setEditedFlujoDeEnergia] =
    useState(ubicacion.flujoDeEnergia);

  const handleSaveChanges = () => {
    const updateBodyDTO = {
      nombre: editedNombre,
      flujoDeEnergia: editedFlujoDeEnergia,
    };

    API.updateUbicacion(ubicacion.id, updateBodyDTO)
      .then(() => {
        onSave(updateBodyDTO);
      })
      .catch((error) => {
        console.error("Error al actualizar la ubicación:", error);
      });
  };

  const backgroundImage =
    ubicacion.tipo === "Cementerio" ? cementerioImg : santuarioImg;

  return (
    <>
      <div
        className="ubicacionCard"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="ubicacionCard-buttonContainer">
          <div style={{ height: "40px", width: "40px" }} />
        </div>
        <div className="ubicacionCard-content">
          <input
            type="text"
            className="ubicacionCard-editInput"
            value={editedNombre}
            onChange={(e) => setEditedNombre(e.target.value)}
          />
          <div className="ubicacionCard-bottomContainer">
            <div className={`ubicacionCard-info ${ubicacion.tipo}-bottom`}>
              <h3 className="ubicacionCard-id">ID: {ubicacion.id}</h3>
              <div className="ubicacionCard-flujo-container">
                <h2 className="ubicacionCard-flujo">Flujo de Energia:</h2>
                <input
                  type="number"
                  className="ubicacionCard-editInput"
                  value={editedFlujoDeEnergia}
                  onChange={(e) => setEditedFlujoDeEnergia(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
          <div className="ubicacion-buttonContainer">
            <button className="ubicacionCard-button" onClick={onCancel}>
              Descartar
            </button>
            <button
              className="ubicacionCard-button"
              onClick={handleSaveChanges}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DeletePopUp = ({ onDelete, onCancel }) => (
  <div className="popup-overlay">
    <div className="popup">
      <p>¿Estás seguro de que deseas eliminar esta ubicacion?</p>
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

export default UbicacionCard;

