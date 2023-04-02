/**
 * It downloads a table as a CSV file
 */
export function downloadList() {
    let table = document.getElementById("tableBody");
    let tableLength = table.rows.length;
    if (tableLength == 0) {
        alert("No hay datos para descargar");
    }
    else {
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