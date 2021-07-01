const elmntGameContainer = document.getElementById(`gameContainer`);
const elmntPokemonImage = document.getElementById(`pokemonImage`);
const elmntGuesser = document.getElementById(`guesser`);
const elmntScore = document.getElementById(`score`);
const baseURL = `https://pokeapi.co/api/v2/pokemon`;
const pokemonLimit = 151;
let selectedPokemonName;
let lastPokemon;
let nextPokemon;
let score = 0;

// Start the game by selecting an initial Pokemon
selectNewPokemon();

// Listen for answer and check if it is correct or incorrect
elmntGuesser.addEventListener('keypress', (keypressEvent) => {

    if (keypressEvent.key === "Enter") {

        if (elmntGuesser.value == selectedPokemonName) {
            
            // Increase score if answer is right
            score++;

        } else {

            // Reset score and shake screen if answer is wrong
            score = 0;
            failSequence();
            setTimeout(failSequence, 300);
        
        }

        // Set loading gif and disable input until pokemon is loaded, update score.
        elmntPokemonImage.setAttribute('src', 'placeholder.gif');
        elmntGuesser.toggleAttribute('disabled');
        elmntGuesser.value = null;
        elmntScore.innerText = score;
        selectNewPokemon();

    }

});

// Selects the new Pokemon
function selectNewPokemon() {

    // Wait at least 2 seconds before the image is displayed and input enabled so there is enough time to load.
    setTimeout(() => {

    // Decide which pokemon to based on the limit
    const selectedPokemonID = ~~(Math.random() * pokemonLimit);

    // Sets the new pokemon image and updates the selected pokemon variable
    fetchPokemonData(selectedPokemonID).then((pokemonData) => {
        elmntPokemonImage.setAttribute('src', pokemonData.spriteURL);
        selectedPokemonName = pokemonData.name;
        console.log(selectedPokemonName);
    });

    elmntGuesser.toggleAttribute('disabled');
    elmntGuesser.focus();

    
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


// Toggles classes for screenshake from the shaker css 
function failSequence() {
    elmntGameContainer.classList.toggle("shake-horizontal");
    elmntGameContainer.classList.toggle("shake-constant");
}
