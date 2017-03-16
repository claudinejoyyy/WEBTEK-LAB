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