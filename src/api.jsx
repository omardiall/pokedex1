

export function recupererPokemons(toutLesPokemons) {
  fetch("https://pokedex-api.3rgo.tech/api/pokemon")
    .then(function (rep) {
      return rep.json();
    })
    .then(function (donner) {
      toutLesPokemons(donner.data);
    });
}

export function recupererTypes(tousLesTypes) {
  fetch("https://pokedex-api.3rgo.tech/api/types")
    .then(function (rep) {
      return rep.json();
    })
    .then(function (donner) {
      tousLesTypes(donner.data);
    });
}