var numOptions = 3;
document.getElementById("btn-add-option").addEventListener("click", (e) => {
    var newOption = document.createElement("div");
    newOption.innerHTML = '<input type="text" id="input-option-' + numOptions + '" placeholder="Option ' + numOptions +'" name="options" size=30 required/>';
    document.getElementById("form-add-poll-options").appendChild(newOption);
    //document.getElementById("form-add-poll-options").innerHTML += '<div><input type="text" placeholder="Option ' + numOptions +'" name="options" required/></div>';
    numOptions++;
    e.preventDefault();
})

document.getElementById("btn-remove-option").addEventListener("click", (e) => {
    if (numOptions > 3) {
        numOptions--;
        document.getElementById("input-option-" + numOptions).remove();
    }
    e.preventDefault();
})