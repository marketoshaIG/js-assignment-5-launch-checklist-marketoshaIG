// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");

    missionTarget.innerHTML = `
       <h2>Mission Destination</h2>
       <ol>
          <li>Name: ${name}</li>
          <li>Diameter: ${diameter}</li>
          <li>Star: ${star}</li>
          <li>Distance from Earth: ${distance}</li>
          <li>Number of Moons: ${moons}</li>
       </ol>
       <img src="${imageUrl}" alt="${name} image">
    `;
}
// My Alerts
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let launchStatusEle = document.getElementById("launchStatus")
    let isValidRequest = true;
    let errMsg = [];
    let fLevel = 0;
    let cLevel = 0;
   

    // pre-validation on form fields
    // pilot validation. we will use error msg instead of alert
    if (validateInput(pilot) === "Empty") {
        errMsg.push("Pilot name is required.");
        isValidRequest = false;
    }
    else if (!isNaN(pilot)){
        errMsg.push("Pilot name must not be a number.");
        isValidRequest = false;
    }

    // co pilot
    if (validateInput(copilot) === "Empty") {
        errMsg.push("Copilot name is required.");
        isValidRequest = false;
    }
    else if (!isNaN(copilot)){
        errMsg.push("Copilot name must not be a number.");
        isValidRequest = false;
    }
    else if (copilot === pilot){
        errMsg.push("Must have two different pilots.");
        isValidRequest = false;
    }

    // fuel level
    if (validateInput(fuelLevel) === "Empty"){
        errMsg.push("Fuel level is required.");
        isValidRequest = false;
    }
    else if (validateInput(fuelLevel) === "Not a Number"){
        errMsg.push("Fuel level must be a number.");
        isValidRequest = false;
    }

    // cargo mass
    if (validateInput(cargoMass) === "Empty"){
        errMsg.push("Cargo mass is required.");
        isValidRequest = false;
    }
    else if (validateInput(cargoMass) === "Not a Number"){
        errMsg.push("Cargo mass must be a number.");
        isValidRequest = false;
    }

    // we have enough to determine if launch is good to go
    if (isValidRequest) {
        let isReadyForLaunch = true;

        fLevel = Number(fuelLevel);
        cLevel = Number(cargoMass);
        list.style.visibility = 'visible';

        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        

        if (fLevel < 10000) {
            isReadyForLaunch = false;
            document.getElementById("fuelStatus").innerHTML = 'Fuel level too low for launch';
        } else {
            document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch';
        }
    
        if (cLevel > 10000) {
            isReadyForLaunch = false;
            document.getElementById("cargoStatus").innerHTML = 'Cargo mass too heavy for launch';
        } else {
            document.getElementById("cargoStatus").innerHTML = 'Cargo mass low enough for launch';
        }

        // we are ready for launch
        if (isReadyForLaunch) {
            // If the shuttle is ready to launch
            launchStatusEle.innerHTML = "Shuttle is Ready for Launch";
            launchStatusEle.style.color = "#419F6A";
        }
        else {
            //  "Shuttle not ready for launch" and the color to red
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        }
    }
    else {
        list.style.visibility = 'hidden';
        launchStatusEle.innerHTML = "Awaiting Information Before Launch";
        launchStatusEle.style.color = "#000000";

        // how error message to show in alert box to user
        let err = '';
        errMsg.forEach(item => {
            err += item + "\n";
        });

        alert(err);   
    }
    // document.getElementById("pilotStatus").scrollIntoView();
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
     });
    return planetsReturned;
}

function pickPlanet(planets) {
    const index = Math.floor(Math.random() * planets.length);
    return planets[index];
}
// this works with or without modules commennted? 
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;