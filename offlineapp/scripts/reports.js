window.onload = function(){
    displayInventory()
}
function displayInventory() {
    var inventoryTable = document.getElementById("apparatusTable");
    var brokenApparatusArray = JSON.parse(localStorage.getItem('brokenApparatus'));

    var rowHeader = document.createElement("tr");
    var nameHeader = document.createElement("th")
    var idHeader = document.createElement("th")
    var apparatusHeader = document.createElement("th")
    var quantityHeader = document.createElement("th")
    var btnHeader = document.createElement("th")

    idHeader.innerHTML = "ID Number"
    nameHeader.innerHTML = "Name"
    apparatusHeader.innerHTML = "Apparatus"
    quantityHeader.innerHTML = "Quantity"
    btnHeader.innerHTML = "Actions"

    rowHeader.appendChild(idHeader)
    rowHeader.appendChild(nameHeader)
    rowHeader.appendChild(apparatusHeader)
    rowHeader.appendChild(quantityHeader)
    rowHeader.appendChild(btnHeader)
    inventoryTable.appendChild(rowHeader)

    for (var i = 0; i < brokenApparatusArray.length; i++) {
        var row = document.createElement("tr")
        var nameData = document.createElement("td")
        var idData = document.createElement("td")
        var apparatusData = document.createElement("td")
        var quantityData = document.createElement("td")
        var btnData = document.createElement("td")
        var deleteBtn = document.createElement("button")
        
        deleteBtn.innerHTML = "Clear"
        nameData.innerHTML = brokenApparatusArray[i].studentName
        idData.innerHTML = brokenApparatusArray[i].studentID
        apparatusData.innerHTML = brokenApparatusArray[i].apparatusName
        quantityData.innerHTML = brokenApparatusArray[i].quantity

        deleteBtn.onclick = function(apparatusName, apparatusQuantity, studentID){
            return function(){
                if(confirm("Are you sure student with ID number "+studentID+"has settled the payment for "+apparatusQuantity+" "+apparatusName+"/s that the student broke?") == true){
                    var brokenApparatusArray = JSON.parse(localStorage.getItem('brokenApparatus'));
                    var newBrokenApparatusArray
                    var brokenBorrowerIndex;
                    brokenApparatusArray.forEach(function(entry){
                        if(entry.apparatusName == apparatusName && entry.quantity == apparatusQuantity ){
                            brokenBorrowerIndex = brokenApparatusArray.indexOf(entry)
                            newBrokenApparatusArray = brokenApparatusArray.splice(brokenBorrowerIndex, 1)
                            localStorage.setItem('brokenApparatus', brokenApparatusArray)
                            alert("Successfully removed entry.")
                            location.href = "reports.html"
                        }
                    })
                    
                }
            }
        }(brokenApparatusArray[i].apparatusName, brokenApparatusArray[i].quantity, brokenApparatusArray[i].studentID)

        btnData.appendChild(deleteBtn)
        row.appendChild(idData)
        row.appendChild(nameData)
        row.appendChild(apparatusData)
        row.appendChild(quantityData)
        row.appendChild(btnData)
        inventoryTable.appendChild(row)
    };
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