// Write your helper functions here!
//require('isomorphic-fetch');

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
// Adding Alerts
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    document.getElementById("pilotName").textContent = pilot;
    document.getElementsByName('copilot').textContent = copilot;
    document.getElementsByName("fuelLevel").textContent = fuelLevel;
    document.getElementsByName("cargoMass").textContent = cargoMass;

    let isValidRequest = true;
    let errMsg = [];

    // if (pilot === "" || copilot === "" || fuelLevel === "" || cargoMass === "") {
    //     alert("All fields are required");
    //     return;
    // }

    // pilot validation
    if (validateInput(pilot) === "Empty") {
        errMsg.push("Pilot name is required");
        isValidRequest = false;
    }
    else if (!isNaN(pilot)){
        errMsg.push("Pilot name must not be a number.");
        isValidRequest = false;
    }

    // co pilot
    if (validateInput(copilot) === "Empty") {
        errMsg.push("Copilot name is required");
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
        errMsg.push("Cago mass is required.");
        isValidRequest = false;
    }
    else if (validateInput(cargoMass) === "Not a Number"){
        errMsg.push("Cargo mass must be a number.");
        isValidRequest = false;
    }

    if (isValidRequest){
        fuelLevel = Number(fuelLevel);
        cargoMass = Number(cargoMass);
        let faultEle = document.getElementById("faultyItems");

        if (fuelLevel < 10000) {        
            

            faultEle.style.visibility = "visible";
            faultEle.innerHTML = `
              <li>Fuel level is too low.</li>
            `;
            faultEle.focus();
        
            //  "Shuttle not ready for launch" and the color to red
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            return;
        }
    
        if (cargoMass > 10000) {
            
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("faultyItems").innerHTML = `
              <li>Cargo mass is too large.</li>
            `;
        
            // Change the text of launchStatus to "Shuttle not ready for launch" and the color to a particular shade of red
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "#C7254E";
            return;
        }

            // If the shuttle is ready to launch
    document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
    document.getElementById("launchStatus").style.color = "#419F6A";
    
    // Update pilotStatus and copilotStatus 
    document.getElementById("pilotStatus").innerHTML = `Pilot: ${pilot}`;
    document.getElementById("copilotStatus").innerHTML = `Copilot: ${copilot}`;
    }
    else{
        let err = '';

        errMsg.forEach(item => {
            err += item + "\n";
        });

        alert(err);
    }
    


    // if (isNaN(fuelLevel)) {
    //     alert("Fuel level must be a number");
    //     return;
    // }

    // if (isNaN(cargoMass)) {
    //     alert("Cargo mass must be a number");
    //     return;
    // }

   


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

// module.exports.addDestinationInfo = addDestinationInfo;
// module.exports.validateInput = validateInput;
// module.exports.formSubmission = formSubmission;
// module.exports.pickPlanet = pickPlanet; 
// module.exports.myFetch = myFetch;
