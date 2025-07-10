import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import "./css/Realidades.css";
import EspirituList from "../components/EspirituList.jsx";
import LineaTemporal from "../components/LineaTemporal.jsx";
import GoBackButton from "../components/GoBackButton.jsx";
import { GiDevilMask, GiAngelOutfit } from "react-icons/gi";
import whatIfimg from "../assets/whatif.png";

const Realidad = () => {
  const [realidad, setRealidad] = useState(null);
  const [corrupcion, setCorrupcion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    API.getRealidadById(id)
      .then((res) => {
        setRealidad(res.data);
      })
      .catch((error) => {
        console.error("Error fetching realidad:", error);
      });
  }, [id]);

  useEffect(() => {
    API.getCorrupcion(id)
      .then((res) => {
        setCorrupcion(res.data);
      })
      .catch((error) => {
        console.error("Error fetching corrupcion:", error);
      });
  }, [id]);

  const refreshRealidad = () => {
    API.getRealidadById(id)
      .then((res) => {
        setRealidad(res.data);
        API.getCorrupcion(id)
          .then((res) => {
            setCorrupcion(res.data);
          })
          .catch((error) => {
            console.error("Error fetching corrupcion:", error);
          });
      })
      .catch((error) => {
        console.error("Error refreshing realidad:", error);
      });
  };

  const [showPopup, setShowPopup] = useState(false);
  const simularDominacion = () => {
    setShowPopup(!showPopup);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="realidad-container">
      <GoBackButton />
      {realidad ? (
        <>
          <h1 className="realidad-title">Bifurcada por: {realidad.nombre}</h1>
          <div className="realidad-content">
            <div className="realidad-espiritus">
              <EspirituList items={realidad.espiritus} />
            </div>
            <div className="realidad-timeline">
              {realidad.eventos && realidad.eventos.length > 0 ? (
                <LineaTemporal eventos={realidad.eventos} />
              ) : (
                <div className="timeline-empty">
                  No hay eventos registrados.
                </div>
              )}
            </div>
            <div className="realidad-info">
              {corrupcion ? (
                <div className="realidad-corrupcion">
                  <h2>Corrupcion total: {corrupcion.corrupcionActual}%</h2>
                  <div className="corruption-bar">
                    <div
                      className="corruption-bar-fill"
                      style={{
                        width: `${corrupcion.corrupcionActual}%`,
                      }}
                    ></div>
                  </div>
                  <div className={"corrupcion-list-item"}>
                    <GiDevilMask className="items-list-icon" />
                    <h2 className="espiritu-list-nombre">
                      Demonios dominantes: {corrupcion.demoniosDominantes}
                    </h2>
                  </div>
                  <div className={"corrupcion-list-item"}>
                    <GiAngelOutfit className="items-list-icon" />
                    <h2 className="espiritu-list-nombre">
                      Angeles dominantes: {corrupcion.angelesDominantes}
                    </h2>
                  </div>
                </div>
              ) : (
                <h2>Cargando corrupción...</h2>
              )}
              <div className="whatif-section" onClick={simularDominacion}>
                <h2 className="whatif-title">¿Qué pasaría si...?</h2>
                <img src={whatIfimg} alt="What If" className="whatif-img" />
                <p className="whatif-description">
                  Explora las posibilidades de esta realidad paralela.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Cargando realidad...</h1>
      )}
      {showPopup && (
        <WhatIfEngine
          espiritus={realidad ? realidad.espiritus : []}
          realidadId={id}
          refreshRealidad={refreshRealidad}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

const WhatIfEngine = ({ espiritus, realidadId, refreshRealidad, onCancel }) => {
  const [selectedDominanteID, setSelectedDominanteID] = useState("");
  const [selectedDominadoID, setSelectedDominadoID] = useState("");
  const [error, setError] = useState("");

  const handleDominacion = () => {
    if (!selectedDominanteID || !selectedDominadoID) {
      setError("Por favor, selecciona ambos espíritus");
      return;
    }
    if (selectedDominanteID === selectedDominadoID) {
      setError("No bancamos la autodominacion che");
      return;
    }

    API.simularDominacion(realidadId, selectedDominanteID, selectedDominadoID)
      .then(() => {
        refreshRealidad();
        onCancel();
      })
      .catch((err) => {
        console.log(err);
        setError("malio sal");
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-create">
        <h2 className="popup-title">Simular dominación</h2>
        <p className="popup-description">
          Selecciona dos espíritus para simular una dominación.
        </p>
        <div className="popup-inputs">
          <div className="popup-input-container">
            <p className="popup-input-label">Espíritu Dominante</p>
            <select
              className="popup-input select"
              value={selectedDominanteID}
              onChange={(e) => setSelectedDominanteID(e.target.value)}
            >
              <option className="select-option" value="">
                Selecciona un espíritu dominante...
              </option>
              {espiritus.map((espiritu) => (
                <option key={espiritu.idSQL} value={espiritu.idSQL}>
                  {espiritu.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="popup-input-container">
            <p className="popup-input-label">Espíritu Dominado</p>
            <select
              className="popup-input select"
              value={selectedDominadoID}
              onChange={(e) => setSelectedDominadoID(e.target.value)}
            >
              <option className="select-option" value="">
                Selecciona un espíritu dominado...
              </option>
              {espiritus.map((espiritu) => (
                <option key={espiritu.idSQL} value={espiritu.idSQL}>
                  {espiritu.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="popup-buttons">
          <button className="popup-button cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="popup-button confirm" onClick={handleDominacion}>
            Simular
          </button>
        </div>
      </div>
    </div>
  );
};

export default Realidad;
