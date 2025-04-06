import React, { useState, useEffect } from "react";
import { recupererPokemons, recupererTypes } from "./api";
import CartePokemon from "./PokemonCard";
import "./pokemonName.css";

function ListePokemon() {
  const [pokemones, changerPokemones] = useState([]);

  const [lesTypes, changerLesTypes] = useState([]);
  const [recherche, changerRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [tri, setTri] = useState("numero-asc");
  const [filtreType, setFiltreType] = useState("");
  const [filtreGen, setFiltreGen] = useState("");

  useEffect(function () {
    recupererPokemons(function (data) {
      changerPokemones(data);
      setChargement(false);
    });

    recupererTypes(function (data) {
      changerLesTypes(data);
    }); }, []);

  function modifierRecherche(evenemen) {
    changerRecherche(evenemen.target.value);
  }

  function trierLesPokemons(a, b) {
    if (tri === "numero-ac") return a.id - b.id;
    if (tri === "numero-desc") return b.id - a.id;
    if (tri === "nom-asc") return a.name.fr.localeCompare(b.name.fr);
    if (tri === "nom-desc") return b.name.fr.localeCompare(a.name.fr);
    if (tri === "poids-asc") return a.weight - b.weight;
    if (tri === "poids-desc") return b.weight - a.weight;
    if (tri === "taille-asc") return a.height - b.height;
    if (tri === "taille-dsc") return b.height - a.height;
    return 0;
  }

  const resultat = pokemones
    .filter(function (pk) {
      const nomfr = pk.name.fr.toLowerCase();

      const nomen = pk.name.en.toLowerCase();

      const saisi = recherche.toLowerCase();
      return nomfr.includes(saisi) || nomen.includes(saisi);

    })
    .filter(function (pk) {

      if (filtreType === "") return true;

      return pk.types.includes(parseInt(filtreType));

    })
    .filter(function (pk) {

      if (filtreGen === "") return true;

      return pk.generation === parseInt(filtreGen);

    })
    .sort(trierLesPokemons);


    

  return (
    <div className="container">
      <h2 className="title">Liste des Pokémon</h2>

      <input type="text"  placeholder="Rechercher un Pokémon..."  value={recherche} onChange={modifierRecherche} className="search-bar"  />

      <select onChange={(e) => setFiltreType(e.target.value)} className="filter">

          <option value="">Tous les types</option>

          {lesTypes.map(function (type) {

            return (
              <option key={type.id} value={type.id}>{type.name.fr}</option>
              
            );
          })}
      </select>

      <select onChange={(e) => setFiltreGen(e.target.value)} className="filter">

        <option value="">Toutes les générations</option>

        {[...new Set(pokemones.map(function (p) { return p.generation; }))].map(function (gen) {

          return <option key={gen} value={gen}>Génération {gen}</option>;

        })}
      </select>

      <select onChange={(e) => setTri(e.target.value)} className="filter">
        <option value="numero-asc">Numéro croissant</option>
        <option value="numero-desc">Numéro décroissant</option>
        <option value="nom-asc">Alphabétique A-Z</option>
        <option value="nom-desc">Alphabétique Z-A</option>
        <option value="poids-asc">Poids croissant</option>
        <option value="poids-desc">Poids décroissant</option>
        <option value="taille-asc">Taille croissante</option>
        <option value="taille-desc">Taille décroissante</option>
      </select>

      {chargement ? (<p>Chargement...</p> ) : 
      (<div className="pokemon-grid">
          {resultat.map(function (p) {
            return <CartePokemon key={p.id} pok={p} lesTypes={lesTypes} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ListePokemon;