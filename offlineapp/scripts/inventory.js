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

    var inventory = JSON.parse(localStorage.getItem('inventory'))
    if(inventory == null){
        setInventory();
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

function setInventory() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/Inventory.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);

            localStorage.setItem("inventory", JSON.stringify(arr))
            alert("Inventory was set")
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addApparatusToInventory() {
    var item = document.getElementById("apparatus").value;
    var quantity = +document.getElementById("apparatusQuantity").value;

    var apparatusInventory = JSON.parse(localStorage.getItem('inventory'))

    var apparatus = {
        "item": item,
        "quantity": quantity
    }

    apparatusInventory.push(apparatus);

    localStorage.setItem('inventory', JSON.stringify(apparatusInventory));
    alert(quantity + " " + item + "/s were added to the inventory.");
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
        var editBtn = document.createElement("button")

        editBtn.onclick = function(name){
        	return function(){
        		alert(name)
        	}
        }(apparatusArray[i].item)


        apparatusData.innerHTML = apparatusArray[i].item
        quantityData.innerHTML = apparatusArray[i].quantity
        editBtn.innerHTML = "Edit"

        btnData.appendChild(editBtn)
        row.appendChild(apparatusData)
        row.appendChild(quantityData)
        row.appendChild(btnData)
        inventoryTable.appendChild(row)
    };
}