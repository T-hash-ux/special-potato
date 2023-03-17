// change target
var jokeEl = document.querySelector("#joke");
// change target
var buttonEl = document.querySelector("#search");

var handleButtonClick = function (event) {
  if (event.target.matches("button")) {
    getJoke(event.target.dataset.id);
  }
};

// var displayJoke = function (text) {
//   jokeEl.textContent = text;
// };

var renderButtons = function () {
  var searchedJokes = getSearchedJokes();
  for (var i = 0; i < searchedJokes.length; i++) {
    var button = document.createElement("button");
    button.textContent = searchedJokes[i].joke;
    button.dataset.id = searchedJokes[i].id;
    buttonEl.appendChild(button);
  }
};

var getSearchedJokes = function () {
  return JSON.parse(localStorage.getItem("searchedJokes")) || [];
};

var setSearchedJokes = function (text) {
  var searchedJokes = getSearchedJokes();
  searchedJokes.push(text);
  localStorage.setItem("searchedJokes", JSON.stringify(searchedJokes));
};

var getJoke = function (id = "") {
  // https://icanhazdadjoke.com/
  var apiURL = "https://www.loc.gov/";

  fetch(apiURL, {
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayJoke(data.joke);
      setSearchedJokes(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

getJoke();
renderButtons();
buttonEl.addEventListener("click", handleButtonClick);
