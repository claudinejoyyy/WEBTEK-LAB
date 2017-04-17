window.onload = function() {
    var addNewItemBtn = document.getElementById("addNewItem")
    var updateItemBtn = document.getElementById("updateItem")
    var addApparatusForm = document.getElementById("addApparatusForm")
    var updateApparatusForm = document.getElementById("updateApparatusForm")
    var searchBar = document.getElementById("search")

    addNewItemBtn.onclick = function() {
        showAdd();
    }

    updateItemBtn.onclick = function() {
        displayInventory();
        showUpdate();
    }

    addApparatusForm.onsubmit = function() {
        addApparatusToInventory();
    }

    searchBar.onkeyup = function() {
        searchApparatus();
    }

}

function showAdd() {
    var updateDiv = document.getElementById("update");
    var addDiv = document.getElementById("add");

    updateDiv.style.display = "none";
    addDiv.style.display = "block";
}

function showUpdate() {
    var updateDiv = document.getElementById("update");
    var addDiv = document.getElementById("add");

    addDiv.style.display = "none";
    updateDiv.style.display = "block";
}

function addApparatusToInventory() {
    var item = document.getElementById("apparatus").value;
    var quantity = +document.getElementById("apparatusQuantity").value;
    var apparatusInventory = JSON.parse(localStorage.getItem('inventory'))
    var flag = true;
    apparatusInventory.forEach(function(apparatus) {
        if (item.toUpperCase() == apparatus.item.toUpperCase()) {
            flag = false;
        }
    })
    if (flag === true) {
        var apparatus = {
            "item": item,
            "quantity": quantity
        }

        apparatusInventory.push(apparatus);

        localStorage.setItem('inventory', JSON.stringify(apparatusInventory));
        alert(quantity + " " + item + "/s were added to the inventory.");
    } else {
        alert("The apparatus " + item + " is already in the inventory")
    }
}

