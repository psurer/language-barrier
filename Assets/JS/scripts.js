//Listening the select tag, for the language
$("#select-bar").on("change", function(event){
    //Save the selected languages in a variable, that will we passed to the API link
      userLanguage=$("#select-bar").val()
      console.log(userLanguage)
    //Saving the value into the local storage
    localStorage.setItem("language", userLanguage);
    console.log(localStorage.getItem("language"))
})

//Saving the user name
$("#fname").on("change", function(event) {
  event.preventDefault();
  userName=$("#fname").val()
  console.log(userName);
  //Saving the value into the local storage
  localStorage.setItem("name", JSON.stringify(userName));
  console.log(localStorage.getItem("name"))
})

//Saving the user last name
$("#lastName").on("change", function(event) {
  event.preventDefault();
  userLastName=$("#lastName").val()
  console.log(userLastName);
  //Saving the value into the local storage
  localStorage.setItem("lastName", JSON.stringify(userLastName));
  console.log(localStorage.getItem("lastName"))
})   
      
//Saving the qty of words
$("#words").on("change", function(event) {
  event.preventDefault();
  wordQty=$("#words").val()
  console.log(wordQty);
     //Saving the value into the local storage
     localStorage.setItem("words", JSON.stringify(wordQty));
     console.log(localStorage.getItem("words"))
 })   

 $("#startGame").on("click", function(){
  var userLanguage=$("#select-bar").val()
  var userLastName=$("#lastName").val()
  var userName=$("#fname").val()
  var wordQty=$("#words").val()
  console.log("---->", userLanguage, userLastName, userName)
if(userLanguage && userLastName && userName && wordQty) {
   console.log("REPLACE")
    window.location.href="game_page.html"
 }
 
 })
