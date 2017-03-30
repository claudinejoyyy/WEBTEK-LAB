function dragStart(ev) {
   ev.dataTransfer.effectAllowed='move';
   ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));   ev.dataTransfer.setDragImage(ev.target,100,100);
   return true;
}
function dragEnter(ev) {
   ev.preventDefault();
   return true;
}
function dragOver(ev) {
    ev.preventDefault();
}
function dragDrop(ev) {
   var data = ev.dataTransfer.getData("Text");
   ev.target.appendChild(document.getElementById(data));
   ev.stopPropagation();
   return false;
}
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
          var sessionTimeout = 1; //hours
          var loginDuration = new Date();
          loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
          document.cookie = "session=Valid; "+loginDuration.toGMTString()+"; path=/";
          location.href = "../index.html";
        }else{
          alert("Invalid login. Please try again.")
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}