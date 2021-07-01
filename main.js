const elmntPokemonImage = document.getElementById(`pokemonImage`);
const elmntGuesser = document.getElementById(`guesser`);
const elmntScore = document.getElementById(`score`);
const baseURL = `https://pokeapi.co/api/v2/pokemon`;
const pokemonLimit = 151;
let selectedPokemonName;
let lastPokemon;
let nextPokemon;
let score = 0;

// Select initial Pokemon
selectNewPokemon();

// Listen for correct answer
elmntGuesser.addEventListener('input', () => {
    if (elmntGuesser.value == selectedPokemonName) {
        score++;
        elmntScore.innerText = score;
        elmntGuesser.value = null;
        elmntPokemonImage.setAttribute('src', 'placeholder.gif');

        selectNewPokemon();
    }
});

// Selects the new Pokemon
function selectNewPokemon() {

    setTimeout(() => {

    // Decide which pokemon to based on the limit
    const selectedPokemonID = ~~(Math.random() * pokemonLimit);

    // Sets the new pokemon image and updates the selected pokemon variable
    fetchPokemonData(selectedPokemonID).then((pokemonData) => {
        elmntPokemonImage.setAttribute('src', pokemonData.spriteURL);
        selectedPokemonName = pokemonData.name;
        console.log(selectedPokemonName);
    });
    
    }, 2000)

    
}

// Returns promise containing pokemon JSON data for name and sprite link
async function fetchPokemonData(pokemonID) {

    // fetch JSON data from Poke API
    const availablePokmeon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const pokemonJSON = await availablePokmeon.json();

    // Create object to return containing only important Pokemon information
    const pokemonData = {
        "name": pokemonJSON.name,
        "spriteURL": pokemonJSON.sprites.front_default,
    };

    return pokemonData;

}
