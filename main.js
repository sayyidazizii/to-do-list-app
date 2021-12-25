const selectStart = document.getElementById("selectStart")
const selectEnd = document.getElementById("selectEnd")
const form = document.getElementById("form")
const inputHTML = document.getElementById("inputHTML")
const inputDiv = document.getElementById("inputDiv")
const vertical = document.getElementsByClassName("vertical")
const submitButton = document.getElementById("submitButton")
const navbar = document.getElementById("navbar")
const todolar = document.getElementById("todolar")
const todoul = document.getElementById("todoul")
const popup = document.getElementById("popup")
const popupClose = document.getElementById("popupClose")
const popupDelete = document.getElementById("popupDelete")
const popupEdit = document.getElementById("popupEdit")
const popupBaslık = document.getElementById("popupBaslık")
const popupwwd = document.getElementById("popupwwd")
const popuptime = document.getElementById("popuptime")
const errorDelete = document.getElementById("delete")
const alert = document.getElementById("alert")
const alertWord = document.getElementById("alertWord")
const filter = document.getElementsByClassName("filter-div")
const buttonTable = document.getElementById("button-table")
const buttonCreate = document.getElementById("button-create")
const buttonDelete = document.getElementById("button-delete")
const table = document.getElementById("table")
let liWWD = []
let liStartTime = []
let liEndTime = []
let unique = true;

let whatWillDoEdit;
let hour;

