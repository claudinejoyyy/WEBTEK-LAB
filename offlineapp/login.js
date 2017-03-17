
function validate(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	if ( username == "josh" && password == "123"){
		window.location = "home.html"; // Redirecting to other page.
		return false;
	} else {
		alert ("Invalid");
	}
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}