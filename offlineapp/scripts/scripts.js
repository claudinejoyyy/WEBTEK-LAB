var a;
var b;

function getApparatus(activity){
	var xmlhttp = new XMLHttpRequest();
	var url = "../json/activities.json";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var arr = JSON.parse(this.responseText);
	        // displayApparatus(myArr, getApparatus);
	        var out = "<th>Apparatus</th>";
		    var i;
		    var j;

		    for(i = 0; i < arr.length; i++) {
		        if(arr[i].activity === activity){
				for (j = 0; j < arr[i].apparatus.length; j++) {
			        	out += '<tr><td>' + arr[i].apparatus[j]+ '</td></tr>'
			        }
				}
		    }
				document.getElementById("apparatus").innerHTML = out;
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function addData() {
    var x = document.getElementById("groupno").value;
    var y = document.getElementById("name").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((parseInt(x) != (x)) && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var name = document.getElementById("name").value;
        var groupno = document.getElementById("groupno").value;
        var instructor = document.getElementById("instructor").value;
        var apparatus = document.getElementById("apparatus").value;

        rows += "<td>" + name + "</td><td>" + groupno + "</td><td>" + instructor + "</td><td>" + apparatus + "</td>";
        var tbody = document.querySelector("#list tbody");
        var tr = document.createElement("tr");

        //make table row draggable
        tr.setAttribute("draggable", "true");
        tr.setAttribute("ondragenter", "dragenter(event)");
        tr.setAttribute("ondragstart", "dragstart(event)");

        tr.innerHTML = rows;
        var emptyRow;
        for(var i = 0; i < 4; i++){
        	emptyRow += "<td></td>"
        }
        tbody.appendChild(tr);
        tr = emptyRow;
        tbody.appendchild(tr);

        //
    }
}

function resetForm() {
    document.getElementById("person").reset();
}

var source;

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

function dragenter(e) {
    var targetelem = e.target;
    if (targetelem.nodeName == "TD") {
       targetelem = targetelem.parentNode;   
    }  

    if (isbefore(source, targetelem)) {
        targetelem.parentNode.insertBefore(source, targetelem);
    } else {
        targetelem.parentNode.insertBefore(source, targetelem.nextSibling);
    }
}

function dragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

if (typeof (Storage) !== "undefined") {

    var person = {
        "firstName": "Shravan Kumar",
        "lastName": "Kasagoni",
        "age": "25",
        "mobileNumber": "1234567890"
    };

    localStorage.setItem('person', person);
}
else {
    alert("Sorry, your browser does not support web storage...");
}

//Still in development

function setManual(manual){
        document.getElementById("download").setAttribute('onclick', "downloadManual('"+manual+"')");
        //.onclick =  "downloadManual('"+manual+"')"
}

function downloadManual(manual){
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/"+manual+".json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            
            localStorage.setItem('Manual', JSON.stringify(arr))
            alert('Manual downloaded!');
            a = JSON.parse(localStorage.getItem('Manual'));
            var select = document.getElementById("manual");
            // select.options[select.options.length] = new Option(a, i);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function setActivities(manual){
    a = JSON.parse(localStorage.getItem(manual));
    b = a.chapters;

    for(i = 1; i <= Object.keys(b).length; i++) {
            var x = document.getElementById("activities");
            var option = document.createElement("option");
            option.text = b[i].activityName;
            option.setAttribute("value", b[i].activityName);
            x.add(option);
        }
}
