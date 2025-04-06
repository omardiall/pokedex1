import React from "react";
import { Link } from "react-router-dom";

function CartePokemon(props) {
  
  const pok = props.pok;

  const lesTypes = props.lesTypes;

  function afficherTypes() {

    return pok.types.map(function (idType) {

      const leType = lesTypes.find(function (unType) {

        return unType.id === idType;
      });

      if (leType) {
        return (
          <div key={leType.id} className="type-petit">

            <img src={leType.image} alt={leType.name.fr} title={leType.name.fr} className="icone-type" />

            <span>{leType.name.fr}</span>
          </div>
        );
      }

      return null;
    });
  }

  return (
    <Link to={"/pokemon/" + pok.id} className="pokemon-card-link">

      <div className="pokemon-card">

        <h3>{pok.id}. {pok.name.fr} ({pok.name.en})</h3>

        <img src={pok.image} alt={pok.name.en} />

        <div className="type-container">{afficherTypes()}</div>

        <p>Génération: {pok.generation}</p>

      </div>
    </Link>
  );
}

export default CartePokemon;