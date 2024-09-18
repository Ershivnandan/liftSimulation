let form = document.getElementById("formId")
let formDiv = document.getElementById("formDivId")
let changeSim = document.getElementById("changeSimulation")


function updateSimulation(flag){
    if(flag){
        formDiv.classList.add("displayAppend")
        changeSim.classList.add("displayRemove")
    }
    else{
        formDiv.classList.add("displayRemove")
        changeSim.classList.add("displayAppend")
    }
}

function updateFormPresence(flag){

    if(flag==true){
        formDiv.classList.add("displayRemove")
        changeSim.classList.add("displayAppend")
    }
    else{
        formDiv.classList.add("displayAppend")
        changeSim.classList.add("displayRemove")
    }

}
form.addEventListener('submit', function(event){
    event.preventDefault();

    const flor = document.getElementById("numberOfFloor").value;
    const lift = document.getElementById("numberOfLifts").value;

    console.log("floor: ", flor)
    console.log("lift: ", lift)
    updateFormPresence(true)
});