window.onload = function(){

}
function setManual(manual) {
    document.getElementById("downloadForm").setAttribute('onsubmit', "downloadManual('" + manual + "')");
    //.onclick =  "downloadManual('"+manual+"')"
}

function downloadManual(manual) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/" + manual + ".json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var downloadedManual = JSON.parse(this.responseText);

            // manuals.push(downloadedManual)
            // localStorage.setItem("manuals", JSON.stringify(downloadedManual))
            // alert(downloadedManual.manualName+" was downloaded.")
            // var i;
            console.log(downloadedManual)
            localStorage.setItem(manual, JSON.stringify(downloadedManual))
            alert('Manual downloaded!');
            var a = JSON.parse(localStorage.getItem(manual));
            var select = document.getElementById("manual");
            // select.options[select.options.length] = new Option(a, i);
            // var manuals = [];
            var manuals = JSON.parse(localStorage.getItem('manuals'));   
             if(manuals == null){
                manuals = [];
             }
            manuals.push(a.manualName);
            localStorage.setItem('manuals', JSON.stringify(manuals))
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}