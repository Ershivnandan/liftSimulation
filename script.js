let form = document.getElementById("formId");
let formDiv = document.getElementById("formDivId");
let changeSim = document.getElementById("changeSimulation");
let container = document.getElementsByClassName("container")[0];
let simulationArea = document.getElementById("simulationAreaId");

let positions = [];

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
  positions = new Array(parseInt(lift)).fill(1);
  flag = true;

  for (let i = flor; i >= 1; i--) {
    const simulationDiv = document.createElement("div");
    simulationDiv.classList.add("simulation");

    let simulationHeading;

    if (i == flor) {
      simulationHeading = `
      <div class="simulationHeading">
          <h4>Floor : ${i}</h4>
          <span>
            <button class="button-4" onclick="requestLift(${i})">Down</button>
          </span>
        </div>
    `;
    } else if (i == 1) {
      simulationHeading = `
      <div class="simulationHeading">
          <h4>Floor : ${i}</h4>
          <span>
            <button class="button-3" onclick="requestLift(${i})">Up</button>
          </span>
        </div>
    `;
    } else {
      simulationHeading = `
      <div class="simulationHeading simulationItem1">
          <h4>Floor : ${i}</h4>
          <span>
            <button class="button-4" onclick="requestLift(${i})">Down</button>
            <button class="button-3" onclick="requestLift(${i})">Up</button>
          </span>
        </div>
    `;
    }

    if (flag == true && i == 1) {
      let liftContainers = "";

      for (let j = lift; j >= 1; j--) {
        liftContainers += `
        <div class="lift-container" id="lift-${j}">
            <div class="door-left">Lift</div>
            <div class="door-right">${lift - j + 1}</div>
          </div>
      `;
      }

      const liftArea = `
        <div class="liftArea simulationItem2">
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

// Lift movement

function requestLift(floor) {
  console.log(floor);

  let closestLift = null;
  let minDistance = Infinity;

  positions.forEach((currentFloor, liftIndex) => {
    const distance = Math.abs(currentFloor - floor);
    if (distance < minDistance) {
      closestLift = liftIndex;
      minDistance = distance;
    }
  });

  if (positions[closestLift] === floor) {
    openLiftDoors(closestLift);
  } else {
    moveLiftToFloor(closestLift, floor);
  }
}

function moveLiftToFloor(liftIndex, targetFloor) {
  const lift = document.getElementById(`lift-${liftIndex + 1}`);
  const currentFloor = positions[liftIndex];

  const floorDifference = Math.abs(targetFloor - currentFloor);
  const timeToMove = floorDifference * 1;

  lift.style.transition = `transform ${timeToMove}s ease`;
  lift.style.transform = `translateY(${-(targetFloor - 1) * 185}px)`;

  setTimeout(() => {
    positions[liftIndex] = targetFloor;
    openLiftDoors(liftIndex);
  }, timeToMove * 1000);
}

function openLiftDoors(liftIndex) {
  const lift = document.getElementById(`lift-${liftIndex + 1}`);
  const doorLeft = lift.querySelector(".door-left");
  const doorRight = lift.querySelector(".door-right");

  doorLeft.style.width = "0%";
  doorRight.style.width = "0%";

  setTimeout(() => {
    doorLeft.style.width = "50%";
    doorRight.style.width = "50%";
  }, 2000);
}
