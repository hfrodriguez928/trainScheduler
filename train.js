// Initialize firebase 

var config = {
    apiKey: "AIzaSyC6oYssVDO7CJJl7TU4zaTr9f2PxJBR4Ko",
    authDomain: "train-schedule-2f35f.firebaseapp.com",
    databaseURL: "https://train-schedule-2f35f.firebaseio.com",
    projectId: "train-schedule-2f35f",
    storageBucket: "train-schedule-2f35f.appspot.com",
    messagingSenderId: "992083797256"
  };
  firebase.initializeApp(config);Initialize Firebase

// button for adding trains
 $("#add-train-btn").on("click", function(event) {
  event.preventDefault();
