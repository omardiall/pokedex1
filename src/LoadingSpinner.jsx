import React from "react";
import loadingImage from "src/assets/pekomon.jpeg"; // Adjust the path as necessary


function Chargement() {
  return (
    <div className="loading">
      <img src={loadingImage} alt="Loading..." />
      <p>Chargement...</p>
    </div>
  );
}

export default Chargement;
