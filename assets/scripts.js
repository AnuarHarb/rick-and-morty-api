//Querys al DOM
const charactersContainer = document.getElementById('characters');
// const loading = document.getElementById('loading');
const filterButtons = document.querySelectorAll('.filter-button');

//Url de API
const apiUrl = 'https://rickandmortyapi.com/api/character';


for(let button of filterButtons) {
  button.addEventListener('click', filterCharacters);
}

function filterCharacters(event) {
  const filter = event.target.getAttribute('data-filter');
  const filterApi = apiUrl + '/?gender=' + filter;
  charactersContainer.innerHTML = '';
  apiCall(filterApi);
}

function apiCall(apiToCall){

  fetch(apiToCall)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp){
      console.log(resp.info.next)
      if(resp.info.next != ''){
        apiCall(resp.info.next);
        for(let button of filterButtons) {
          button.disabled = true;
        }
      } else {
        for(let button of filterButtons) {
          button.disabled = false;
        }
      }
      printCharacters(resp.results);
    })
}


function printCharacters(characters) {
  for(let character of characters) {
    charactersContainer.innerHTML += `
      <article class="card species-${character.species.toLowerCase()}">
        <h2>${character.name}</h2>
        <img src="${character.image}">
        <p>${character.status}</p>
        <p>${character.gender}</p>
        <p>${character.species}</p>
        <p>${character.location.name}</p>
      </article>
    `
  }
}

apiCall(apiUrl);
