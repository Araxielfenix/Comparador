// On load page, hide the "result" table.
window.onload = function () {
    document.getElementById("result").style.display = "none";
}


function getFileName1() {
    var fileInput = document.getElementById('file-upload1');
    var filename = fileInput.files[0].name;
    document.getElementById("fileLabel1").innerHTML = filename;
}

function getFileName2() {
    var fileInput = document.getElementById('file-upload2');
    var filename = fileInput.files[0].name;
    document.getElementById("fileLabel2").innerHTML = filename;
}

function getFileData() {
    document.getElementById("result").style.display = "inline-table";
    var file1 = document.getElementById('file-upload1').files[0];
    var file2 = document.getElementById('file-upload2').files[0];
    if (file1) {
        var reader = new FileReader();
        reader.readAsText(file1, "UTF-8");
        reader.onload = function (evt) {
            var fileSplit1 = evt.target.result.split("\t");
            //console.log(fileSplit1);
        }
        reader.onerror = function (evt) {
            alert("No se pudo leer el archivo Log");
        }
    }
    if (file2) {
        var reader = new FileReader();
        reader.readAsText(file2, "UTF-8");
        reader.onload = function (evt2) {
            var fileSplit2 = evt2.target.result.split("\t");
            //console.log(fileSplit2);
        }
        reader.onerror = function (evt2) {
            alert("No se pudo leer el archivo complemento");
        }
    }
    if (fileSplit1 != "" && fileSplit2 != "") {
        comparacion(fileSplit1, fileSplit2);
    }
}

function comparacion(f1, f2) {
    var tarjeta = [];
    for(var t = 0; t < f1.length; t+12){
        tarjeta[t] = f1[t].split("\t");
    }
    var fecha = [];
    for(var f = 11; f < f1.length; f+12){
        fecha[f] = f1[f].split("\t");
    }
    var hora = [];
    for(var h = 12; h < f1.length; h+12){
        hora[h] = f1[h].split("\t");
    }
    var importe = [];
    for(var i = 6; i < f1.length; i+12){
        importe[i] = f1[i].split("\t");
    }
    var numAut = [];
    for(var n = 7; n < f1.length; n+12){
        numAut[n] = f1[n].split("\t");
    }
}

function addData(tarjeta, fecha, hora, importe, numAut, canal, numOp, telefono) {
    var data = tarjeta, fecha, hora, importe, numAut, canal, numOp, telefono;
    var tableRow = document.getElementById("result");
    var row = tableRow.insertRow(1);
    var cells = [];
    for(var i = 0; i < data.length; i++){
        for (var j = 0; j < 7; j++) {
            cells[j] = row.insertCell(i);
            cells[j].innerHTML = data[i];
        }
    }
}