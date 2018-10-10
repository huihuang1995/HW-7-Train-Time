
  var config = {
    apiKey: "AIzaSyDnVwsHy1UY8aZzB4CmvjUv2zmDT3CkZU4",
    authDomain: "hw-7-4621e.firebaseapp.com",
    databaseURL: "https://hw-7-4621e.firebaseio.com",
    projectId: "hw-7-4621e",
    storageBucket: "",
    messagingSenderId: "751967289880"
  };
  firebase.initializeApp(config);


var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    console.log(firstTrain);
    return false;
})

trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})
