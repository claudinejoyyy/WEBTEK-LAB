// fixed validtion of user credentials
function validate(){
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/users.json";
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var users = JSON.parse(this.responseText);
        var flag = new Boolean (false);

        for (i = 0; i < Object.keys(users).length; i++) {
          if (username == users[i].username && password == users[i].password) {
            flag = true;
          }
        }
            
        if (flag === true) {
          alert("Validation success! Welcome "+username);
          location.href = "../index.html";
        }else{
          alert("Invalid login. Please try again.")
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}