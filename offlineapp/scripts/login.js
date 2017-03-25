function validate(username, password)
  {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/users.json";

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var arr = JSON.parse(this.responseText);
          var flag = new Boolean (false);


          for (i = 0; i < arr.length; i++) {
            if (arr[i].username === username && arr[i].password === password) {
              flag = true;
            }
          }

          if (flag === false) {
           alert("validation failed");
          } else {
            location.href = "../index.html";
              alert()
          }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
  }
<<<<<<< HEAD

//   // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById("BR");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// // btn.onclick = function() {
// //     modal.style.display = "block";
// // }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
=======
>>>>>>> c8679272a7796a016bb6daa1eb22641dc2052214
