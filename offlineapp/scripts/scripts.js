var a;
var b;
var borrowers = [];
var returnees = [];
var borrower;
var returnee;
var source;
var bs;
getBorrower();
getReturnees();

function getReturnees(){
    rs = JSON.parse(localStorage.getItem('Returnees'))
    if (rs === undefined || rs == null || typeof rs[0] === 'undefined') {
        // array empty or does not exist
        
    }else{
        
        for(var i = 0; i < rs.length; i++){
            // var rows = "";
            
            var idno = rs[i].idno;
            var name = rs[i].name   ;
            var groupno = rs[i].groupNumber
            var instructor = rs[i].instructor
            
            var rows = "<div class='t'>"+"ID No.: "+idno+"<br>"+"Name: "+name+ 
            "<br>"+"Group: "+groupno+"<br>"+"Instructor: "+instructor;
            var apparatus = "<ul>";

            for(var j = 0; j < rs[i].borrowedApparatus.length; j++){
                apparatus += "<li>" + rs[i].borrowedApparatus[j].name + "</li>";
            }

            apparatus += "</ul>" 
            rows += "<br>"+"Apparatus: "+apparatus+"</div>"
            var borrowed = document.querySelector("#div");
            var div = document.createElement("div");

            //make table row draggable
            div.id = "div1"
            div.className = "row card entry"
            div.setAttribute("draggable", "true");
            div.setAttribute("ondragstart", "drag(event)");
            // div.setAttribute("ondragend", "returns("+idno+")");
            div.innerHTML = rows;
            
            borrowed.appendChild(div);
        }
    }
}

// check if Borrowers item in local storage is empty
// if empty, re initialize as array
// else, set local storage data of Borrowers to var borrowers
{
borrowers = JSON.parse(localStorage.getItem("Borrowers"));
returnees = JSON.parse(localStorage.getItem("Returnees"));
    if(borrowers == null || returnees == null){
        borrowers = [];
        returnees = [];
    }
}

function addData() {
    alert('Added to borrowed table');
    var x = document.getElementById("groupno").value;
    var y = document.getElementById("name").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((parseInt(x) != (x)) && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var idno = document.getElementById("idno").value;
        var name = document.getElementById("name").value;
        var groupno = document.getElementById("groupno").value;
        var instructor = document.getElementById("instructor").value;
        var activity = document.getElementById("activities").value;
        var borrowedApparatus;
        var apparatus = "<ul>";

        for (var cc = 1; cc <= Object.keys(b).length; cc++) {
            if (b[cc].activityName == activity) {
                borrowedApparatus = b[cc].apparatus;
                for (var c = 0; c < Object.keys(b[cc].apparatus).length; c++) {
                    // borrowedApparatus += b[cc].apparatus[c].name;
                    // borrowedApparatus += ", "
                    apparatus += "<li>" + b[cc].apparatus[c].name + "</li>";
                }
            }
        }

        apparatus += "</ul>";
        borrower = {
            idno: idno,
            name: name,
            groupNumber: groupno,
            instructor: instructor,
            borrowedApparatus: borrowedApparatus
        };
        borrowers.push(borrower);
        // alert(borrower)
        sync();

        // var remarks = document.getElementById("apparatus").value;
        rows += "<div class='t'>"+"ID No.: "+idno + "<br>" + "Name: "+name + "<br>"+"Group: "+ groupno + "<br>" +"Instructor: " + instructor + "<br>" + "Apparatus: " +apparatus + "<br>"+"</div>";
        var borrowed = document.querySelector("#borrowed");
        var div = document.createElement("div");

        //make table row draggable
        div.id = "div1"
        div.className = "row card entry"
        div.setAttribute("draggable", "true");
        div.setAttribute("ondragstart", "drag(event)")
        div.setAttribute("ondragend", "returns("+idno+")");

        div.innerHTML = rows;
        borrowed.appendChild(div);
        resetForm();
    }
}

