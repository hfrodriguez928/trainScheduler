console.log("testing");

// Initialize firebase 
var config = {
    apiKey: "AIzaSyC6oYssVDO7CJJl7TU4zaTr9f2PxJBR4Ko",
    authDomain: "train-schedule-2f35f.firebaseapp.com",
    databaseURL: "https://train-schedule-2f35f.firebaseio.com",
    projectId: "train-schedule-2f35f",
    storageBucket: "train-schedule-2f35f.appspot.com",
    messagingSenderId: "992083797256"
  };

  firebase.initializeApp(config);


var trainData = firebase.database();

$("#add-train-btn").on("click", function (event) {
	event.preventDefault();

	console.log("clicked");
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainUnix = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(firstTrainUnix);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  // Determine when the next train arrives.
  return false;
});

trainData.ref().on("child_added", function (childSnapshot) {
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrainUnix;
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;
  var tArrival = moment().add(tMinutes, "m").format("hh:min A");

// (train-trable > tbody).append()
//   tName
//   tDestination
//   tFrequency
//   tArrival
//   tMinutes

 $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes);

});
