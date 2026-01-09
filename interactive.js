let elementExample = document.getElementById("element-example").firstElementChild;
let sectionExample = document.getElementsByClassName("interactive-container")[0];
let tagName = sectionExample.id;

let select = document.getElementById("state-select");
let selects = document.getElementsByTagName("select");
let checkboxes = sectionExample.getElementsByTagName("input");

function newClasses() {
    let classString = "";
    for (let i=0; i<selects.length; i++) {
        let val = selects[i].options[selects[i].selectedIndex].value;
        let arrval = val.split(" ");
        classString = classString+" "+ arrval[0] + "-" + tagName;

        if (arrval.length>1) 
        {
            let parts = document.getElementsByClassName("toggle");
            for (let j=0; j<parts.length; j++) {
                parts[j].classList.add("hide");
            }
            for (let j=1; j<arrval.length; j++) {
                parts[Number(arrval[j])-1].classList.remove("hide");
                //console.log(Number(arrval[j])-1 + "unhidden");
            }
        }
    }
    elementExample.className = classString;
}

function checkboxChange() {
    for (let i=0; i<checkboxes.length; i++) {
        if (!checkboxes[i].checked) 
        {
            let parts = document.getElementsByClassName("toggle");
            for (let j=0; j<parts.length; j++) {
                parts[j].classList.add("hide");
            }
            for (let j=1; j<arrval.length; j++) {
                parts[Number(arrval[j])-1].classList.remove("hide");
                //console.log(Number(arrval[j])-1 + "unhidden");
            }
        }
    }
}

for (let i=0; i<checkboxes.length; i++) {
    checkboxes[i].onchange = function(){
        let parts = document.getElementsByClassName("toggle");
        if (checkboxes[i].checked) 
        {
            parts[i].classList.remove("hide");
            console.log("show");
        }
        else
        {
            parts[i].classList.add("hide");
            console.log("hide");
        }
    }
}

for (let i=0; i<selects.length; i++) {
    selects[i].onchange = function(){
        //elementExample.textContent = selects[i].options[selects[i].selectedIndex].value;
        newClasses();
    }
}
