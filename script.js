let form = document.getElementById("formId");
let formDiv = document.getElementById("formDivId");
let changeSim = document.getElementById("changeSimulation");
let container = document.getElementsByClassName("container")[0];
let simulationArea = document.getElementById("simulationAreaId");

// form view update & Form handling

function updateSimulation(flag) {
  if (flag) {
    container.removeChild(changeSim);
    container.appendChild(formDiv);
    container.removeChild(simulationArea)
    changeSim.classList.add("displayRemove");
    simulationArea.classList.add("displayRemove");

  } else {
    container.removeChild(formDiv);
    container.appendChild(changeSim);
    container.appendChild(simulationArea)
    changeSim.classList.remove("displayRemove");
    simulationArea.classList.remove("displayRemove");
  }
}

function updateFormPresence(flag) {
  if (flag) {
    container.removeChild(formDiv);
    container.appendChild(changeSim);
    changeSim.classList.remove("displayRemove");
    simulationArea.classList.remove("displayRemove");
    container.appendChild(simulationArea)
  } else {
    container.removeChild(changeSim);
    container.appendChild(formDiv);
    container.removeChild(simulationArea)
    changeSim.classList.add("displayRemove");
    simulationArea.classList.add("displayRemove");

  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const flor = document.getElementById("numberOfFloor").value;
  const lift = document.getElementById("numberOfLifts").value;

  console.log("floor: ", flor);
  console.log("lift: ", lift);
  updateFormPresence(true);
});


// Creating simulation area dynamically 

let simArea = document.getElementsByClassName("simulationArea");

console.log(simArea)