function searchApparatus() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("apparatusTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function displayInventory() {
    var inventoryTable = document.getElementById("apparatusTable");
    var apparatusArray = JSON.parse(localStorage.getItem('inventory'));

    var rowHeader = document.createElement("tr");
    var apparatusHeader = document.createElement("th")
    var quantityHeader = document.createElement("th")
    var btnHeader = document.createElement("th")


    apparatusHeader.innerHTML = "Apparatus"
    quantityHeader.innerHTML = "Quantity"
    btnHeader.innerHTML = "Actions"


    rowHeader.appendChild(apparatusHeader)
    rowHeader.appendChild(quantityHeader)
    rowHeader.appendChild(btnHeader)
    inventoryTable.appendChild(rowHeader)

    for (var i = 0; i < apparatusArray.length; i++) {
        var row = document.createElement("tr")
        var apparatusData = document.createElement("td")
        var quantityData = document.createElement("td")
        var btnData = document.createElement("td")
        var deleteBtn = document.createElement("button")
        var addBtn = document.createElement("button")

        deleteBtn.onclick = function(apparatusName, apparatusQuantity) {
            return function() {
                var apparatusModal = document.getElementById('apparatusModal')
                var inner = document.getElementById('aw')
                inner.innerHTML = ""
                var closeBtn = document.createElement("span")
                closeBtn.className = "close"
                closeBtn.innerHTML = "&times;"
                closeBtn.onclick = function() {
                    apparatusModal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == apparatusModal) {
                        apparatusModal.style.display = "none";
                    }
                }

                var formDiv = document.createElement('div')
                var form = document.createElement('form')
                var titleDiv = document.createElement('div')
                var title = document.createElement('h1')
                var qtyDiv = document.createElement('div')
                var label = document.createElement('label')
                var span = document.createElement('span')
                var qtyInput = document.createElement('input')
                var deleteBtn = document.createElement('input')

                var btnDiv = document.createElement('div')
                btnDiv.className = "form-row"
                
                deleteBtn.id = "deleteApparatusBtn"
                deleteBtn.type = "submit"
                deleteBtn.required = true
                deleteBtn.value = "Submit"

                btnDiv.appendChild(deleteBtn)

                form.onsubmit = function(appName) {
                    return function() {

                        var qty = document.getElementById('qtyInput').value
                        
                        var inventory = JSON.parse(localStorage.getItem('inventory'))
                        var apparatusIndex
                        var updatedApparatus

                        inventory.forEach(function(apparatus) {
                            if (apparatus.item == appName) {
                                apparatusIndex = inventory.indexOf(apparatus)
                                apparatus.quantity -= qty
                                updatedApparatus = apparatus
                            }
                        })
                        inventory[apparatusIndex] = updatedApparatus;
                        localStorage.setItem('inventory', JSON.stringify(inventory))
                        alert(qty + " " + appName + " were removed from the inventory.")
                    }
                }(apparatusName)

                qtyInput.style.width = "auto"
                form.className = "form-basic"
                title.innerHTML = "Delete " + apparatusName
                titleDiv.className = "form-title-row"
                titleDiv.appendChild(title)
                form.appendChild(titleDiv)

                qtyDiv.className = "form-row"
                qtyInput.id = "qtyInput"
                qtyInput.min = "1"
                qtyInput.max = apparatusQuantity
                qtyInput.type = "number"
                qtyInput.required = true;
                span.innerHTML = "Quantity"

                label.appendChild(span)
                label.appendChild(qtyInput)
                qtyDiv.appendChild(label)
                form.appendChild(qtyDiv)
                form.appendChild(btnDiv)
                formDiv.appendChild(form)
                inner.appendChild(closeBtn)
                inner.appendChild(formDiv)

                apparatusModal.style.display = "block"
            }
        }(apparatusArray[i].item, apparatusArray[i].quantity)

        addBtn.onclick = function(apparatusName, apparatusQuantity) {
            return function() {
                var apparatusModal = document.getElementById('apparatusModal')
                var inner = document.getElementById('aw')
                inner.innerHTML = ""
                var closeBtn = document.createElement("span")
                closeBtn.className = "close"
                closeBtn.innerHTML = "&times;"
                closeBtn.onclick = function() {
                    apparatusModal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == apparatusModal) {
                        apparatusModal.style.display = "none";
                    }
                }

                var formDiv = document.createElement('div')
                var form = document.createElement('form')
                var titleDiv = document.createElement('div')
                var title = document.createElement('h1')
                var qtyDiv = document.createElement('div')
                var label = document.createElement('label')
                var span = document.createElement('span')
                var qtyInput = document.createElement('input')
                var deleteBtn = document.createElement('input')

                var btnDiv = document.createElement('div')
                btnDiv.className = "form-row"
                
                deleteBtn.id = "deleteApparatusBtn"
                deleteBtn.type = "submit"
                deleteBtn.required = true
                deleteBtn.value = "Submit"

                btnDiv.appendChild(deleteBtn)

                form.onsubmit = function(appName) {
                    return function() {

                        var qty = document.getElementById('qtyInput').value
                        
                        var inventory = JSON.parse(localStorage.getItem('inventory'))
                        var apparatusIndex
                        var updatedApparatus

                        inventory.forEach(function(apparatus) {
                            if (apparatus.item == appName) {
                                apparatusIndex = inventory.indexOf(apparatus)
                                apparatus.quantity = (parseInt(apparatus.quantity) + parseInt(qty))
                                updatedApparatus = apparatus
                            }
                        })
                        
                        inventory[apparatusIndex] = updatedApparatus;
                        localStorage.setItem('inventory', JSON.stringify(inventory))
                        alert(qty + " " + appName + "/s were added to the inventory.")
                    }
                }(apparatusName)

                qtyInput.style.width = "auto"
                form.className = "form-basic"
                title.innerHTML = "Add " + apparatusName
                titleDiv.className = "form-title-row"
                titleDiv.appendChild(title)
                form.appendChild(titleDiv)

                qtyDiv.className = "form-row"
                qtyInput.id = "qtyInput"
                qtyInput.min = "1"
                qtyInput.max = apparatusQuantity
                qtyInput.type = "number"
                qtyInput.required = true;
                span.innerHTML = "Quantity"

                label.appendChild(span)
                label.appendChild(qtyInput)
                qtyDiv.appendChild(label)
                form.appendChild(qtyDiv)
                form.appendChild(btnDiv)
                formDiv.appendChild(form)
                inner.appendChild(closeBtn)
                inner.appendChild(formDiv)

                apparatusModal.style.display = "block"
            }
        }(apparatusArray[i].item, apparatusArray[i].quantity)

        apparatusData.innerHTML = apparatusArray[i].item
        quantityData.innerHTML = apparatusArray[i].quantity
        deleteBtn.innerHTML = "Delete"
        addBtn.innerHTML = "Add"

        btnData.appendChild(deleteBtn)
        btnData.appendChild(addBtn)
        row.appendChild(apparatusData)
        row.appendChild(quantityData)
        row.appendChild(btnData)
        inventoryTable.appendChild(row)
    };
}