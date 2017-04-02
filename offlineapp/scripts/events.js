document.addEventListener("dragstart", function(event) {
    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
});

document.addEventListener("dragend", function(event) {
    // document.getElementById("demo").innerHTML = "Finished dragging the p element.";
    event.target.style.opacity = "1";
});


/* Events fired on the drop target */

// When the draggable entry enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "six columns entry droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// When the draggable entry leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "six columns entry droptarget" ) {
        event.target.style.border = "";
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    // event.preventDefault();
    if ( event.target.className == "six columns entry droptarget" ) {
        // document.getElementById("demo").style.color = "";
        event.target.style.border = "";
        // var data = event.dataTransfer.getData("Text");
        // event.target.appendChild(document.getElementById(data));
        // returns()
    }
});


