var a;
var b;
var borrowers = [];
var returnees = [];
var borrower;
var returnee;
var source;
var manuals;
var chosenManual;
var inventory;
var bs;

window.onload = function() {

    var addTab = document.getElementById("addTab")
    var borrowedTab = document.getElementById("borrowedTab")
    var returnedTab = document.getElementById("returnedTab")
    var borrowedAndReturnedTab = document.getElementById("borrowedAndReturnedTab")

    // form and divs
    var addForm = document.getElementById("addForm")
    var borrowedDiv = document.getElementById("borrowedDiv")
    var returnedDiv = document.getElementById("returnedDiv")
    var borrowedAndReturnedDiv = document.getElementById("borrowedAndReturnedDiv")

    // form Inputs
    var idInput = document.getElementById("idno")
    var nameInput = document.getElementById("name")
    var grpInput = document.getElementById("grp")
    var idInput = document.getElementById("idno")
    var instructorInput = document.getElementById("instructor")
    var manualInput = document.getElementById("manual")
    var activityInput = document.getElementById("activity")

    addTab.onclick = function() {
        addForm.style.display = "block"
        borrowedDiv.style.display = "none"
        returnedDiv.style.display = "none"
        // borrowedAndReturnedDiv.style.display = "none"
    }

    borrowedAndReturnedTab.onclick = function() {
        addForm.style.display = "none"
        borrowedDiv.style.display = "block"
        returnedDiv.style.display = "block"
        // borrowedAndReturnedDiv.style.display = "block"
        return getBorrowersAndReturnees();
    }

    borrowedTab.onclick = function() {
        addForm.style.display = "none"
        borrowedDiv.style.display = "block"
        returnedDiv.style.display = "none"
        // borrowedAndReturnedDiv.style.display = "block"
        return getBorrower();
    }

    returnedTab.onclick = function() {
        addForm.style.display = "none"
        borrowedDiv.style.display = "none"
        returnedDiv.style.display = "block"
        // borrowedAndReturnedDiv.style.display = "block"
        return getReturnees();
    }
    idInput.min = "2000000";
    idInput.max = "2169999";
    idInput.maxLength = "7";
    idInput.required = true;
    addTab.click();

    var grpInput = document.getElementById("groupno")
    grpInput.min = "1"
    grpInput.max = "20"
    grpInput.maxlength = "1"
    if (document.cookie.indexOf("session=Valid") == -1) {
        location.href = "validate-login.html";
    }
    if (document.URL.indexOf("student.html") >= 0) {
        if (localStorage.getItem("manuals") === null) {
            if (window.confirm('You havent downloaded any manual.\n\nDo you want to download now?')) {
                window.location.href = 'download.html';
            }
        }
        getBorrower();
        getReturnees();
    }

    borrowers = JSON.parse(localStorage.getItem("Borrowers"));
    returnees = JSON.parse(localStorage.getItem("Returnees"));
    if (borrowers == null || returnees == null) {
        borrowers = [];
        returnees = [];
    }

    manuals = JSON.parse(localStorage.getItem('manuals'))
    var manual = document.getElementById("manual");
    // console.log(manuals)
    for (i = 0; i < manuals.length; i++) {
        var option = document.createElement("option");
        option.text = manuals[i].manualName
        // console.log
        option.setAttribute("value", manuals[i].manualName);
        manual.add(option);
    }
}

function getReturnees() {
    rs = JSON.parse(localStorage.getItem('Returnees'))
    var returned = document.querySelectorAll(".returned");

    returned[0].innerHTML = ""
    // returned[1].innerHTML = ""

    if (rs === undefined || rs == null || typeof rs[0] === 'undefined') {
        // array empty or does not exist

    } else {
        for (var i = 0; i < rs.length; i++) {
            var idno = rs[i].idno;
            var name = rs[i].name;
            var groupno = rs[i].groupNumber
            var instructor = rs[i].instructor

            var rows = "<div class='ten columns'>" + "<strong>ID No.: </strong>" + idno + "<br>" + "<strong>Name: </strong>" + name +
                "<br>" + "<strong>Group: </strong>" + groupno + "<br>" + "<strong>Instructor: </strong>" + instructor + "</div>";
            rows += "</div>";

            var entry = document.createElement("div");

            var buttonsColumn = document.createElement("div")
            buttonsColumn.className = "two columns"

            var reviewButton = document.createElement("button");
            reviewButton.innerHTML = "Review"
            // reviewButton.setAttribute("data-id", idno)
            reviewButton.onclick = function(id) {
                return function() {
                    alert(id)
                }
            }(idno);

            //make table row draggable
            entry.id = idno
            entry.className = "row entry"
            entry.setAttribute("draggable", "true");
            entry.setAttribute("ondragstart", "drag(event)");

            buttonsColumn.appendChild(reviewButton);
            entry.innerHTML = rows;
            entry.appendChild(buttonsColumn).parentNode

            returned[0].appendChild(entry);
            // returned[1].appendChild(entry.cloneNode(true));
        }
    }
}

