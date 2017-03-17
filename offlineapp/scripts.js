function getApparatus(activity){
	var xmlhttp = new XMLHttpRequest();
	var url = "activities.json";

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

        tr.innerHTML = rows;
        tbody.appendChild(tr)

        //
    }
}

function resetForm() {
    document.getElementById("person").reset();
}