const myAPIKey = '2dXx20LqMATZ1L2vsXr';
const searchPart = document.querySelector('input');
const searchBox = document.querySelector('form');
const listOfSearchResult = document.querySelector('.streets');
const listOfBus = document.querySelector('tbody');

searchBox.addEventListener('submit', function (e) {
  e.preventDefault();
  search(searchPart.value);
  searchPart.value = "";
})

function search(streetName) {
  fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=${myAPIKey}&name=${streetName}&usage=long`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('No streets found');
      }
    })
    .then(nameOfStreet => {
      let html = "";
      if (nameOfStreet.streets.length === 0) {
        html = "No street found"
      } else {
        for (let name of nameOfStreet.streets) {
          html += `<a href="#" data-street-key=${name.key}>${name.name}</a>`
        }
      }
      listOfSearchResult.innerHTML = "";

      listOfSearchResult.insertAdjacentHTML('afterbegin', html);
    })
}

listOfSearchResult.addEventListener('click', function (e) {
  if (e.target.nodeName === "A") {
    getStops(e.target.dataset.streetKey);
  }
})

function getStops(key) {
  let stopsInfo = {};

  fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=${myAPIKey}&street=${key}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('No stops found');
      }
    })
    .then(stops => {
      busSchedules(stops);
    })
}

function busSchedules(stop) {
  const busArray = [];
  for (let bus of stop.stops) {
    busArray.push(
    fetch(`https://api.winnipegtransit.com/v3/stops/${bus.key}/schedule.json?api-key=${myAPIKey}&max-results-per-route=1`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('No stops found');
        }
      })
      .then(busInfo => {
        for(let busDetails in busInfo) {
          console.log(busInfo[busDetails]);
          return busInfo[busDetails];
        }
      }))
  }
}