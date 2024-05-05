const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === '') {
    alert('Please enter a Pokémon name or ID.');
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(data => {
      pokemonName.textContent = data.name.toUpperCase();
      pokemonId.textContent = `#${data.id}`;
      weight.textContent = `Weight: ${data.weight}`;
      height.textContent = `Height: ${data.height}`;
      types.innerHTML = '';
      data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
        types.appendChild(document.createTextNode(' '));
      });
      hp.textContent = data.stats[0].base_stat;
      attack.textContent = data.stats[1].base_stat;
      defense.textContent = data.stats[2].base_stat;
      specialAttack.textContent = data.stats[3].base_stat;
      specialDefense.textContent = data.stats[4].base_stat;
      speed.textContent = data.stats[5].base_stat;
      sprite.src = data.sprites.front_default;
      sprite.alt = data.name;
    })
    .catch(error => {
      alert(error.message);
    });

  searchInput.value = '';
}