var a;
var b;
var borrowers = [];
var returnees = [];
var borrower;
var returnee;
var source;

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

function addData() {
    alert('Added to borrowed table');
    var x = document.getElementById("groupno").value;
    var y = document.getElementById("name").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((parseInt(x) != (x)) && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var idno = "ID No.: "+document.getElementById("idno").value;
        var name = "Name: "+document.getElementById("name").value;
        var groupno = "Group: "+document.getElementById("groupno").value;
        var instructor = "Instructor: "+document.getElementById("instructor").value;
        var activity = document.getElementById("activities").value;
        var borrowedApparatus = "";
        var apparatus = "<ul>";

        for (var cc = 1; cc <= Object.keys(b).length; cc++) {
            if (b[cc].activityName == activity) {
                for (var c = 0; c < Object.keys(b[cc].apparatus).length; c++) {
                    borrowedApparatus += b[cc].apparatus[c].name;
                    apparatus += "<li>" + b[cc].apparatus[c].name + "</li>";
                }
            }
        }

        apparatus += "</ul>";
        borrower = {
            name: name,
            groupNumber: groupno,
            instructor: instructor,
            borrowedApparatus: borrowedApparatus
        };
        borrowers.push(borrower);
        // alert(borrower)
        sync();

        // var remarks = document.getElementById("apparatus").value;
        rows += "<div class='t'>"+name + "<br>" + idno + "<br>" + groupno + "<br>" + instructor + "<br>" + "Apparatus: " +apparatus + "<br>"+"</div>";
        var borrowed = document.querySelector("#borrowed");
        var div = document.createElement("div");

        //make table row draggable
        div.id = "div1"
        div.className = "row card entry"
        div.setAttribute("draggable", "true");
        div.setAttribute("ondragstart", "drag(event)");

        div.innerHTML = rows;
        borrowed.appendChild(div);
        resetForm();
    }
}

function resetForm() {
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
