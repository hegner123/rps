var firebaseConfig = {
  apiKey: "AIzaSyDNiASGDyPT5wj1zAz5Gc55g-wYHcjsG10",
    authDomain: "hegner123-38bad.firebaseapp.com",
    databaseURL: "https://hegner123-38bad.firebaseio.com",
    projectId: "hegner123-38bad",
    storageBucket: "",
    messagingSenderId: "385773929972",
    appId: "1:385773929972:web:04d34742f6c0d0a17f25a1"
};



firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var userMessage;

$(document).ready(function (){
  
  $("#click-play").show();
  // database.ref("").on("value", function(snapshot){  })
  // database.ref("").set({});

  // click to play. if player one exists then assign player two else assign player one. else if player one and two exist alert that game is full and to try again later,.

  $("#click-play").on("click", function(){
    var player = firebase.database().ref("users");
    player.once("value")
    .then(function(snapshot) {
      if ((snapshot.child("playerOne/player").val()=== true) && (snapshot.child("playerTwo/player").val()=== true))
      {
        $("#feedback").text("Game is Full Please Try Again later");
        $("#click-play").hide();
      }  else if ((snapshot.child("playerTwo/player").val()=== false) && (snapshot.child("playerOne/player").val()=== false)){
        database.ref("users/playerOne").set({
          player:true,
          });
          $("#click-play").hide();
          $("#feedback").text("Player One");
          console.log("playerOne")
          sessionStorage.setItem("user", "Player One");
          database.ref("users/playerOne").onDisconnect().set({
            player:false,
            });
      } else {
        database.ref("users/playerTwo").set({
          player:true,
          });
          console.log("playerTwo")
          sessionStorage.setItem("user", "Player Two");
          $("#click-play").hide();
          $("#feedback").text("Player Two");
          database.ref("users/playerTwo").onDisconnect().set({
            player:false,
            });
    };
  });
  });


  




// chat functions
  $("#chat-input").on("keyup", function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#send-button").click();
    }
  });

  $("#send-button").on("click", function (){
    userMessage = $("#chat-input").val();
    sendMessage();
    $("#chat-input").val("");
    scrollLastMessage();
  });
  
function sendMessage(){
  database.ref("chat-log").set({
    message:userMessage,
    });
    var chatMsg = firebase.database().ref("/chat-log");
    chatMsg.once("value")
    .then(function(snapshot) {
      if (snapshot.child("message").exists())  {
        var chatMessage = $('<p class="messages">');
        var playerMarker = sessionStorage.getItem("user");
        chatMessage.text(playerMarker + ": " + snapshot.val().message);
        chatMessage.appendTo(".chat-display")
        userMessage = ""
        database.ref("chat-log").set({
          message:userMessage,
          });
      }}
      , function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      });

}


 
function scrollLastMessage(){
  
  var div = $(".messages");
    div.scrollTop(div.prop('scrollHeight'));
}






function gameJudge(){
  if ((playerOneGuess === "r") || (playerOneGuess === "p") || (playerOneGuess === "s")) {

    if ((playerOneGuess === "r" && playerTwoGuess === "s") ||
      (playerOneGuess === "s" && playerTwoGuess === "p") || 
      (playerOneGuess === "p" && playerTwoGuess === "r")) {
      wins++;
    } else if (playerOneGuess === playerTwoGuess) {
      ties++;
    } else {
      losses++;
    }};
}


})