function getBorrowersAndReturnees() {
    getBorrower();
    getReturnees();
}

function getBorrower() {
    bs = JSON.parse(localStorage.getItem('Borrowers'))
    var borrowed = document.querySelectorAll(".borrowed");

    borrowed[0].innerHTML = "";
    // borrowed[1].innerHTML = "";

    if (bs === undefined || bs == null || typeof bs[0] == 'undefined') {
        // array empty or does not exist
        // alert()
    } else {
        for (var i = 0; i < bs.length; i++) {
            // var rows = "";
            var idno = bs[i].idno;
            var name = bs[i].name;
            var groupno = bs[i].groupNumber
            var instructor = bs[i].instructor
            var rows = "<div class='ten columns'>" + "<strong>ID No.: </strong>" + idno + "<br>" + "<strong>Name: </strong>" + name +
                "<br>" + "<strong>Group: </strong>" + groupno + "<br>" + "<strong>Instructor: </strong>" + instructor + "</div>";


            var div = document.createElement("div");
            var entry = document.createElement("div");

            var buttonsColumn = document.createElement("div")
            buttonsColumn.className = "two columns"

            var reviewButton = document.createElement("button");
            reviewButton.className = "reviewBtn"
            reviewButton.innerHTML = "Review"
            reviewButton.id = "review" + idno
            // reviewButton.setAttribute("data-id", idno)
            var apparatusTable = document.createElement("table")

            reviewButton.onclick = function(appTable, id) {
                return function() {
                    // Get the modal
                    var modal = document.getElementById("reviewModal")
                    var inner = document.getElementById("aw")
                    inner.innerHTML = "";
                    var closeBtn = document.createElement("span")
                    closeBtn.className = "close"
                    closeBtn.innerHTML = "&times;"
                    closeBtn.onclick = function() {
                        modal.style.display = "none";
                    }

                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    var appTable = document.createElement("table")
                    appTable.className = "apparatusTable"
                    var header = document.createElement("tr")
                    var quantityHeader = document.createElement("th")
                    var apparatus;

                    var apparatusHeader = document.createElement("th")
                    apparatusTable.border = "1"
                    apparatusHeader.innerHTML = "Apparatus"
                    quantityHeader.innerHTML = "Quantity"

                    header.appendChild(apparatusHeader)
                    header.appendChild(quantityHeader)
                    appTable.appendChild(header)

                    for (var i = 0; i < borrowers.length; i++) {
                        if (borrowers[i].idno == id) {
                            var apparatus = borrowers[i].borrowedApparatus
                            break;
                        }
                    }

                    for (var i = 0; i < apparatus.length; i++) {
                        var row = document.createElement("tr")
                        var app = document.createElement("td");
                        app.innerHTML = apparatus[i].name
                        var quantity = document.createElement("td");
                        quantity.innerHTML = apparatus[i].quantity

                        row.appendChild(app);
                        row.appendChild(quantity);
                        appTable.appendChild(row);
                    };
                    inner.appendChild(closeBtn);
                    inner.appendChild(appTable);
                    modal.style.display = "block";
                }
            }(apparatusTable, idno);

            var returnButton = document.createElement("button");
            returnButton.className = "returnBtn"
            returnButton.innerHTML = "Return"
            // reviewButton.setAttribute("data-id", idno)

            returnButton.onclick = function(id) {
                return function() {
                    alert("Student with id number " + id + " put to returned column")
                    for (var i = 0; i <= borrowers.length; i++) {
                        if (borrowers[i].idno == id) {
                            returnee = borrowers[i];
                            returnees.push(returnee);
                            borrowers.splice(i, 1);
                            sync();
                            getReturnees();
                            break;
                        }
                        alert()
                    }
                    document.getElementById(id).remove();
                    // entry.parentElement.removechild(entry);
                    // document.getElementById("returned").innerHTML = ""
                    // document.getElementById("returnedMobile").innerHTML = ""

                }
            }(idno);

            console.log("aw")
            //make table row draggable
            entry.id = idno
            entry.className = "row entry"
            entry.setAttribute("draggable", "true");
            entry.setAttribute("ondragstart", "drag(event)");

            buttonsColumn.appendChild(reviewButton);
            buttonsColumn.appendChild(returnButton);
            entry.innerHTML = rows;
            entry.appendChild(buttonsColumn).parentNode


            // alert("gg")
            // borrowedAndReturned.appendChild(entry.cloneNode(true));
            borrowed[0].appendChild(entry);
            // borrowed[1].appendChild(entry.cloneNode(true));
            // alert(borrowed.innerHTML)

        }
    }
}

