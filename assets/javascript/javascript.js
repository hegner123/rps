var firebaseConfig = {
  apiKey: "AIzaSyDNiASGDyPT5wj1zAz5Gc55g-wYHcjsG10",
  authDomain: "hegner123-38bad.firebaseapp.com",
  databaseURL: "https://hegner123-38bad.firebaseio.com",
  projectId: "hegner123-38bad",
  storageBucket: "",
  messagingSenderId: "385773929972",
  appId: "1:385773929972:web:916def21d4e2b3007f25a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function (){









// chate functions
  $("#chat-input").on("keyup", function(event){

    if (event.keyCode === 13)
  
      event.preventDefault();
      
      $("#send-button").click();
  })

  $("#send-button").on("click", function (){
  })

})