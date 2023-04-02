import { archivoLog, archivoDiff } from './obtenerArchivos.js';
import { createContext, createSignal } from "solid-js";
import {addData} from "./funcionTabla.js";

export const [globalState, setGlobalState] = createSignal({});
export var comp = [];

export async function loading() {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").classList.remove("hidden");
    document.getElementById("compararButton").classList.add("hidden");
    //Espera 5 segundos antes de ejecutar la funcion comparacion para que se vea el progreso de la barra.
    await new Promise(r => setTimeout(r, 250));
    await comparacion();
    console.log("Comparación completada");
    await addData();
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