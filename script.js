let form = document.getElementById("formId");
let formDiv = document.getElementById("formDivId");
let changeSim = document.getElementById("changeSimulation");
let container = document.getElementsByClassName("container")[0];

// form view update & Form handling

function updateSimulation(flag) {
  if (flag) {
    container.removeChild(changeSim);
    container.appendChild(formDiv);
    changeSim.classList.add("displayRemove");
  } else {
    container.removeChild(formDiv);
    container.appendChild(changeSim);
    changeSim.classList.remove("displayRemove");
  }
}

function updateFormPresence(flag) {
  if (flag) {
    container.removeChild(formDiv);
    container.appendChild(changeSim);
    changeSim.classList.remove("displayRemove");
  } else {
    container.removeChild(changeSim);
    container.appendChild(formDiv);
    changeSim.classList.add("displayRemove");
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
