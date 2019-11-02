
$(document).ready(function () {


    // Initialize Firebase

    let config = {
        apiKey: "AIzaSyDTXMa39PExEZ3nSd4-pMZo9fQMHuuQWjA",
        authDomain: "karlelisas-test-project.firebaseapp.com",
        databaseURL: "https://karlelisas-test-project.firebaseio.com",
        storageBucket: "karlelisas-test-project.appspot.com"
    };


    firebase.initializeApp(config);

    // Create a variable to reference the database.
    let database = firebase.database();

    let trainRef = database.ref("/schedule");

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        //Cited: https://src-bin.com/en/q/162f894
        //This code bypasses the momnetjs warning of Deprecation warning: moment construction 
        //moment.suppressDeprecationWarnings = true;

        let trainName = $("#train-name-input").val().trim();
        let destination = $("#destination-input").val().trim();
        let firstTrain = moment().format($("#first-train-input").val().trim(), 'h:mm a');
        let frequency = parseInt($("#frequency-input").val().trim());


        let newTrain = {
            name: trainName,
            destination: destination,
            first: firstTrain,
            frequency: frequency,
        };


        trainRef.push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.first);
        console.log(newTrain.frequency);

        // This will clear elements before adding new text. Cleaing input values
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });


    database.ref("/schedule").on("child_added", function (childSnapshot) {
        // storing the snapshot.val() in a variable for convenience

        let trainName = childSnapshot.val().name;
        let destination = childSnapshot.val().destination;
        let firstTrain = childSnapshot.val().first;
        let frequency = childSnapshot.val().frequency;

        console.log('snap is:', childSnapshot.val());


        //***/ https://momentjs.com/***/
        //https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/tree/master/Week_7/01-Activities/21-TrainPredictions
        //makes first train time 

        let trainTime = moment(firstTrain, "h:mm").subtract(1, "years");

        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("h:mm a"));

        //calculate difference between times
        let difference = moment().diff(moment(trainTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + difference);

        //The time apart(remainder)
        let trainRemainder = difference % frequency;
        console.log(trainRemainder);

        //The minutes until arrival
        let minTillArrival = frequency - trainRemainder;
        console.log("MINUTES TILL TRAIN: " + minTillArrival);

        //The next arrival time
        let nextArrival = moment().add(minTillArrival, "minutes").format('h:mm a');
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("h:mm"));

        // Createing the new train schedule row
        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minTillArrival)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);

    });


});








