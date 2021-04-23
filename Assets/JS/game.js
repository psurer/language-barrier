//game logic var
var translatedWords = []; //array to hold translated words
var words = ["apple", "strawberry", "bread", "tea", "fish"]; //these words will come from dictionary API
var correctAnswers = new Map(); // dictionary , key will be english source word, value will be correct translated word
var selectedSourceWord = ''; // used to save the selected english word.
var selectedTargetWord = ''; // used to save the target language word.
var selectedLanguage = '' ; /// use to save the language choosen by the user ( portuguese, spanish , frech)
var savedNamed = localStorage.getItem("name")
console.log(savedNamed);
var savedWordsQty = localStorage.getItem("words")
console.log(savedWordsQty);
var savedLanguage = localStorage.getItem("language")
console.log(savedLanguage);
var wins = 0;
var losses = 0;

//game logic 
function playGame() {
  initGameBoard();// Clean the board so we can start the game.
  for (var index = 0; index < words.length; index++) { // 
    displayWordsToUser(words[index], "#wordsToTranslate"); // displays words 
    translate(words[index]); // calls function translate to display the words
  }
}
//calls google API to translate a word
function translate(word) {
  var url =
    "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCv96aME3EBXa609ZV3Pl8Z6rVgFVWmmAc";
  url += "&source=EN";
  url += "&target="+ selectedLanguage;
  url += "&q=" + word;
  //gets data from google
  $.get(url, function (returnByGoogle, status) {
    console.log(returnByGoogle.data.translations[0].translatedText);
    translatedWords.push(returnByGoogle.data.translations[0].translatedText);
    //add to correct answers list
    correctAnswers.set(
      word,
      returnByGoogle.data.translations[0].translatedText
    );
    displayWordsToUser(
      returnByGoogle.data.translations[0].translatedText,
      "#translatedWordsList"
    );
  });
}
//displays words to user
function displayWordsToUser(word, elementID) {
  if ('#translatedWordsList' === elementID) {
    $(elementID).append(
      `<li id="${word}"><input type="checkbox" disabled onclick="whenTranslatedWordIsClicked('${word}')"/><span style="margin:5px">${word}</span></li>`
    );
  } else {
    $(elementID).append(
      `<li id="${word}"><input type="checkbox" onclick="whenSourceWordIsClicked('${word}')"/><span style="margin:5px">${word}</span></li>`
    );
  }
}
//when user cliks on radio buttons function is called
function whenSourceWordIsClicked(word) {
  selectedSourceWord = word;
  //enable target words list
  $('#translatedWordsList').children('li').children('input').prop('disabled', false);
}
function whenTranslatedWordIsClicked(word) {
  selectedTargetWord = word;
  //now check the result
  checkSelection();
}

function checkSelection() {
  if (correctAnswers.get(selectedSourceWord) === selectedTargetWord) {
    wins++;
    //I will scratch the words
    $(`#${selectedTargetWord}`).addClass('scratched').children('input').prop('disabled',true).prop('checked', false);;
    $(`#${selectedSourceWord}`).addClass('scratched').children('input').prop('disabled',true).prop('checked', false);

  } else {
    losses++;
    clearUserSelectionsCheckBox();
  }
  showUserScore();
  if (wins===words.length) {
    document.location.href="congrats.html";
  }
}

function showUserScore() {
  $("#right").html(`<h3> wins ${wins} </h3>`);
  $("#wrong").html(`<h3> losses ${losses} </h3>`);
  //saves score to local storage
  localStorage.setItem("wins",wins);
  localStorage.setItem("losses",losses);
}
// logic to clear check box on translated words section
function clearUserSelectionsCheckBox() {
  //Find the element with the id
  //Find a way to find all the elements "children" that are LI
  //Then, set a property named "checked" to false
  //You do all that in one line of code using JQuery. 
  //If you look at our code in line 60 you will see an example of doing that to 
  //another element but basically the same concept. Looking for an element,
  //finding children and setting a property.
  $('#translatedWordsList').children('li').children('input').prop('checked', false);
}

function initGameBoard(){
  $('#translatedWordsList').html(null);
  $('#wordsToTranslate').html(null);
}

function initEventHandlers(){
  //Select Language 
  $('#selectedLanguage').change(function (data)
  {
    //Get the selected value, french, spainsh, portuguese
    selectedLanguage = $(this).children("option:selected").val();
    playGame();
  });
}

initEventHandlers();



//getImage();

// //Image API link
// //Function to get and display the picture 
// function getImage(correctWord) {
//   const myHeaders = new Headers();
//   myHeaders.append('content-type', 'application/json'); // Adding content type to myHeaders
//   myHeaders.append('Authorization','563492ad6f91700001000001067ba0f78afa4701a9963ea68164e74c'); // Adding the API KEY
//   const imageUrl = `https://api.pexels.com/v1/search?query=${correctWord}&per_page=1`;
//   fetch(imageUrl, {
//     mode: 'cors', // Adding the fetch mode to use cors
//     method: "GET",
//     headers: myHeaders // Adding the fetch call headers.
//   }).then(function (response) {
//     if (response.ok) {
//       console.log(response);
//       response.json().then(function (data) {
//         console.log(data);
//         //Showing the picture
//         $('img').attr('src', data.photos[0].src.small); // here I am adding the photo url to the image sample tag
//       });
//     } else {
//       console.log(response);
//     }
//   }).catch(
//     function (error, status) {
//       console.log(error);
//       console.log(status);
//     });
// }
// getImage("apple"); // Call to test your code.
