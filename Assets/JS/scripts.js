var userLanguage;

var spanishApiKey="https://dictionaryapi.com/api/v3/references/spanish/json/test?key=b5ae1ad4-6953-4b14-a6e0-f473b7f23015"
//key, source, target, k , are parameters, you seperate by & 
//example key=a877hjhj&target=FR& and so on
//transation. is substituting wwww. it is called a sub domain , this is how sports.cnn.com/ would be generated
https://translation.googleapis.com/language/translate/v2?key=AIzaSyCv96aME3EBXa609ZV3Pl8Z6rVgFVWmmAc&source=EN&target=FR&q=hello

$("#btnTranslate").click(function (){
  var url = "https://translation.googleapis.com/language/translate/vs?key=AIzaSyCv96aME3EBXa609ZV3Pl8Z6rVgFVWmmAc"

  url += "&source"
})

fetch(spanishApiKey)
    .then(function (response) {
    if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
    console.log(data);
            
            });
          } else {
            console.log("it doesn't")
          }
        })

//Listening the select tag, for the language
$("#select-bar").on("change", function(event){
    //Checking if the user selected a lenguage
    if(!$("#select-bar").val()){
        $("#modal").text("Please select a language")
        console.log(enterValue);
    }
    //Save the selected languages in a variable, that will we passed to the API link
    else {
      userLanguage=$("#select-bar").val()
      console.log(userLanguage)
    }
})

document.getElementById("fname-submit").addEventListener("click", checkFname)

function checkFname(event) {
    var input = document.getElementById("fname")
    var name = input.value
    console.log(name);
   if(name === ""){
       alert("Please write a name!"); 
   } else {
       alert("Thank you!")
   }

};

function numberOfWordsChanged(event){
    console.log(event.srcElement.value);
}

//game logic var
var translatedWords = [];
var words = ["apple", "strawberry", "bread", "tea", "fish"];
var correctAnswers = new Map();
var selectedSourceWord = ''; // Use to save the selected english word
var selectedTargetWord = ''; // Use to save the target language word.

//game logic
function playGame() {
  for (var index = 0; index < words.length; index++) {
    displayWordsToUser(words[index], "#wordsToTranslate");
    translate(words[index]);
  }
}
//calls google API to translate a word
function translate(word) {
  var url =
    "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCv96aME3EBXa609ZV3Pl8Z6rVgFVWmmAc";
  url += "&source=EN";
  url += "&target=FR";
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
      `<li><input type="checkbox" disabled onclick="whenTargetWordIsClicked('${word}')"/>${word}</li>`
    );
  } else {
    $(elementID).append(
      `<li><input type="checkbox" onclick="whenSourceWordIsClicked('${word}')"/>${word}</li>`
    );
  }
}

function whenSourceWordIsClicked(word) {
  selectedSourceWord = word;
  //enable target words list
  $('#translatedWordsList').children('li').children('input').prop('disabled', false);
}

function whenTargetWordIsClicked(word) {
  selectedTargetWord = word;
  //now check the result
  checkSelection();
}

function checkSelection(){
  if ( correctAnswers.get(selectedSourceWord) === selectedTargetWord) {
    alert("YOU ARE CORRECT!!!");
  } else {
    alert('NOPE!!!');
  }
}
playGame();



