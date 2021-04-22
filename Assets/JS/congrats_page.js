function goTo() {
    document.location.href="./game_page.html";
}
var scoreWins = localStorage.getItem("wins");
$("#wins").html(scoreWins);
var scoreLosses = localStorage.getItem("losses");
$("#losses").html(scoreLosses);