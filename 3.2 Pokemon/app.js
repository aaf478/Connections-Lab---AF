window.addEventListener('load', function () {
    console.log('page is loaded');
    //https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then(response => response.json())
        .then(data => {
            let pokemonArray = data.results;
            let randomNumber = Math.floor(Math.random() * pokemonArray.length);
            let nameElement = document.getElementById('pokemon_name');
            nameElement.innerHTML = pokemonArray[randomNumber].name;
        })


    let button = document.getElementById('pokemon-button');
    button.addEventListener('click', function () {
        let inputText = document.getElementById("pokemon-input").value;

        let API_URL = " https://pokeapi.co/api/v2/pokemon/" + inputText;
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let headingElement = document.getElementById('p-name');
            headingElement.innerHTML = data.name;

            let weightElement = document.getElementById('p-weight');
            weightElement.innerHTML=data.weight;

            let imageElement = document.getElementById('p-img');
            imageElement.src = data.sprites.front_default;
                })
    })




})

//math.random()*151
//math.floor(math.random()*151)