// remove borrower from borrowers variable and add to returnees variable
function returns(idno){
    // alert("wawets")
    for(var i = 0; i < borrowers.length; i++) {
    if(borrowers[i].idno == idno) {
        returnee = borrowers[i];
        returnees.push(returnee);
        borrowers.splice(i, 1);
        sync();
        break;
    }
}
}

// store in var bs content of local storage item Borrowers
// and iterate and display per object on screen 
function getBorrower(){
    bs = JSON.parse(localStorage.getItem('Borrowers'))
    if (bs === undefined || bs == null || typeof bs[0] == 'undefined') {
        // array empty or does not exist
        // alert()
    }else{
        for(var i = 0; i < bs.length; i++){
            // var rows = "";
            var idno = bs[i].idno;
            var name = bs[i].name   ;
            var groupno = bs[i].groupNumber
            var instructor = bs[i].instructor
            // alert()
            var rows = "<div class='t'>"+"ID No.: "+idno+"<br>"+"Name: "+name+ 
            "<br>"+"Group: "+groupno+"<br>"+"Instructor: "+instructor;
            var apparatus = "<ul>";

            for(var j = 0; j < bs[i].borrowedApparatus.length; j++){
                apparatus += "<li>" + bs[i].borrowedApparatus[j].name + "</li>";
            }

            apparatus += "</ul>" 
            rows += "<br>"+"Apparatus: "+apparatus+"</div>"
            var borrowed = document.querySelector("#borrowed");
            var div = document.createElement("div");

            //make table row draggable
            div.id = "div1"
            div.className = "row card entry"
            div.setAttribute("draggable", "true");
            div.setAttribute("ondragstart", "drag(event)");
            div.setAttribute("ondragstart", "returns("+idno+")");
            div.innerHTML = rows;
            borrowed.appendChild(div);
        }
    }
}




// check if logged in
// if (document.cookie.indexOf("session=Valid") == -1) {
//      location.href = "validate-login.html";
// }

function sync() {
    localStorage.setItem('Borrowers', JSON.stringify(borrowers));
    localStorage.setItem('Returnees', JSON.stringify(returnees));
}

function getApparatus(activity) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/activities.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var out = "<th>Apparatus</th>";
            var i;
            var j;

            for (i = 0; i < arr.length; i++) {
                if (arr[i].activity === activity) {
                    for (j = 0; j < arr[i].apparatus.length; j++) {
                        out += '<tr><td>' + arr[i].apparatus[j] + '</td></tr>'
                    }
                }
            }
            document.getElementById("apparatus").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function getApparatus(activity){
    var manual = JSON.parse(localStorage.getItem('Manual'));
    var apparatus = manual
}



function resetForm() {
    var select = document.getElementById("activities")
    for(var i = 0; i <= select.length; i++){
        if (select.length > 0) {
            select.remove(select.length-1);
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
    ev.preventDefault();
    // returns();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function setManual(manual) {
    document.getElementById("download").setAttribute('onclick', "downloadManual('" + manual + "')");
    //.onclick =  "downloadManual('"+manual+"')"
}

function downloadManual(manual) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/" + manual + ".json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;

            localStorage.setItem(manual, JSON.stringify(arr))
            alert('Manual downloaded!');
            a = JSON.parse(localStorage.getItem(manual));
            var select = document.getElementById("manual");
            // select.options[select.options.length] = new Option(a, i);
            var manuals = [];
            manuals.push(a.manualName);
            localStorage.setItem('manuals', JSON.stringify(manuals))
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function setActivities(manual) {
    a = JSON.parse(localStorage.getItem(manual));
    b = a.chapters;

    for (i = 1; i <= Object.keys(b).length; i++) {
        var x = document.getElementById("activities");
        var option = document.createElement("option");
        option.text = b[i].activityName;
        option.setAttribute("value", b[i].activityName);
        x.add(option);
    }
}
    var g = JSON.parse(localStorage.getItem('manuals'))

    for (i = 0; i < g.length; i++) {
        var x = document.getElementById("manual");
        var option = document.createElement("option");
        option.text = g[i]
        option.setAttribute("value", g[i]);
        x.add(option);
    }

