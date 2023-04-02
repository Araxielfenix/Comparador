/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import Nav from './Nav';
import Archivos from './botonesArchivos';
import botonComparar from './botonComparar';
import botonDescargar from './botonDescargar';
import datosTabla from './tabla';

render(Nav, document.getElementById('nav'));
render(Archivos, document.getElementById('botonesArchivos'));
render(botonComparar, document.getElementById('comparar'));
render(botonDescargar, document.getElementById('descargar'));
render(datosTabla, document.getElementById('tabla'));