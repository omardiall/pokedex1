import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { recupererPokemons, recupererTypes } from "./api";

function DetailPokemon() {
  const lesParametre = useParams();
  const [pokemones, setPokemones] = useState([]);
  const [lesTypes, setLesTypes] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(function () {
    
    recupererPokemons(function (data) {

      setPokemones(data);

      setChargement(false);
    });

    recupererTypes(function (data) {

      setLesTypes(data);
    });
  }, []);

  const lePokemon = pokemones.find(function (pk) {

    return pk.id === parseInt(lesParametre.id);
  });

  function afficherTypesDetail() {

    if (!lePokemon || !lePokemon.types) return null;

    return lePokemon.types.map(function (idType) {

      const leType = lesTypes.find(function (type) {

        return type.id === idType;
      });

      if (leType) {

        return (
          <div key={leType.id} className="type-petit">

            <img src={leType.image} alt={leType.name.fr} title={leType.name.fr} className="icone-type"/>

            <span>{leType.name.fr}</span>
          </div>
        );
      }

      return null;
    });
  }

  if (chargement) {
    return <p>Chargement...</p>;
  }

  if (!lePokemon) {
    return <p>Pokémon introuvable.</p>;
  }

  return (
    <div className="container">
      <Link to="/">← Retour à la liste</Link>
      <h2>Détail du Pokémon</h2>
      <h3>Nom Pokémon: {lePokemon.name.fr} ({lePokemon.name.en})</h3>
      <img className="img-details" src={lePokemon.image} alt={lePokemon.name.en} />
      <img className="img-details" src={lePokemon.image_shiny} alt={lePokemon.name.en} />
      <div className="type-container"><p>Type:</p> {afficherTypesDetail()}</div>
      <p>ID: {lePokemon.id}</p>
      <p>Génération: {lePokemon.generation}</p>
      <p>Poids: {lePokemon.weight}</p>
      <p>Taille: {lePokemon.height}</p>
      <p>hp: {lePokemon.stats.hp}</p>
      <p>atk: {lePokemon.stats.atk}</p>
      <p>def: {lePokemon.stats.def}</p>
      <p>sp_atk: {lePokemon.stats.spe_atk}</p>
      <p>sp_def: {lePokemon.stats.spe_def}</p>
      <p>vitesse: {lePokemon.stats.vit}</p>
    </div>
  );
}

export default DetailPokemon;
