//game logic var
var translatedWords = []; //array to hold translated words
var words = ["apple", "strawberry", "bread", "tea", "fish"]; //these words will come from dictionary API
var correctAnswers = new Map(); // dictionary , key will be english source word, value will be correct translated word
var selectedSourceWord = ''; // used to save the selected english word.
var selectedTargetWord = ''; // used to save the target language word.
//Saved information
var savedNamed=localStorage.getItem("name")
var savedWordsQty=localStorage.getItem("words")
var savedLanguage=localStorage.getItem("language")
//Variable with the rigth word----------------test------------------
var correctWord="apple"
//Image API link
var imageKey="https://api.pexels.com/v1/search?query="+correctWord+"&per_page=1"+"&query=portrait"

//game logic 

function playGame() {
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
  url += "&target="+ "FR";
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
      `<li><input type="checkbox" disabled onclick="whenTranslatedWordIsClicked('${word}')"/>${word}</li>`
    );
  } else {
    $(elementID).append(
      `<li><input type="checkbox" onclick="whenSourceWordIsClicked('${word}')"/>${word}</li>`
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

function checkSelection(){
  if ( correctAnswers.get(selectedSourceWord) === selectedTargetWord) {
    alert("YOU ARE CORRECT!!!");
  } else {
    alert('NOPE!!!');
    clearUserSelectionsCheckBox();
  }
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

playGame();
getImage();


//Function to get and display the picture 
function getImage() {
  fetch(imageKey, {
    method: "GET",
    headers: {"Authorization": "563492ad6f91700001000001067ba0f78afa4701a9963ea68164e74c"}
  })
    .then(function (response) {
    if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
    console.log(data);
    //Showing the picture
    var img = $('<img>') 
    img.attr('src', data.photos[0].url);  
    img.appendTo("#image") 
            });
          } else {
            console.log("it doesn't")
          }
        })
}
