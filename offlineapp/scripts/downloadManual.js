function setManual(manual) {
    document.getElementById("downloadForm").setAttribute('onsubmit', "downloadManual('" + manual + "')");
}

function downloadManual(manual) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/" + manual + ".json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var downloadedManual = JSON.parse(this.responseText)
            var manuals = JSON.parse(localStorage.getItem('manuals'))
            var flag = true;
            if(manuals == null){
                manuals = [];
                manuals.push(downloadedManual);
                localStorage.setItem('manuals', JSON.stringify(manuals))
                alert("Success! Downloaded "+downloadedManual.manualName+" manual!")
                
             } else{
                for (var i = 0; i < manuals.length; i++) {
                    if(manuals[i].manualName === downloadedManual.manualName){
                        alert(downloadedManual.manualName+" manual is ALREADY DOWNLOADED.")
                        flag = false;
                        break;
                    }
                };
                if(flag === true){
                manuals.push(downloadedManual);
                localStorage.setItem('manuals', JSON.stringify(manuals))
                alert("Success! Downloaded "+downloadedManual.manualName+" manual!")
                }
                
            }           
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}