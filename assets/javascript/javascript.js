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

  // click to play. if player one exists then assign player two else assign player one. else if player one and two exist aler that game is full and to try again later,.

  $("#click-play").on("click", function(){
    var x = firebase.database().ref("users");
    x.once("value")
    .then(function(snapshot) {
      if (snapshot.child("playerOne/player").val()=== true){
        database.ref("users/playerTwo").set({
          player:true,
          });
          console.log("playerTwo")
      } else {
        database.ref("users/playerOne").set({
          player:true,
          });
          console.log("playerOne")
      }
    }
    );
    $("#click-play").hide();
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
    

  })

function sendMessage(){
  database.ref("chat-log").set({
    message:userMessage,
    });
}

database.ref("/chat-log").on("value", function(snapshot) {
  if (snapshot.child("message").exists())  {
    var chatMessage = $("<p>");
    chatMessage.text(snapshot.val().message);
    chatMessage.appendTo(".chat-display")
    userMessage = ""
    database.ref("chat-log").set({
      message:userMessage,
      });
  }}
  , function(errorObject) {
  console.log("The read failed: " + errorObject.code);
  });
 







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