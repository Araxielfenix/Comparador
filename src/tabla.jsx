
const datosTabla = () => {
    return (
        <div id="resultados" class="rounded-lg border w-fit mx-auto border-slate-800 dark:border-slate-50">
            <table id="result"
                class="border-spacing-px border-slate-500 divide-y-2 divide-gray-200 text-sm text-center dark:divide-gray-700">
                <thead>
                    <tr>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Tarjeta</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Fecha</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Hora</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Importe</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Num. Autorización</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Canal</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Num. Operación</th>
                        <th class="border whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Telefono</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    );
}

export default datosTabla;