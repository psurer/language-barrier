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

