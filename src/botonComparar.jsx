import { loading } from './comparar.js'

const botonComparar = () => {
    return (
        <div class="grid justify-items-center grid-cols-1 py-8">
            <a id="compararButton"
                class="hiddeninline-block rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                href="#" onclick={loading}>
                Comparar
            </a>
            <div id="loadingAnimation"
                class="hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    );
}

export default botonComparar;