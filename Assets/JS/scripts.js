var userLanguage;
var spanishApiKey="https://dictionaryapi.com/api/v3/references/spanish/json/test?key=b5ae1ad4-6953-4b14-a6e0-f473b7f23015"
var userName;
//Hide process and congrats pages
$("#P_Page").hide()
$("#Congratulations").hide()

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
    //Save the selected languages in a variable, that will we passed to the API link
      userLanguage=$("#select-bar").val()
      console.log(userLanguage)
})

//login button
document.getElementById("fname-submit").addEventListener("click", checkFname)
function checkFname(event) {
    var input = document.getElementById("fname")
    var userName = input.value
    console.log(userName);
  //if(userName === ""){
  //   alert("Please write a name!"); 
  // } else {
  //    alert("Thank you!")
   }

function numberOfWordsChanged(event){
    console.log(event.srcElement.value);
    var wordQty = event.srcElement.value
    console.log(wordQty);
}

//Listening start btn 
$("#start").on("click", function(){
  var userLanguage=$("#select-bar").val()
  var userName=$("#fname").val()
  var wordQty=$("#languageInput").val()
//Checking if the user entered all the information
//001-no language, no name, yes word qty
if (!userLanguage) {
  $("#modalText").text("Please select the language")
  $('#myModal').modal("show")
  return;
}
//010-no language, yes name, no word qty
else if (!wordQty) {
  $("#modalText").text("Please enter how many words you want to learn today!")
  $('#myModal').modal("show")
}
//011-no language, yes name, yes word qty
else if (!userName) {
  $("#modalText").text("Please enter your name!")
  $('#myModal').modal("show")
}
else {
  //Display the Process page and hide previous information
document.location.replace("")
}
})

//hidden words function
function setDisplayQuestionSection(hidden) {
  questionContainerElement.setAttribute('class', cssClassName);
}

