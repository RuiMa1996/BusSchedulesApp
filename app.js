const myAPIKey = '2dXx20LqMATZ1L2vsXr';
const searchPart = document.querySelector('input');
const searchBox = document.querySelector('form');

searchBox.addEventListener('submit', function(e) {
  e.preventDefault();
  search(searchPart.value);
  searchPart.value = "";
})

function search(streetName) {
  fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=${myAPIKey}&name=${streetName}&usage=long`)
    .then(resp => {
      if(resp.ok) {
        return resp.json();
      } else {
        throw new Error('No streets found');
      }
    })
    .then(nameOfStreet => {
      let html = "";
      console.log(nameOfStreet.streets);
      if(nameOfStreet.streets.length === 0) {
        console.log('hi');
       html = "No street found"
      } else {
        for(let name of nameOfStreet.streets) {
          html += `<a href="#" data-street-key=${name.key}>${name.name}</a>`
        }
      }
      listOfSearchResult.innerHTML = "";

      listOfSearchResult.insertAdjacentHTML('afterbegin', html);
    })
}