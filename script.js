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
    container.removeChild(simulationArea);
    changeSim.classList.add("displayRemove");
    simulationArea.classList.add("displayRemove");
  } else {
    container.removeChild(formDiv);
    container.appendChild(changeSim);
    container.appendChild(simulationArea);
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
    container.appendChild(simulationArea);
  } else {
    container.removeChild(changeSim);
    container.appendChild(formDiv);
    container.removeChild(simulationArea);
    changeSim.classList.add("displayRemove");
    simulationArea.classList.add("displayRemove");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const flor = document.getElementById("numberOfFloor").value;
  const lift = document.getElementById("numberOfLifts").value;

  // console.log("floor: ", flor);
  // console.log("lift: ", lift);
  updateFormPresence(true);
  generateSimulation(flor, lift);
});

function generateSimulation(flor, lift) {
  console.log("called", flor, lift);

  simulationArea.innerHTML = "";
  flag = true;
  for (let i = flor; i >= 1; i--) {
    const simulationDiv = document.createElement("div");
    simulationDiv.classList.add("simulation");

    const simulationHeading = `
      <div class="simulationHeading">
          <h4>Floor : ${i}</h4>
          <span>
            <button class="button-3">Up</button>
          </span>
        </div>
    `;

    if (flag == true && i == 1) {
      let liftContainers = "";

      for (let j = lift; j >= 1; j--) {
        liftContainers += `
        <div class="lift-container">
            <div class="door-left"></div>
            <div class="door-right"></div>
          </div>
      `;
      }

      const liftArea = `
        <div class="liftArea">
        ${liftContainers}
        </div>
      `;
      simulationDiv.innerHTML = simulationHeading + liftArea;
      simulationArea.appendChild(simulationDiv);

      flag = false;
    } else {
      simulationDiv.innerHTML = simulationHeading;
      simulationArea.appendChild(simulationDiv);
    }
  }

  simulationArea.classList.remove("displayRemove");
}
