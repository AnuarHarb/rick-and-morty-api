//Querys al DOM
const cards = document.getElementById('cards');

//Url de API
const apiUrl = 'https://rickandmortyapi.com/api/character/';

fetch(apiUrl)
  .then(function(response) {
    console.log(response)
    return response.json();
  })
  .then(function(respJson) {
    const personajes = respJson.results;
    imprimirPersonajes(personajes);
  })
  .catch(function(error) {
    console.log(error);
  })

  function imprimirPersonajes(personajes){
    for(let personaje of personajes) {
      console.log(personaje);
      cards.innerHTML += `
        <p>${personaje.name}</p>
        <img src="${personaje.image}">
      `
    }
  }





///
