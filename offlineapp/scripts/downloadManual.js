function setManual(manual) {
    document.getElementById("downloadForm").setAttribute('onsubmit', "downloadManual('" + manual + "')");
}

function downloadManual(manual) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../json/" + manual + ".json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
<<<<<<< .mine
            var downloadedManual = JSON.parse(this.responseText);

            // manuals.push(downloadedManual)
            // localStorage.setItem("manuals", JSON.stringify(downloadedManual))
            // alert(downloadedManual.manualName+" was downloaded.")
            // var i;
            console.log(downloadedManual)
            if (localStorage.getItem(manual, JSON.stringify(downloadedManual)) == true) {
                alert('Manual already downloaded!');
            }
            else{
                localStorage.setItem(manual, JSON.stringify(downloadedManual))
                alert('Manual downloaded!');
            }
            var a = JSON.parse(localStorage.getItem(manual));
            var select = document.getElementById("manual");
            // select.options[select.options.length] = new Option(a, i);
            // var manuals = [];
            var manuals = JSON.parse(localStorage.getItem('manuals'));   
             if(manuals == null){
||||||| .r114
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
=======
            var downloadedManual = JSON.parse(this.responseText)
            var manuals = JSON.parse(localStorage.getItem('manuals'))
            var flag = true;
            if(manuals === null){
>>>>>>> .r120
                manuals = [];
                manuals.push(downloadedManual);
                localStorage.setItem('manuals', JSON.stringify(manuals))
                alert("Success! Downloaded "+downloadedManual.manualName+" manual!")
                
             } else{
                alert()
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