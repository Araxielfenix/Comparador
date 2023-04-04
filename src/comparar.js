import { archivoLog, archivoDiff } from './obtenerArchivos.js';
import { addData } from "./funcionTabla.js";

export var comp = [];

export async function loading() {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").classList.remove("hidden");
    document.getElementById("compararButton").classList.add("hidden");
    //Espera 5 segundos antes de ejecutar la funcion comparacion para que se vea el progreso de la barra.
    await new Promise(r => setTimeout(r, 250));
    // Quiero agregar 4 filas vacias al <tbody> de la tabla para agregar una animacion de carga, y luego eliminarlas, el id de la tabla es "result" y el id del <tbody> es "tableBody".
    for (let i = 0; i < 4; i++) {
        document.getElementById("tableBody").innerHTML += "<tr class='border divide-x-2 divide-white-700 whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white odd:bg-sky-900 h-2 bg-slate-200 dark:bg-slate-700 rounded'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    }
    document.getElementById("resultados").classList.add("animate-pulse");
    await new Promise(r => setTimeout(r, 250));
    await comparacion();
    console.log("Comparación completada");
    document.getElementById("tableBody").innerHTML = "";
    await addData();
    document.getElementById("resultados").classList.remove("animate-pulse");
    document.getElementById("loadingAnimation").classList.add("hidden");
    document.getElementById("compararButton").classList.remove("hidden");
    document.body.style.cursor = "default";
}

/**
 * It compares two arrays and returns a new array with the values that match
 * @returns a promise.
 */
async function comparacion() {
    return new Promise(async (resolve, reject) => {
        if (archivoDiff && archivoLog) {
            console.log("Comparando...");
            archivoDiff.map((filas, index) => {
                archivoLog.map((filas2, index2) => {
                    if (archivoDiff[index][0].includes(archivoLog[index2][3]) && archivoDiff[index][3].includes(archivoLog[index2][4]) && archivoDiff[index][4].includes(archivoLog[index2][6])) {
                        comp[index] = [archivoLog[index2][0], archivoLog[index2][4], archivoLog[index2][5], archivoLog[index2][6], archivoDiff[index][1], archivoLog[index2][10], archivoLog[index2][9], archivoDiff[index][2]];
                    }
                });
            });
        }
        else {
            alert("No se puede completar la comparación, revise los archivos");
        }
        resolve();
    });
}
