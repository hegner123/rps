var firebaseConfig = {
  apiKey: "AIzaSyDNiASGDyPT5wj1zAz5Gc55g-wYHcjsG10",
    authDomain: "hegner123-38bad.firebaseapp.com",
    databaseURL: "https://hegner123-38bad.firebaseio.com",
    projectId: "hegner123-38bad",
    storageBucket: "",
    messagingSenderId: "385773929972",
    appId: "1:385773929972:web:04d34742f6c0d0a17f25a1"
};

var game = {
  playerOneWins:0,
  playerOneLoss:0,
  playerTwoWins:0,
  playerTwoLoss:0,
  tie:0
}



firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var userMessage;

$(document).ready(function (){
  $(".opponent-choice-screen").hide();
  $(".matchmaking-screen").hide();
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
      if ((snapshot.child("playerOne/player").val()=== true) && (snapshot.child("playerTwo/player").val()=== true)){
        $("#feedback").text("Game is Full Please Try Again later");
      }  else if ((snapshot.child("playerTwo/player").val()=== false) && (snapshot.child("playerOne/player").val()=== false)){
        database.ref("users/playerOne").set({
          player:true,
          choice: "none"
          });
          $("#click-play").hide();
          $("#feedback").text("Player One");
          $(".chat-screen").show();
          $(".matchmaking-screen").show();
          console.log("playerOne")
          sessionStorage.setItem("user", "Player One");
          sessionStorage.setItem("game", "play");
          database.ref("users/playerOne").onDisconnect().set({
            player:false,
            choice: "none"
            });
      } else if ((snapshot.child("playerTwo/player").val()=== true) && (snapshot.child("playerOne/player").val()=== false)){
        database.ref("users/playerOne").set({
          player:true,
          choice: "none"
          });
          $("#click-play").hide();
          $("#feedback").text("Player One");
          $(".chat-screen").show();
          $(".matchmaking-screen").hide();
          console.log("playerOne")
          sessionStorage.setItem("user", "Player One");
          sessionStorage.setItem("game", "play");
          database.ref("users/playerOne").onDisconnect().set({
            player:false,
            choice: "none"
            });
          } else {
        database.ref("users/playerTwo").set({
          player:true,
          choice: "none"
          });
          console.log("playerTwo")
          sessionStorage.setItem("user", "Player Two");
          sessionStorage.setItem("game", "play");
          $("#click-play").hide();
          $("#feedback").text("Player Two");
          $(".chat-screen").show();
          $(".matchmaking-screen").hide();
          database.ref("users/playerTwo").onDisconnect().set({
            player:false,
            choice: "none"
            });
    };
    database.ref("users").on("value", function(snapshot){  
      if ((sessionStorage.getItem("game") === "play") && (snapshot.child("playerOne/player").val() === true) && (snapshot.child("playerTwo/player").val() === true)){
        $(".matchmaking-screen").hide();
        $(".game-buttons").show();
        
      } else {
        ;
      };
    })
  });
  });

  



  $(".choice").on("click", function(){
   
    $(".opponent-choice-screen").show();
    
    var gameChoice = $(this).attr("data");
    console.log(gameChoice);
    if (sessionStorage.getItem("user")=== "Player One"){
      database.ref("users/playerOne").set({
        player:true,
        choice:gameChoice
        });
    } else if (sessionStorage.getItem("user")=== "Player Two" ){
      database.ref("users/playerTwo").set({
        player:true,
        choice:gameChoice
        });
    };
    $(".game-buttons").hide();
    database.ref("users").on("value", function(snapshot){
      if ((snapshot.child("playerOne/choice").val() !== "none") && (snapshot.child("playerTwo/choice").val() !== "none")){
      var playerOneGuess = snapshot.child("playerOne/choice").val();
      var playerTwoGuess = snapshot.child("playerTwo/choice").val();

      if ((playerOneGuess === "rock") || (playerOneGuess === "paper") || (playerOneGuess === "scissors")) {

      if ((playerOneGuess === "rock" && playerTwoGuess === "scissors") ||
      (playerOneGuess === "scissors" && playerTwoGuess === "paper") || 
      (playerOneGuess === "paper" && playerTwoGuess === "rock")) {
       
      $(".result").text("PLAYER ONE WINS");
      } else if (playerOneGuess === playerTwoGuess) {
        $(".result").text("YOU TIED");
      } else {
        $(".result").text("PLAYER TWO WINS");
      }};
      $(".opponent-choice-screen").hide();
     
      resetGameState();
      }
    })
  });




  function resetGameState(){
    var rest = firebase.database().ref("users");
    rest.once("value")
    .then(function(snapshot) {
      if (sessionStorage.getItem("user")=== "Player One"){
        database.ref("users/playerOne").set({
          player:true,
          choice: "none"
          });
      } else if (sessionStorage.getItem("user")=== "Player Two") {
        database.ref("users/playerTwo").set({
          player:true,
          choice: "none"
          });
    }
  }
  )};

  





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
        chatMessage.prependTo(".chat-display");
        userMessage = "";
        database.ref("chat-log").set({
          message:userMessage,
        });
      }
      });



 












})