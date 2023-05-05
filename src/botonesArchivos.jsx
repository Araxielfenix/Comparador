import { getFile } from './obtenerArchivos.js';

const Archivos = () => {
    return (
        <div class="grid justify-items-center grid-cols-2 py-11" id = "botones">
            <div 
                class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                <span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12.5 4.5V15M12.5 4.5L8 8M12.5 4.5L17 8" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <label id="fileLabel1" for="diffFile" class="text-sm font-medium transition-all group-hover:ml-4 group-hover:hidden select-none">
                    Subir log
                </label>
                <input id="file-upload1" type="file" onchange={getFile} class='hidden transition-transform group-hover:translate-x-4 group-hover:inline-block select-none'/>
            </div>
            <div
                class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                <span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12.5 4.5V15M12.5 4.5L8 8M12.5 4.5L17 8" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <label id="fileLabel2" for="diffFile" class="text-sm font-medium transition-all group-hover:ml-4 group-hover:hidden pointer-events-none select-none">
                    Subir complemento
                </label>
                <input id="file-upload2" type="file" onchange={getFile} class='hidden transition-transform group-hover:translate-x-4 group-hover:inline-block select-none'/>
            </div>
        </div>
    );
}

export default Archivos;
