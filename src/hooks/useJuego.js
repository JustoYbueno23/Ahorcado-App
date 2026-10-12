import React from "react";
import { PALABRAS } from '../data/palabras'
import { useState } from "react";

export const normalizar = (texto) => {
    return texto.toUpperCase()
        .replaceAll('Á', 'A')
        .replaceAll('É', 'E')
        .replaceAll('Í', 'I')
        .replaceAll('Ó', 'O')
        .replaceAll('Ú', 'U')
        .replaceAll('Ü', 'U')
};

export default function useJuego(categoria, nivel) {
    const [pista, setPista] = useState('');
    const [palabra, setPalabra] = useState('');
    const [aciertos, setAciertos] = useState([]);
    const [fallos, setFallos] = useState([]);
    const [errores, setErrores] = useState(0);

    const elegirPalabra = () => {
        const porCategoria = categoria === 'Aleatoria' ? PALABRAS : PALABRAS.filter(
            (p) => p.categoria === categoria
        );
        const porNivel = porCategoria.filter((p) => {
            const largo = p.palabra.replace(/ /g, '').length;
            if (nivel === 'Facil') return largo >= 4 && largo <= 6;
            if (nivel === 'Medio') return largo >= 7 && largo <= 9;
            if (nivel === 'Dificil') return largo >= 10;
        });

        const elegida = porNivel[Math.floor(Math.random() * porNivel.length)];
        if (elegida) {
            setPalabra(elegida.palabra);
            setPista(elegida.pista);
        };
    };

    const procesar = (letra) => {
        if (aciertos.includes(letra) || fallos.includes(letra)) {
            return;
        }
        const letraLimpia = normalizar(letra);
        const palabraLimpia = normalizar(palabra);

        if (palabraLimpia.includes(letraLimpia)) {
            setAciertos([...aciertos, letra]);
        } else {
            setFallos([...fallos, letra]);
            setErrores(errores + 1);
        }
    };

    const sinEspacio = palabra.replaceAll(' ', '');
    const letrasNecesarias = [];
    for (let i = 0; i < sinEspacio.length; i++) {
        const l = normalizar(sinEspacio[i]);
        if (!letrasNecesarias.includes(l)) {
            letrasNecesarias.push(l);
        }   
    }

    const aciertosLimpios = aciertos.map((a) => normalizar(a));
    let ganado = false;
    if (palabra !== '' && letrasNecesarias.length > 0) {
        ganado = true;
        for (let i = 0; i < letrasNecesarias.length; i++) {
            if (!aciertosLimpios.includes(letrasNecesarias[i])) {
                ganado = false;
            }
        }
    }
    const perdido = errores >= 6;
    return { palabra, pista, elegirPalabra, aciertos, fallos, errores, procesar, ganado, perdido };

}
