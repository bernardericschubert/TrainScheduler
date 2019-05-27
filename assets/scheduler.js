
var firebaseConfig = {
  apiKey: "AIzaSyCcJhhco5_HWEsPgmR3Gdmao_mP_8ZR-Z4",
  authDomain: "train-scheduler-c8582.firebaseapp.com",
  databaseURL: "https://train-scheduler-c8582.firebaseio.com",
  projectId: "train-scheduler-c8582",
  storageBucket: "train-scheduler-c8582.appspot.com",
  messagingSenderId: "118361571793",
  appId: "1:118361571793:web:71331d2c563fa151"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var first = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency-input").val().trim();

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    first: first,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);
  alert("Schedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var first = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;

  // Math is fun
  var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var remainder = diffTime % frequency;
  var minAway = frequency - remainder;
  var nextArrival = moment().add(minAway, "minutes");
  var formattedTime = moment(nextArrival).format("hh:mm A");

  // Create new row in schedule table
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(formattedTime),
    $("<td>").text(minAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
