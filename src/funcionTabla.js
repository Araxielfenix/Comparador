import { comp } from "./comparar.js";

/**
 * It creates a table and adds the data to it
 * @returns A promise that will resolve when the table is filled with the data.
 */
export async function addData() {
    return new Promise((resolve, reject) => {
        console.log("Agregando datos a la tabla...");
        let table = document.getElementById("tableBody");
        table.classList.remove("hidden");
        comp.map((filas, index) => {
            let row = table.insertRow();
            for (let i = 0; i < 8; i++) {
                let cell = row.insertCell();
                cell.innerHTML = comp[index][i];
            }
            row.classList.add("border", "divide-x-2", "divide-white-700", "whitespace-nowrap", "px-4", "py-2", "text-gray-700", "dark:text-white", "odd:bg-sky-900");
        });
        document.getElementById("descargarButton").classList.remove("hidden");
        document.getElementById("descargarButton").classList.add("grid");
        resolve();
    });
}