function dropdown(dropdown) {
    for (let hour1 = 0; hour1 < 3; hour1++) {
        if (hour1 == 2) {
            for (let hour2 = 0; hour2 < 5; hour2++) {

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:00`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                if (`${hour1}${hour2}` == "24") {
                    continue;
                }

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:15`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:30`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:45`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

            }
        } else {
            for (let hour2 = 5; hour2 < 10; hour2++) {

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:00`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:15`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:30`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

                var option = document.createElement("option");
                var textnode = document.createTextNode(`${hour1}${hour2}:45`);
                option.appendChild(textnode);
                dropdown.appendChild(option);

            }
        }
    }
}

dropdown(selectStart)
dropdown(selectEnd)

function pro() {
    /*console.log(selectStart.value);
    console.log(selectEnd.value);
    console.log(inputHTML.value);*/

    const whatWillDo = document.getElementsByClassName("whatWillDo")


    if (todoul.childElementCount >= 1) {
        //console.log("a");
        for (let i = 0; i < todoul.childElementCount; i++) {
            //console.log("ab");
            if (whatWillDo[i].textContent == inputHTML.value) {
                //console.log("abc");
                unique = false
            }
        }
    }

    if (inputHTML.value == "") {
        alertWord.textContent = "Please enter an activity"
        alert.style.display = "block"
    } else if (selectStart.value == "Start Time" || selectEnd.value == "End Time") {
        alertWord.textContent = "Please enter your time interval correctly"
        alert.style.display = "block"
    } else if (unique == false) {
        alertWord.textContent = "This activity is already entered"
        alert.style.display = "block"
    } else {
        buttonTable.style.display = "block"
        //console.log(selectStart.value);
        alert.style.display = "none"
        const li = document.createElement("li");
        const divLi = document.createElement("div");
        const divWWD = document.createElement("div");
        const divHour = document.createElement("div");
        divLi.classList.add("li");
        divWWD.classList.add("whatWillDo");
        divHour.classList.add("hour");
        divWWD.textContent = inputHTML.value
        divHour.textContent = `${selectStart.value} AM - ${selectEnd.value} PM`
        divLi.appendChild(divWWD)
        divLi.appendChild(divHour)
        li.appendChild(divLi);

        if (todoul.childElementCount >= 1) {
            const hour = document.getElementsByClassName("hour")
            console.log(todoul.childElementCount);
            for (let i = 0; i < todoul.childElementCount; i++) {
                console.log(i);
                const start_time_li = `${hour[i].textContent[0]}${hour[i].textContent[1]}.${hour[i].textContent[3]}${hour[i].textContent[4]}`
                const start_time_new = `${selectStart.value[0]}${selectStart.value[1]}.${selectStart.value[3]}${selectStart.value[4]}`
                if (Number(start_time_new) < Number(start_time_li)) {
                    console.log(liWWD);
                    todoul.insertBefore(li, todoul.childNodes[i+1])
                    if (i != 0) {
                        liWWD.splice(i, 0, inputHTML.value);
                        liStartTime.splice(i, 0, selectStart.value);
                        liEndTime.splice(i, 0, selectEnd.value);
                    } else {
                        liWWD.splice(0, 0, inputHTML.value);
                        liStartTime.splice(0, 0, selectStart.value);
                        liEndTime.splice(0, 0, selectEnd.value);
                    }

                    console.log(liWWD);
                    //liWWD.push(inputHTML.value)

                    localStorage.setItem("liWWD", liWWD);
                    localStorage.setItem("liStartTime", liStartTime);
                    localStorage.setItem("liEndTime", liEndTime);
                    inputHTML.value = ""
                    selectStart.value = "Start Time"
                    selectEnd.value = "End Time"
                    return;
                } else {
                    todoul.appendChild(li)
                }
            }
        } else {
            todoul.appendChild(li)
        }
        liWWD.push(inputHTML.value)
        liStartTime.push(selectStart.value)
        liEndTime.push(selectEnd.value)
        localStorage.setItem("liWWD", liWWD);
        localStorage.setItem("liStartTime", liStartTime);
        localStorage.setItem("liEndTime", liEndTime);
        inputHTML.value = ""
        selectStart.value = "Start Time"
        selectEnd.value = "End Time"
    }
}

form.addEventListener("submit", pro);

function show(e) {
    li = e.target
    if (e.target.classList.value == "li") {
        //console.log(e.target);
        filter[0].classList.add("filter");
        filter[1].classList.add("filter");
        filter[2].classList.add("filter");
        popup.style.display = "block"
        popupBaslık.textContent = li.childNodes[1].textContent
        popupwwd.textContent = li.childNodes[0].textContent
    }
}

function close(e) {
    filter[0].classList.remove("filter");
    filter[1].classList.remove("filter");
    filter[2].classList.remove("filter");
    popup.style.display = "none"
}

function edit(e) {
    const whatWillDo = document.getElementsByClassName("whatWillDo")
    popup.style.display = "none"
    filter[0].classList.remove("filter");
    filter[1].classList.remove("filter");
    filter[2].classList.remove("filter");
    inputHTML.value = popupwwd.textContent.trim()
    //console.log(popupBaslık.textContent[10]);
    selectStart.value = `${popupBaslık.textContent[0]}${popupBaslık.textContent[1]}${popupBaslık.textContent[2]}${popupBaslık.textContent[3]}${popupBaslık.textContent[4]}`
    selectEnd.value = `${popupBaslık.textContent[11]}${popupBaslık.textContent[12]}${popupBaslık.textContent[13]}${popupBaslık.textContent[14]}${popupBaslık.textContent[15]}`
    if (todoul.childElementCount == 1) {
        todoul.childNodes[0].remove()
    }
    for (let i = 0; i < todoul.childElementCount; i++) {
        if (whatWillDo[i].textContent == popupwwd.textContent) {
            todoul.childNodes[i].remove()
            //console.log("a");
            liWWD.splice(i, 1);
            liStartTime.splice(i, 1)
            liEndTime.splice(i, 1)
            localStorage.setItem("liWWD", liWWD);
            localStorage.setItem("liStartTime", liStartTime);
            localStorage.setItem("liEndTime", liEndTime);
        }
    }

    if (todoul.childNodes.length == 0) {
        buttonTable.style.display = "none"
    }
}

function deleteli(e) {
    const whatWillDo = document.getElementsByClassName("whatWillDo")
    filter[0].classList.remove("filter");
    filter[1].classList.remove("filter");
    filter[2].classList.remove("filter");
    popup.style.display = "none"

    if (todoul.childElementCount == 1) {
        todoul.childNodes[0].remove()
    }

    for (let i = 0; i < todoul.childElementCount; i++) {
        if (whatWillDo[i].textContent == popupwwd.textContent) {
            if (todoul.childElementCount == 1) {
                todoul.firstChild.remove()
            } else(
                todoul.childNodes[i + 1].remove()
            )

            liWWD.splice(i, 1);
            liStartTime.splice(i, 1)
            liEndTime.splice(i, 1)
            localStorage.setItem("liWWD", liWWD);
            localStorage.setItem("liStartTime", liStartTime);
            localStorage.setItem("liEndTime", liEndTime);

        }
    }

    if (todoul.childNodes.length == 0) {
        buttonTable.style.display = "none"
    }

}

function createTable(e) {
    const hour = document.getElementsByClassName("hour")
    const whatWillDo = document.getElementsByClassName("whatWillDo")

    table.innerHTML = `
    <thead>
    <tr id="trawhead">

    </tr>
  </thead>
  <tbody>
    <tr id="trawbody">

    </tr>
    </tbody>
    `

    for (let i = 0; i < todoul.childElementCount; i++) {
        const trawhead = document.getElementById("trawhead")
        const th = document.createElement("th");
        th.textContent = `${hour[i].textContent[0]}${hour[i].textContent[1]}${hour[i].textContent[2]}${hour[i].textContent[3]}${hour[i].textContent[4]} - ${hour[i].textContent[11]}${hour[i].textContent[12]}${hour[i].textContent[13]}${hour[i].textContent[14]}${hour[i].textContent[15]} `
        trawhead.appendChild(th)
        const trawbody = document.getElementById("trawbody")
        const td = document.createElement("td");
        td.textContent = `${whatWillDo[i].textContent}`
        trawbody.appendChild(td)
    }
}

function deleteTable(e) {
    if (table.innerHTML == ``) {
        alertWord.textContent = "You have to create a table first"
        alert.style.display = "block"
    }
    table.innerHTML = ``
}

todoul.addEventListener("click", show);
popupClose.addEventListener("click", close)
popupEdit.addEventListener("click", edit)
popupDelete.addEventListener("click", deleteli)
buttonDelete.addEventListener("click", deleteTable)
buttonCreate.addEventListener("click", createTable)

inputHTML.addEventListener("focus", () => {
    vertical[0].style.backgroundColor = "#ffc833"
    inputDiv.style.borderBottom = "1px solid #ffc833"
    submitButton.style.backgroundColor = "#ffc833"
});

inputHTML.addEventListener("focusout", () => {
    vertical[0].style.backgroundColor = "#00925c"
    inputDiv.style.borderBottom = "2px solid #00925c"
    submitButton.style.backgroundColor = "#00925c"
});

errorDelete.addEventListener('click', function (event) {
    alert.style.display = "none"
});

window.addEventListener('load', (event) => {

    if (localStorage.getItem("liWWD") != null) {
        liWWD = localStorage.getItem("liWWD").split(',')
    }
    if (localStorage.getItem("liStartTime") != null) {
        liStartTime = localStorage.getItem("liStartTime").split(',')
    }
    if (localStorage.getItem("liEndTime") != null) {
        liEndTime = localStorage.getItem("liEndTime").split(',')
    }

    if (liWWD[0] == "") {
        liWWD.splice(0, 1);
        liStartTime.splice(0, 1)
        liEndTime.splice(0, 1)
        localStorage.setItem("liWWD", liWWD);
        localStorage.setItem("liStartTime", liStartTime);
        localStorage.setItem("liEndTime", liEndTime);
    }

    //console.log(liWWD.length);
    for (let i = 0; i < liWWD.length; i++) {
        buttonTable.style.display = "block"
        const li = document.createElement("li");
        const divLi = document.createElement("div");
        const divWWD = document.createElement("div");
        const divHour = document.createElement("div");
        divLi.classList.add("li");
        divWWD.classList.add("whatWillDo");
        divHour.classList.add("hour");
        divWWD.textContent = liWWD[i]
        divHour.textContent = `${liStartTime[i]} AM - ${liEndTime[i]} PM`
        divLi.appendChild(divWWD)
        divLi.appendChild(divHour)
        li.appendChild(divLi);
        todoul.appendChild(li)
    }

});