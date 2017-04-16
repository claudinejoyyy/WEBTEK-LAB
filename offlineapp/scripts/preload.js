window.onload = function(){
    if (document.cookie.indexOf("session=Valid") == -1) {
        location.href = "pages/form-login.html";
    } else{
	    var inventory = JSON.parse(localStorage.getItem('inventory'))
        if(inventory == null) setInventory();
    }s
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