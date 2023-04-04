import { createContext, createSignal } from "solid-js";

export const [globalState, setGlobalState] = createSignal({});

export var archivoLog = [];
export var archivoDiff = [];

export async function getFile(archivo) {
    document.body.style.cursor = "progress";
    document.getElementById("botones").classList.add("animate-pulse");
    document.getElementById("loadingAnimation").classList.remove("hidden");
    document.getElementById("compararButton").classList.add("hidden");
    await new Promise(r => setTimeout(r, 200));
    if (archivo.target.files[0]) {
        document.getElementById("fileLabel" + archivo.target.id.charAt(11)).innerHTML = archivo.target.files[0].name;
        let reader = new FileReader();
        reader.readAsText(archivo.target.files[0], "UTF-8");
        reader.onload = function (evt) {
            let fileSplit = evt.target.result.split("\t");
            fileSplit = fileSplit.toString().split("\n");
            fileSplit = fileSplit.toString().split("\r");
            fileSplit = fileSplit.toString().split(",");
            fileSplit = fileSplit.filter(function (el) {
                return el != "";
            });
            let fileSplitLength = fileSplit.length;
            if (fileSplit[0].charAt(0) != "H") {
                for (let i = 0; i < fileSplitLength; i++) {
                    archivoLog[i] = [];
                    for (let j = 0; j < 12; j++) {
                        archivoLog[i][j] = fileSplit[i + j];
                    }
                    i += 11;
                }
            }
            else {
                for (let i = 0; i < fileSplitLength; i++) {
                    archivoDiff[i] = [];
                    for (let j = 0; j < 5; j++) {
                        archivoDiff[i][j] = fileSplit[i + j];
                    }
                    i += 4;
                }
            }
        }
        reader.onerror = function (evt) {
            alert("No se pudo leer el archivo Log");
        }
    }
    await new Promise(r => setTimeout(r, 250));
    document.getElementById("botones").classList.remove("animate-pulse");
    document.getElementById("loadingAnimation").classList.add("hidden");
    document.getElementById("compararButton").classList.remove("hidden");
    document.body.style.cursor = "default";
}