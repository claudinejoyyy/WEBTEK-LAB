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
    for (i = 0; i < manuals.length; i++) {
        var option = document.createElement("option");
        option.text = manuals[i].manualName
        option.setAttribute("value", manuals[i].manualName);
        manual.add(option);
    }
}

            function redirect(){
                addData()
                location.href = "student.html"
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
            var activity = rs[i].activity
            var manual = rs[i].manual
            var rows = "<div class='ten columns'>" + "<strong>ID No.: </strong>" + idno + "<br>" + "<strong>Name: </strong>" + name +
                "<br>" + "<strong>Group: </strong>" + groupno + "<br>" + "<strong>Instructor: </strong>" 
                + instructor + "<br>"+"<strong>Manual: </strong>" + manual +
                 "<br>"+"<strong>Activity: </strong>" + activity +"</div>";


            var div = document.createElement("div");
            var entry = document.createElement("div");

            var buttonsColumn = document.createElement("div")
            buttonsColumn.className = "two columns"

            var reviewButton = document.createElement("button");
            reviewButton.className = "reviewBtn"
            reviewButton.innerHTML = "Review"
            reviewButton.id = "review"
            var apparatusTable = document.createElement("table")

            reviewButton.onclick = function(appTable, id, activityTitle) {
                return function() {
                    var modal = document.getElementById("reviewModal")
                    var inner = document.getElementById("aw")
                    var closeBtn = document.createElement("span")
                    var appTable = document.createElement("table")
                    var header = document.createElement("tr")
                    var quantityHeader = document.createElement("th")
                    var apparatusHeader = document.createElement("th")
                    var apparatus;
                    
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

                    inner.innerHTML = "";
                    appTable.className = "apparatusTable"
                    // apparatusTable.border = "1"
                    apparatusHeader.innerHTML = "Apparatus"
                    quantityHeader.innerHTML = "Quantity"

                    header.appendChild(apparatusHeader)
                    header.appendChild(quantityHeader)
                    appTable.appendChild(header)

                    for (var i = 0; i < returnees.length; i++) {
                        if (returnees[i].idno == id && returnees[i].activity === activityTitle) {
                            var apparatus = returnees[i].borrowedApparatus
                            break;
                        }
                    }

                    for (var i = 0; i < apparatus.length; i++) {
                        var row = document.createElement("tr")
                        var app = document.createElement("td");
                        app.innerHTML = apparatus[i].name
                        var quantity = document.createElement("td");
                        quantity.innerHTML = apparatus[i].quantity
                        var item = apparatus[i]

                        row.appendChild(app);
                        row.appendChild(quantity);
                        appTable.appendChild(row);
                    };
                    var tableTitle = document.createElement('h3')
                    tableTitle.innerHTML = "Borrowed Apparatus"

                    inner.appendChild(closeBtn);
                    inner.appendChild(tableTitle)
                    inner.appendChild(appTable);
                    modal.style.display = "block";
                }
            }(apparatusTable, idno, activity);

            //make table row draggable
            entry.id = idno
            entry.className = "row entry"
            entry.setAttribute("draggable", "true");
            entry.setAttribute("ondragstart", "drag(event)");

            buttonsColumn.appendChild(reviewButton);
            entry.innerHTML = rows;
            entry.appendChild(buttonsColumn).parentNode

            returned[0].appendChild(entry);
            
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
            var activity = bs[i].activity
            var manual = bs[i].manual
            var rows = "<div class='ten columns'>" + "<strong>ID No.: </strong>" + idno + "<br>" + "<strong>Name: </strong>" + name +
                "<br>" + "<strong>Group: </strong>" + groupno + "<br>" + "<strong>Instructor: </strong>" 
                + instructor + "<br>"+"<strong>Manual: </strong>" + manual +
                 "<br>"+"<strong>Activity: </strong>" + activity +"</div>";


            var div = document.createElement("div");
            var entry = document.createElement("div");

            var buttonsColumn = document.createElement("div")
            buttonsColumn.className = "two columns"

            var reviewButton = document.createElement("button");
            reviewButton.className = "reviewBtn"
            reviewButton.innerHTML = "Review"
            reviewButton.id = "review"
            var apparatusTable = document.createElement("table")

            reviewButton.onclick = function(appTable, id, actTitle) {
                return function() {
                    // Get the modal
                    var modal = document.getElementById("reviewModal")
                    var inner = document.getElementById("aw")
                    var closeBtn = document.createElement("span")
                    var appTable = document.createElement("table")
                    var header = document.createElement("tr")
                    var quantityHeader = document.createElement("th")
                    var apparatusHeader = document.createElement("th")
                    var apparatus;

                    
                    
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

                    inner.innerHTML = "";
                    appTable.className = "apparatusTable"
                    // apparatusTable.border = "1"
                    apparatusHeader.innerHTML = "Apparatus"
                    quantityHeader.innerHTML = "Quantity"

                    header.appendChild(apparatusHeader)
                    header.appendChild(quantityHeader)
                    appTable.appendChild(header)

                    for (var i = 0; i < borrowers.length; i++) {
                        if (borrowers[i].idno == id && borrowers[i].activity === actTitle) {
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
                        var item = apparatus[i]

                        app.onclick = function(idNumber, activityName, apparatus){
                            return function(){
                                var brokenApparatus;
                                var brokenAppModal = document.getElementById('brokenAppModal')
                                var inner2 = document.getElementById('aww')
                                var heading  = document.createElement('h3')
                                var form = document.createElement('form')
                                var label = document.createElement('label')
                                var qtyInput = document.createElement('input')
                                var submitBtn = document.createElement('input')
                                var closeBtn = document.createElement("span")
                                submitBtn.className = "submitBtn"
                                inner2.innerHTML = "";

                                heading.id = "brokenApparatus"
                                heading.innerHTML = apparatus.name
                                label.innerHTML = "Broken Quantity: "

                                qtyInput.id = "brokenQty"
                                qtyInput.type = "number"
                                qtyInput.min = "1"
                                qtyInput.max = apparatus.quantity
                                qtyInput.required = true;

                                submitBtn.type = "submit"
                                submitBtn.value = "Submit"

                                closeBtn.className = "close"
                                closeBtn.innerHTML = "&times;"
                                label.innerHTML = "Broken Quantity"

                                closeBtn.onclick = function() {
                                    brokenAppModal.style.display = "none";
                                }

                                modal.onclick = function(event) {
                                    if (event.target == modal) {
                                        brokenAppModal.style.display = "none";
                                    }
                                }
                                form.className = "form-basic"
                                form.onsubmit = function(id, activity){
                                    return function(){
                                        var brokenAppModal = document.getElementById("brokenAppModal")
                                        var reviewModal = document.getElementById("reviewModal")
                                        var borrowers = JSON.parse(localStorage.getItem('Borrowers'))
                                        var brokenApparatus = document.getElementById('brokenApparatus').innerHTML
                                        var brokenApparatusQuantity = document.getElementById('brokenQty').value
                                        var brokenBorrower
                                        var updatedBorrower;
                                        var updatedApparatus;
                                        var updatedApparatusQuantity;
                                        var indexOfBorrower
                                        var indexOfApparatus

                                        borrowers.forEach(function(borrower){
                                            if(id === borrower.idno && activity === borrower.activity){
                                                brokenBorrowerName = borrower.name
                                                var apparatuses = borrower.borrowedApparatus
                                                apparatuses.forEach(function(apparatus){
                                                    if(apparatus.name === brokenApparatus){
                                                        apparatus.quantity -= brokenApparatusQuantity;
                                                        updatedApparatusQuantity = apparatus.quantity
                                                        indexOfApparatus = apparatuses.indexOf(apparatus)
                                                        updatedApparatus = apparatus
                                                    }
                                                })
                                                indexOfBorrower = borrowers.indexOf(borrower)
                                                updatedBorrower = borrower
                                            }
                                        })
                                        // updatedApparatus.quantity = brokenApparatusQuantity
                                        updatedBorrower.borrowedApparatus[indexOfApparatus] = updatedApparatus
                                        borrowers[indexOfBorrower] = updatedBorrower
                                        localStorage.setItem('Borrowers', JSON.stringify(borrowers))

                                        var brokenApparatuses = JSON.parse(localStorage.getItem('brokenApparatuses'))
                                        if(brokenApparatuses == null){
                                            brokenApparatuses = []
                                        }

                                        brokenBorrower = {
                                            studentID: id,
                                            studentName: brokenBorrowerName,
                                            apparatusName: brokenApparatus,
                                            quantity: brokenApparatusQuantity
                                        }
                                        brokenApparatuses.push(brokenBorrower)
                                        localStorage.setItem('brokenApparatus', JSON.stringify(brokenApparatuses))
                                        alert("Successfully added to borrowers with broken apparatuses list.")

                                        brokenAppModal.style.display = "none"


                                    }
                                }(idNumber, activityName)
                                var divLabel = document.createElement('div')
                                divLabel.className = "form-title-row"
                                var header = document.createElement('h2')
                                header.id = "brokenApparatus"
                                header.innerHTML = apparatus.name
                                divLabel.appendChild(header)

                                var divFormRow = document.createElement('div')
                                divFormRow.className = "form-row"
                                var formRowLabel = document.createElement("label")
                                var formRowSpan = document.createElement("span")
                                formRowSpan.innerHTML = "Broken Quantity: "
                                formRowLabel.appendChild(formRowSpan)
                                divFormRow.appendChild(formRowLabel)
                                divFormRow.appendChild(qtyInput)

                                // form.appendChild(divLabel)
                                // form.appendChild(qtyInput)
                                form.appendChild(divLabel)
                                form.appendChild(divFormRow)
                                form.appendChild(submitBtn)

                                inner2.appendChild(closeBtn)
                                // inner2.appendChild(heading)
                                inner2.appendChild(form)

                                brokenAppModal.style.display = "block"
                            }
                        }(id, actTitle, item)

                        row.appendChild(app);
                        row.appendChild(quantity);
                        appTable.appendChild(row);
                    };
                    var tableTitle = document.createElement('h3')
                    tableTitle.innerHTML = "Borrowed Apparatus"

                    inner.appendChild(closeBtn);
                    inner.appendChild(tableTitle)
                    inner.appendChild(appTable);
                    modal.style.display = "block";
                }
            }(apparatusTable, idno, activity);

            var returnButton = document.createElement("button");
            returnButton.className = "returnBtn"
            returnButton.innerHTML = "Return"
            // reviewButton.setAttribute("data-id", idno)

            returnButton.onclick = function(id, activityTitle) {
                return function() {
                    alert("Student with id number " + id + " put to returned column.")
                    for (var i = 0; i <= borrowers.length; i++) {
                        if (borrowers[i].idno === id && borrowers[i].activity === activityTitle) {
                            var inventory = JSON.parse(localStorage.getItem('inventory'))
                            var apparatusIndex
                            var updatedApparatus;
                            var updatedApparatusQuantity;
                            var updatedInventory;

                            inventory.forEach(function(inventoryItem){
                                borrowers[i].borrowedApparatus.forEach(function(borrowedApparatus){
                                    if(inventoryItem.item === borrowedApparatus.name){
                                        apparatusIndex = inventory.indexOf(inventoryItem)
                                        inventoryItem.quantity += borrowedApparatus.quantity
                                        updatedApparatusQuantity = inventoryItem.quantity
                                        updatedApparatus = inventoryItem
                                    }
                                })
                            })
                            inventory[apparatusIndex] = updatedApparatus;
                            localStorage.setItem('inventory', JSON.stringify(inventory))
                            returnee = borrowers[i];
                            returnees.push(returnee);
                            borrowers.splice(i, 1);
                            sync();
                            getReturnees();
                            break;
                        }
                        alert("Inventory was synced.")
                    }
                    document.getElementById(id).remove();
                }
            }(idno, activity);

            //make table row draggable
            entry.id = idno
            entry.className = "row entry"
            entry.setAttribute("draggable", "true");
            entry.setAttribute("ondragstart", "drag(event)");

            buttonsColumn.style.padding = "30px 0px "
            buttonsColumn.appendChild(reviewButton);
            buttonsColumn.appendChild(returnButton);
            entry.innerHTML = rows;
            entry.appendChild(buttonsColumn).parentNode

            borrowed[0].appendChild(entry);
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
    var manual = document.getElementById("manual").value;
    var borrowedApparatus;

    surname = surname.trim().toUpperCase();
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    var name = surname+", "+firstName

    for (var cc = 0; cc < Object.keys(b).length; cc++) {
        if (b[cc].activityName == activity) {
            borrowedApparatus = b[cc].apparatus;
        }
    }

    inventory = JSON.parse(localStorage.getItem('inventory'))
    borrowedApparatus.forEach(function(borrowedApparatus){
        inventory.forEach(function(inventoryApparatus){
            if(borrowedApparatus.name == inventoryApparatus.item){
                inventoryApparatus.quantity -= borrowedApparatus.quantity
                inventorySync();
            }
        })
    })
    borrower = {
        idno: idno,
        name: name,
        groupNumber: groupno,
        instructor: instructor,
        manual: manual,
        activity: activity,
        borrowedApparatus: borrowedApparatus
    };

    borrowers.push(borrower);
    sync();
    location.href = "student.html"
    getBorrower();
    
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
}

function getApparatus(activityName) {
    var apparatus = []
    var chapters = []
    var downloadedManuals = JSON.parse(localStorage.getItem('manuals'));
    downloadedManuals.forEach(function(element1){
        if(element1.manualName === chosenManual){
            chapters = element1.chapters
        }
    })
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

            for (i = 0; i < b.length; i++) {
                var x = document.getElementById("activities");
                var option = document.createElement("option");
                option.text = b[i].activityName;
                option.setAttribute("value", b[i].activityName);
                x.add(option);
            }
        }
    })
}