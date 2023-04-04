import { createContext, createSignal } from "solid-js";

export const [globalState, setGlobalState] = createSignal({});

export var archivoLog = [];
export var archivoDiff = [];

export async function getFile(archivo) {
    document.body.style.cursor = "progress";
    document.getElementById("loadingAnimation").classList.remove("hidden");
    document.getElementById("compararButton").classList.add("hidden");
    await new Promise(r => setTimeout(r, 200));
    let file = archivo.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
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
                document.getElementById("fileLabel1").innerHTML = file.name;
                for (let i = 0; i < fileSplitLength; i++) {
                    archivoLog[i] = [];
                    for (let j = 0; j < 12; j++) {
                        archivoLog[i][j] = fileSplit[i + j];
                    }
                    i += 11;
                }
            }
            else {
                document.getElementById("fileLabel2").innerHTML = file.name;
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
    document.getElementById("loadingAnimation").classList.add("hidden");
    document.getElementById("compararButton").classList.remove("hidden");
    document.body.style.cursor = "default";
}