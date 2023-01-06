// On load page, hide the "result" table.
window.onload = function () {
    document.getElementById("loadingAnimation").style.display = "none";
}

var archivo = [];
var archivo2 = [];

/**
 * It reads the file, splits it into an array, and then splits that array into a multidimensional array
 * @returns the name of the file that was uploaded.
 */
async function getFileName1() {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").style.display = "inline-block";
    document.getElementById("compararButton").innerHTML = "Comprobando...";
    await new Promise(r => setTimeout(r, 200));
    let fileInput = document.getElementById('file-upload1');
    let filename = fileInput.files[0].name;
    document.getElementById("fileLabel1").innerHTML = filename;
    let file1 = document.getElementById('file-upload1').files[0];
    if (file1) {
        let reader = new FileReader();
        reader.readAsText(file1, "UTF-8");
        reader.onload = function (evt) {
            let fileSplit1 = evt.target.result.split("\t");
            fileSplit1 = fileSplit1.toString().split("\r");
            fileSplit1 = fileSplit1.toString().split("\n");
            fileSplit1 = fileSplit1.toString().split(",");
            fileSplit1 = fileSplit1.filter(function (el) {
                return el != "";
            });
            let fileSplit1Length = fileSplit1.length;
            for (let i = 0; i < fileSplit1Length; i++) {
                archivo[i] = [];
                for (let j = 0; j < 12; j++) {
                    archivo[i][j] = fileSplit1[i + j];
                }
                i += 11;
            }
        }
        reader.onerror = function (evt) {
            alert("No se pudo leer el archivo Log");
        }
    }
    document.getElementById("compararButton").innerHTML = "Comparar";
    document.getElementById("loadingAnimation").style.display = "none";
    document.body.style.cursor = "default";
}

/**
 * It reads the file, splits it into an array, and then splits that array into a multidimensional
 * array.
 * @returns The file name.
 */
async function getFileName2() {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").style.display = "inline-block";
    document.getElementById("compararButton").innerHTML = "Comprobando...";
    await new Promise(r => setTimeout(r, 200));
    let fileInput = document.getElementById('file-upload2');
    let filename = fileInput.files[0].name;
    document.getElementById("fileLabel2").innerHTML = filename;
    let file2 = document.getElementById('file-upload2').files[0];
    if (file2) {
        let reader = new FileReader();
        reader.readAsText(file2, "UTF-8");
        reader.onload = function (evt2) {
            let fileSplit2 = evt2.target.result.split("\t");
            fileSplit2 = fileSplit2.toString().split("\r");
            fileSplit2 = fileSplit2.toString().split("\n");
            fileSplit2 = fileSplit2.toString().split(",");
            fileSplit2 = fileSplit2.filter(function (el) {
                return el != "";
            });
            let fileSplit2Length = fileSplit2.length;
            for (let i = 0; i < fileSplit2Length; i++) {
                archivo2[i] = [];
                for (let j = 0; j < 5; j++) {
                    archivo2[i][j] = fileSplit2[i + j];
                }
                i += 4;
            }
        }
        reader.onerror = function (evt2) {
            alert("No se pudo leer el archivo complemento");
        }
    }
    document.getElementById("compararButton").innerHTML = "Comparar";
    document.getElementById("loadingAnimation").style.display = "none";
    document.body.style.cursor = "default";
}

/**
 * It changes the cursor to a loading icon, changes the button text to "Comparando...", waits for 1
 * second, runs the comparacion() function, changes the button text to "Validando...", runs the
 * addData() function, changes the button text to "Comparar", hides the loading animation, and changes
 * the cursor back to the default
 */
async function loading() {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").style.display = "inline-block";
    document.getElementById("compararButton").innerHTML = "Comparando...";
    //Espera 5 segundos antes de ejecutar la funcion comparacion para que se vea el progreso de la barra.
    await new Promise(r => setTimeout(r, 250));
    await comparacion();
    console.log("Comparación completada");
    document.getElementById("compararButton").innerHTML = "Validando...";
    await addData();
    document.getElementById("compararButton").innerHTML = "Comparar";
    document.getElementById("loadingAnimation").style.display = "none";
    document.body.style.cursor = "default";
}

/**
 * It filters out the duplicates and empty strings from the array
 * @param array - The array to be filtered.
 * @returns the unique elements of the array.
 */
function removeDuplicatesAndEmpty(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}
  
var comp = [];
/**
 * It compares two arrays and returns a new array with the values that match
 * @returns a promise.
 */
async function comparacion() {
    return new Promise(async (resolve, reject) => {
        archivoLength = archivo.length;
        archivo2Length = archivo2.length;
        if (archivo && archivo2) {
            console.log("Comparando...");
            archivo2.map((filas, index) => {
                archivo.map((filas2, index2) => {
                    if (archivo2[index][0].includes(archivo[index2][3]) && archivo2[index][3].includes(archivo[index2][4]) && archivo2[index][4].includes(archivo[index2][6])) {
                        comp[index] = [archivo[index2][0], archivo[index2][4], archivo[index2][5], archivo[index2][6], archivo2[index][1], archivo[index2][10], archivo[index2][9], archivo2[index][2]];
                    }
                });
            });
            archivo = [];
            archivo2 = [];
        }
        else {
            alert("No se puede completar la comparación, revise los archivos");
        }
        resolve();
    });
}

/**
 * It creates a table and adds the data to it
 * @returns A promise that will resolve when the table is filled with the data.
 */
async function addData() {
    return new Promise((resolve, reject) => {
        console.log("Agregando datos a la tabla...");
        let table = document.getElementById("tableBody");
        let compLenght = comp.length;
        comp.map((filas, index) => {
            let row = table.insertRow();
            for (let i = 0; i < 8; i++) {
                let cell = row.insertCell();
                cell.innerHTML = comp[index][i];
            }
        });
        document.getElementById("resultados").style.display = "inline";
        resolve();
    });
}

/**
 * It downloads a table as a CSV file
 */
function downloadList() {
    let table = document.getElementById("tableBody");
    let tableLength = table.rows.length;
    if (tableLength == 0) {
        alert("No hay datos para descargar");
    }
    else{
        //Download the table as text and convert it to CSV.
        let csv = 'data:text/csv;charset=unicode,';
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
        // Get the last 2 characters of the actual year.
        let year = new Date().getFullYear().toString().substr(-2);
        //Get the month in 2 digits.
        let month = ("0" + (new Date().getMonth() + 1)).slice(-2) - 1;
        link.setAttribute("download", "revAtt" + year + month + ".txt");
        document.body.appendChild(link);
        link.click();
    }
}