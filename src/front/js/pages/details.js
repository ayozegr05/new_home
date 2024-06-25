import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Masonry from "react-masonry-css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export const Details = () => {
  const { state } = useLocation();
  console.log("STATEEEEE1:", state)
  const [pet, setPet] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (state && state.attributes) {
      setPet(state.attributes);
    }
  }, [state]);

  if (!pet) {
    return <div>No data available</div>;
  }

  const { name, breedString, ageString, sex, sizeGroup, descriptionText, city, contact, pictureThumbnailUrl } = pet;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card fondo mb-3" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          <div className="col-md-7">
            <img
              variant="top"
              src={pictureThumbnailUrl || "https://via.placeholder.com/400"}
              alt={`Image for ${name}`}
              className="img-fluid"
              style={{ maxHeight: "840px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-5 ps-4">
            <div className="card-body">
              <h3 className="card-title d-flex justify-content-center mb-5">{name}</h3>
              <p className="card-text fs-4"><strong>Breed mixture: </strong>{breedString ? breedString : 'N/A'}</p>
              <p className="card-text fs-4"><strong>Age: </strong>{ageString ? ageString : 'N/A'}</p>
              <p className="card-text fs-4"><strong>Gender: </strong>{sex ? sex : 'N/A'}</p>
              <p className="card-text fs-4"><strong>Size: </strong>{sizeGroup ? sizeGroup : 'N/A'}</p>
              {/* Lógica para mostrar la descripción recortada o completa */}
              <div className="card-text fs-4">
                <strong>Description: </strong>
                {isExpanded ? descriptionText : `${descriptionText.slice(0, 100)}...`}
                {/* Mostrar el botón "Ver más" si la descripción es larga */}
                {descriptionText.length > 100 &&
                  <button
                    className="btn btn-link p-0 ms-2"
                    onClick={toggleExpand}
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </button>
                }
              </div>
              <p className="card-text fs-4"><strong>City: </strong>{city ? city : 'N/A'}</p>
              <p className="card-text fs-4 mb-4"><strong>Contact: </strong>{contact && contact.email ? contact.email : 'N/A'}</p>
              <div className="mt-2 d-flex justify-content-center mb-2">
                <Link to="/adoptme" className="btn btn-secondary btn-lg"><strong>Pet list</strong></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
