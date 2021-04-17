var userLanguage;
var spanishApiKey="https://dictionaryapi.com/api/v3/references/spanish/json/test?key=b5ae1ad4-6953-4b14-a6e0-f473b7f23015"

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
        $("#alert-div").text("Please select a language")
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
