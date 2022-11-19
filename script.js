// On load page, hide the "result" table.
window.onload = function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("loader").style.display = "none";
}

var lista = [];
var file1 = [];
var file2 = [];
var fileSplit1 = [];
var fileSplit2 = [];

function getFileName1() {
    var fileInput = document.getElementById('file-upload1');
    var filename = fileInput.files[0].name;
    document.getElementById("fileLabel1").innerHTML = filename;
    file1 = document.getElementById('file-upload1').files[0];
    if (file1) {
        var reader = new FileReader();
        reader.readAsText(file1, "UTF-8");
        reader.onload = function (evt) {
            fileSplit1 = evt.target.result.split("\t");
            fileSplit1 = fileSplit1.toString().split("\r");
            fileSplit1 = fileSplit1.toString().split("\n");
        }
        reader.onerror = function (evt) {
            alert("No se pudo leer el archivo Log");
        }
    }
}

function getFileName2() {
    var fileInput = document.getElementById('file-upload2');
    var filename = fileInput.files[0].name;
    document.getElementById("fileLabel2").innerHTML = filename;
    file2 = document.getElementById('file-upload2').files[0];
    if (file2) {
        var reader = new FileReader();
        reader.readAsText(file2, "UTF-8");
        reader.onload = function (evt2) {
            fileSplit2 = evt2.target.result.split("\t");
            fileSplit2 = fileSplit2.toString().split("\r");
            fileSplit2 = fileSplit2.toString().split("\n");
        }
        reader.onerror = function (evt2) {
            alert("No se pudo leer el archivo complemento");
        }
    }
}

function comparacion() {
    //Wait 1 second before starting the comparison.
    setTimeout(function () {
        if (fileSplit1 && fileSplit2) {
            var arlog = logFile(fileSplit1);
            var ardiff = difAtt(fileSplit2);
            var comp = [];
            //If "arlog" starts with a letter, do nothing.
            if (arlog[0][0].match(/[a-z]/i)) {
                alert("Asegurate de haber ingresado el archivo correcto o de haber eliminado los encabezados");
            }
            else {
                //compare the two arrays and return the values that match.
                arlog.map((row, index) => {
                    for (var i = 0; i < ardiff.length; i++) {
                        if (row[3] == ardiff[i][0].substring(9, ardiff[i][0].length)) {
                            comp[index] = [row[0], row[4], row[11].substring(8, 17), row[6], row[5], row[7], row[3], ardiff[i][2]];
                        }
                    }
                });
                //remove empty or undefined values from the array.
                var comp2 = comp.filter(function (el) {
                    return el != null;
                });
                //remove the duplicates from the array.
                var comp3 = comp2.filter(function (item, pos) {
                    return comp2.indexOf(item) == pos;
                });
                //add the data to the table.
                comp3.map((row, index) => {
                    addData(row);
                });
            }
        }
        else {
            alert("No se puede completar la comparación, revise los archivos");
            document.body.style.cursor = "default";
        }
    }, 1000);
    document.getElementById("loader").style.display = "block";

}

function duplicados(){
    //from the "Lista" array, find the duplicates and return them.
    var duplicados = [];
    for (var i = 0; i < lista.length; i++) {
        if (lista.indexOf(lista[i]) != lista.lastIndexOf(lista[i])) {
            duplicados.push(lista[i]);
        }
    }
    //remove the duplicates from the array.
    var duplicados2 = duplicados.filter(function (item, pos) {
        return duplicados.indexOf(item) == pos;
    });
    //Turn the array into a csv file.
    var csvContent = "data:text/csv;charset=utf-8,";
    duplicados2.forEach(function (rowArray) {
        var row = rowArray.join(",");
        csvContent += row + "\r";
    });
    //Download the file.
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "duplicados.csv");
    document.body.appendChild(link);
    link.click();
}

function addData(data) {
    lista = data;
    var tableRow = document.getElementById("result");
    var row = tableRow.insertRow(1);
    var cells = [];
    data.map((rows, index) => {
        cells[index] = row.insertCell(index);
        cells[index].innerHTML = data[index];
    });
    document.getElementById("result").style.display = "inline-table";
    document.getElementById("loader").style.display = "none";
}

function logFile(log) {
    return log.map(row => row.split(","));
}

function difAtt(diff) {
    return diff.map(row => row.split(","));
}

function downloadList() {
    //Download the table as a CSV file using the "download" attribute.
    var csv = 'data:text/csv;charset=utf-8,';
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv += row.join(",") + "\r";
    }
    var encodedUri = encodeURI(csv);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "archivoMatch.csv");
    document.body.appendChild(link);
    link.click();

    duplicados();
}