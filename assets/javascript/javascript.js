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
  $(".chat-screen").hide();
  $("#click-play").show();
  $(".game-buttons").hide();
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
        
      }  else if ((snapshot.child("playerTwo/player").val()=== false) && (snapshot.child("playerOne/player").val()=== false)){
        database.ref("users/playerOne").set({
          player:true,
          });
          $("#click-play").hide();
          $("#feedback").text("Player One");
          $(".chat-screen").show();
          $(".game-buttons").show();
          console.log("playerOne")
          sessionStorage.setItem("user", "Player One");
          database.ref("users/playerOne").onDisconnect().set({
            player:false,
            });
      } else if ((snapshot.child("playerTwo/player").val()=== true) && (snapshot.child("playerOne/player").val()=== false)){
        database.ref("users/playerOne").set({
          player:true,
          });
          $("#click-play").hide();
          $("#feedback").text("Player One");
          $(".chat-screen").show();
          $(".game-buttons").show();
          console.log("playerOne")
          sessionStorage.setItem("user", "Player One");
          database.ref("users/playerOne").onDisconnect(disconnectMessage).set({
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
          $(".chat-screen").show();
          $(".game-buttons").show();
          database.ref("users/playerTwo").onDisconnect(disconnectMessage).set({
            player:false,
            });
    };
  });
  });

  $(".choice").on("click", function(){
    console.log("this")
    var gameChoice = $(this).data();
    var player = firebase.database().ref("users");
    player.once("value")
    .then(function(snapshot){
      
        
      
    });
  });

  

function disconnectMessage() {
  ref("chat-log").onDisconnect().update({
    message: "The Other Player Has Disconnected",
  });
}


// chat functions
  $("#chat-input").on("keyup", function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#send-button").click();
    }
  });

  $("#send-button").on("click", function (){
    var playerMarker = sessionStorage.getItem("user");
    userMessage = playerMarker + ": " + $("#chat-input").val();
    sendMessage();
    $("#chat-input").val("");
    scrollLastMessage();
  });
  
function sendMessage(){
  database.ref("chat-log").set({
    message:userMessage,
    });
    }


database.ref("chat-log").on("value", function(snapshot){  
      if (snapshot.child("message").exists())  {
        var chatMessage = $('<p class="messages">');
        chatMessage.text(snapshot.val().message);
        chatMessage.appendTo(".chat-display")
        userMessage = ""
        database.ref("chat-log").set({
          message:userMessage,
        });
      }
      });



 
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