function addData() {
    alert('Added to borrowed table');
    var rows = "";
    var idno = document.getElementById("idno").value;
    var surname = document.getElementById("surname").value;
    var firstName = document.getElementById("firstName").value;
    var groupno = document.getElementById("groupno").value;
    var instructor = document.getElementById("instructor").value;
    var activity = document.getElementById("activities").value;
    var borrowedApparatus;

    surname = surname.trim().toUpperCase();
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    var name = surname+", "+firstName

    for (var cc = 0; cc < Object.keys(b).length; cc++) {
        if (b[cc].activityName == activity) {
            borrowedApparatus = b[cc].apparatus;
            // alert(borrowedApparatus)
        }
    }

    inventory = JSON.parse(localStorage.getItem('inventory'))
    borrowedApparatus.forEach(function(borrowedApparatus){
        inventory.forEach(function(inventoryApparatus){
            if(borrowedApparatus.name == inventoryApparatus.item){
                inventoryApparatus.quantity -= borrowedApparatus.quantity
                alert("awwwwww")
                inventorySync();
            }
        })
    })
    alert("g")
    borrower = {
        idno: idno,
        name: name,
        groupNumber: groupno,
        instructor: instructor,
        borrowedApparatus: borrowedApparatus
    };

    borrowers.push(borrower);
    sync();
    getBorrower();
    resetForm();
}

function inventorySync() {
    localStorage.setItem('inventory', JSON.stringify(inventory))
}

function returns(idno) {
    for (var i = 0; i < borrowers.length; i++) {
        if (borrowers[i].idno == idno) {
            returnee = borrowers[i];
            returnees.push(returnee);
            borrowers.splice(i, 1);
            sync();
            break;
        }
    }
}

function sync() {
    localStorage.setItem('Borrowers', JSON.stringify(borrowers));
    localStorage.setItem('Returnees', JSON.stringify(returnees));
    // getBorrower();
    // getReturnees();
}

// function getApparatus(activity) {
//     var xmlhttp = new XMLHttpRequest();
//     var url = "../json/activities.json";

//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var arr = JSON.parse(this.responseText);
//             var out = "<th>Apparatus</th>";
//             var i;
//             var j;

//             for (i = 0; i < arr.length; i++) {
//                 if (arr[i].activity === activity) {
//                     for (j = 0; j < arr[i].apparatus.length; j++) {
//                         out += '<tr><td>' + arr[i].apparatus[j] + '</td></tr>'
//                     }
//                 }
//             }
//             document.getElementById("apparatus").innerHTML = out;
//         }
//     };
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();
// }

function getApparatus(activityName) {
    // var manualObject;
    var apparatus = []
    var chapters = []
    var downloadedManuals = JSON.parse(localStorage.getItem('manuals'));
    console.log(downloadedManuals)
    downloadedManuals.forEach(function(element1){
        if(element1.manualName === chosenManual){
            // alert()
            // console.log(manualObject)
            chapters = element1.chapters
            // [chapterNumber].apparatus;
        }
    })
    console.log(typeof chapters)
    chapters.forEach(function(element2){
                if(element2.activityName === activityName){
                    apparatus = element2.apparatus;
                }
            })
    
}

function resetForm() {
    var select = document.getElementById("activities")
    for (var i = 0; i <= select.length; i++) {
        if (select.length > 0) {
            select.remove(select.length - 1);
        }
    }

    document.getElementById("person").reset();
}

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.preventDefault();
    var div = document.getElementById(data)
    var btn = div.querySelector(".returnBtn")
    btn.click()

    ev.target.appendChild(document.getElementById(data));
}

function setActivities(man) {

    chosenManual = man;
    document.getElementById('activities').innerHTML = ""
    var downloadedManuals = JSON.parse(localStorage.getItem('manuals'))
    downloadedManuals.forEach(function(element) {
        if (element.manualName === chosenManual) {
            // a = JSON.parse(localStorage.getItem(element));
            b = element.chapters;
            console.log(b)

            for (i = 0; i < b.length; i++) {
                var x = document.getElementById("activities");
                var option = document.createElement("option");
                console.log(b[i].activityName)
                option.text = b[i].activityName;
                option.setAttribute("value", b[i].activityName);
                x.add(option);
            }
        }
    })
}