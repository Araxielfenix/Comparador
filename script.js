// On load page, hide the "result" table.
window.onload = function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("progressBar").style.display = "none";
    document.getElementById("descargarButton").style.display = "none";
}

var fileSplit1 = [];
var fileSplit2 = [];

function getFileName1() {
    let fileInput = document.getElementById('file-upload1');
    let filename = fileInput.files[0].name;
    document.getElementById("fileLabel1").innerHTML = filename;
    let file1 = document.getElementById('file-upload1').files[0];
    if (file1) {
        let reader = new FileReader();
        reader.readAsText(file1, "UTF-8");
        reader.onload = function (evt) {
            fileSplit1 = evt.target.result.split("\t");
            fileSplit1 = fileSplit1.toString().split("\r");
            fileSplit1 = fileSplit1.toString().split("\n");
            fileSplit1 = fileSplit1.toString().split(",");
        }
        reader.onerror = function (evt) {
            alert("No se pudo leer el archivo Log");
        }
    }
}

function getFileName2() {
    let fileInput = document.getElementById('file-upload2');
    let filename = fileInput.files[0].name;
    document.getElementById("fileLabel2").innerHTML = filename;
    let file2 = document.getElementById('file-upload2').files[0];
    if (file2) {
        let reader = new FileReader();
        reader.readAsText(file2, "UTF-8");
        reader.onload = function (evt2) {
            fileSplit2 = evt2.target.result.split("\t");
            fileSplit2 = fileSplit2.toString().split("\r");
            fileSplit2 = fileSplit2.toString().split("\n");
            fileSplit2 = fileSplit2.toString().split(",");
        }
        reader.onerror = function (evt2) {
            alert("No se pudo leer el archivo complemento");
        }
    }
}

async function loading(){
    document.body.style.cursor = "wait";
    document.getElementById("progressBar").style.display = "block";
    document.getElementById("compararButton").innerHTML = "Comparando...";
    await comparacion();
    console.log("Comparación completada");
    document.getElementById("compararButton").innerHTML = "Comparar";
    document.getElementById("progressBar").style.display = "none";
    document.body.style.cursor = "default";
}

async function comparacion() {
    return new Promise(async (resolve, reject) => {
        if (fileSplit1 && fileSplit2) {
            let fileSplit1Length = fileSplit1.length;
            console.log("Comparando...");
            let comp = [];
            fileSplit1.map((row, index) =>{
                if(fileSplit2.includes(row)){
                    comp.push(fileSplit1[0], fileSplit1[4], fileSplit1[11], fileSplit1[6], fileSplit1[5], fileSplit1[10], fileSplit1[3], fileSplit2[index * 2]);
                }
            });
            //remove undefined values from array.
            comp = comp.filter(function (el) {
                return el != null;
            });
            //add the data to the table.
            await addData(comp);
            document.getElementById("descargarButton").style.display = "block";
        }
        else {
            alert("No se puede completar la comparación, revise los archivos");
        }
        resolve();
    });
}

function duplicados() {

}

async function addData(data) {
    return new Promise((resolve, reject) => {
        console.log("Agregando datos a la tabla...");
        let tableRow = document.getElementById("result");
        let row = tableRow.insertRow(1);
        let cells = [];
        let dataLength = data.length;

        data.map((filas, index) => {
            cells[(index % 7)] = row.insertCell(index);
            cells[(index % 7)].innerHTML = filas[index];
            
        });
        document.getElementById("result").style.display = "inline-table";
        resolve();
    });
}

function downloadList() {
    //Download the table as a CSV file using the "download" attribute.
    let csv = 'data:text/csv;charset=utf-8,';
    let rows = document.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv += row.join(",") + "\r";
    }
    let encodedUri = encodeURI(csv);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "archivoMatch.csv");
    document.body.appendChild(link);
    link.click();
}