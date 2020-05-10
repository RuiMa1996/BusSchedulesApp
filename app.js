const myAPIKey = '2dXx20LqMATZ1L2vsXr';
const searchPart = document.querySelector('input');
const searchBox = document.querySelector('form');

searchBox.addEventListener('submit', function(e) {
  e.preventDefault();
  search(searchPart.value);
  searchPart.value = "";
})

function search(streetName) {
  
}