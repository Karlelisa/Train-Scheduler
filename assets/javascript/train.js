
$(document).ready(function () {


    // Initialize Firebase
    /*   var config = {
          apiKey: "AIzaSyBE4rIfU_He-8pm0yhw6W8ux1lKpQt19h8",
          authDomain: "fir-presence.firebaseapp.com",
          databaseURL: "https://fir-presence.firebaseio.com",
          storageBucket: "fir-presence.appspot.com",
          messagingSenderId: "1029172247104"
      }; */

    var config = {
        apiKey: "AIzaSyDTXMa39PExEZ3nSd4-pMZo9fQMHuuQWjA",
        authDomain: "karlelisas-test-project.firebaseapp.com",
        databaseURL: "https://karlelisas-test-project.firebaseio.com",
        storageBucket: "karlelisas-test-project.appspot.com"
    };


    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    let trainRef = database.ref("/schedule");

    /*   let nextArrival;
      let minutesAway; */

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        //Cited: https://src-bin.com/en/q/162f894
        //This code bypasses the momnetjs warning of Deprecation warning: moment construction 
        //moment.suppressDeprecationWarnings = true;

        let trainName = $("#train-name-input").val().trim();
        let destination = $("#destination-input").val().trim();
        //let firstTrain = $("#first-train-input").val().trim();
        let firstTrain = moment().format($("#first-train-input").val().trim(), 'h:mm a');
        let frequency = parseInt($("#frequency-input").val().trim());
        //let currentTime = moment();

        //***/ https://momentjs.com/***/

        //first train time 
        //let trainTime = moment(firstTrain).format('HH:mm a');
        //let trainTime = moment(firstTrain, "HH:mm").subtract(1, "years");
        /* 
                function calcFirstTrain() {
                let trainTime = moment(firstTrain, "HH:mm").subtract(1, "years");
                    console.log(trainTime);
                    return trainTime;
                } */


        /* let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format('HH:mm a')); */

        //calculate difference between times
        /*    let difference = moment().diff(moment(trainTime), "minutes");
           console.log("DIFFERENCE IN TIME: " + difference); */

        //time apart(remainder)
        /*   let trainRemainder = difference % frequency;
          console.log(trainRemainder);
   */
        //minutes until arrival
        /*   let minTillArrival = frequency - trainRemainder;
          console.log("MINUTES TILL TRAIN: " + minTillArrival); */

        //next arrival time
        /*  let nextArrival = moment().add(minTillArrival, "minutes").format('HH:mm a');
         console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm a")) */


        let newTrain = {
            name: trainName,
            destination: destination,
            first: firstTrain,
            frequency: frequency,
            //nextArrival: nextArrival,
            //minTillArrival: minTillArrival

        };

        //console.log(newTrain)
        //Uploads newTrain object array to firebase
        trainRef.push(newTrain)

        console.log(newTrain.name)
        console.log(newTrain.destination)
        console.log(newTrain.first)
        console.log(newTrain.frequency)
        //trainRef.push(newTrain.nextArrival)
        //trainRef.push(newTrain.minTillArrival)



        // This will clear elements before adding new text. Cleaing input values
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");



        //Do not have to refresh page..Prevents moving to new page
        //return false;

        //database.ref("/schedule").on("child_added", function (snapshot)
        //database.ref("/schedule").on("value", function (snapshot)

        database.ref("/schedule").on("child_added", function (childSnapshot) {
            // storing the snapshot.val() in a variable for convenience

            let trainName = childSnapshot.val().name;
            let destination = childSnapshot.val().destination;
            let firstTrain = childSnapshot.val().first;
            let frequency = childSnapshot.val().frequency;

            // Change the HTML to reflect the stored values

            $('#train-name-input').text(trainName);
            $('#destination-input').text(destination);
            $('#first-train-input').text(firstTrain);
            $('#frequency-input').text(frequency);

            //***/ https://momentjs.com/***/

            //makes first train time 
            //let trainTime = moment(firstTrain).format("HH:mm a");
            let trainTime = moment(firstTrain, "h:mm").subtract(1, "years");
            /* 
                    function calcFirstTrain() {
                    let trainTime = moment(firstTrain, "h:mm").subtract(1, "years");
                        console.log(trainTime);
                        return trainTime;
                    } */


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


            //adding new train items to schedule table
            // Create the new row
            var newRow = $("<tr>").append(
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

});







