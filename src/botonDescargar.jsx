import {downloadList} from './descargar.js';

const botonDescargar = () => {
    return (
        <div class="hidden justify-items-center grid-cols-1 pb-4" id="descargarButton">
            <div
                class="mx-auto group relative inline-block justify-center items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500 select-none" onclick={downloadList}>
                <span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12.5 4.5V15M8.5 11L12.5 15M16.5 11L12.5 15" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <label id="fileLabel2" for="file-upload2" class="text-sm select-none font-medium transition-all group-hover:ml-4">
                    Descargar
                </label>
            </div>
        </div>
    );
}

export default botonDescargar;
