const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemo = async (pokemon) => {
    // Função que fará a busca dos Pokemons de forma assíncrona
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    // Variavel que fará o caminho até a API de forma que espere os resultados chegarem, por isso AWAIT

    if (apiResponse['status'] === 200) {
        // Verifica se o status da requisição deu cert0 "200 = OK e 404 = Não Encontrado"
        const data = await apiResponse.json()
        // Transforma a requisição em JSON

        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    // Mostra ao usuario que estamos procurando antes de verificar de receber os dados do fetch

    const data = await fetchPokemo(pokemon)

    if (data) {

        pokemonName.innerHTML = data.name;
        pokemon
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    } else {

        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found :(';
        pokemon
        pokemonNumber.innerHTML = "";
    }


    input.value = ''
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    renderPokemon(input.value.toLowerCase());
    // Insere na função o valor colocado no input
})

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', () => {
    searchPokemon++
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);

