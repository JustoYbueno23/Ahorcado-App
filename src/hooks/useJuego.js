import React from "react";
import { PALABRAS } from '../data/palabras'
import { useState, useEffect, } from "react";

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
    const [pistas, setPistas] = useState(nivel === 'Facil' ? 2 : nivel === 'Medio' ? 1 : 0);
    const [palabra, setPalabra] = useState('');
    const [aciertos, setAciertos] = useState([]);
    const [fallos, setFallos] = useState([]);
    const [errores, setErrores] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
    const [tiempo, setTiempo] = useState(null);
    const [bonoDado, setBonoDado] = useState(false);
    const [pistaVisible, setPistaVisible] = useState(false);

    const elegirPalabra = () => {
        const porCategoria = categoria === 'Aleatoria' ? PALABRAS : PALABRAS.filter(
            (p) => p.categoria === categoria
        );
        const porNivel = porCategoria.filter((p) => {
            const largo = p.palabra.replace(/ /g, '').length;
            if (nivel === 'Facil') return largo >= 4 && largo <= 6;
            if (nivel === 'Medio') return largo >= 7 && largo <= 9;
            if (nivel === 'Dificil') return largo >= 10;
            return false;
        });

        const elegida = porNivel[Math.floor(Math.random() * porNivel.length)];
        if (elegida) {
            setPalabra(elegida.palabra);
            setPista(elegida.pista);
            setAciertos([]);
            setFallos([]);
            setErrores(0);
            setPuntaje(0);
            setPistas(nivel === 'Facil' ? 2 : nivel === 'Medio' ? 1 : 0 );
            setBonoDado(false);
            setTiempo(nivel === 'Dificil' ? 90 : null);
        };
    };

    const procesar = (letra) => {
        if (ganado || perdido) {
            return;
        }
        if (aciertos.includes(letra) || fallos.includes(letra)) {
            return;
        }
        const letraLimpia = normalizar(letra);
        const palabraLimpia = normalizar(palabra);
        if (palabraLimpia.includes(letraLimpia)) {
            setAciertos([...aciertos, letra]);
            let veces = 0;
            for (let i = 0; i < palabraLimpia.length; i++) {
                if (palabraLimpia[i] === letraLimpia) {
                    veces = veces + 1;
                }
            }
            setPuntaje(puntaje + veces * 10)
        } else {
            setFallos([...fallos, letra]);
            setErrores(errores + 1);
            setPuntaje(puntaje - 5);
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
    const perdido = errores >= 6 || (nivel === 'Dificil' && tiempo === 0);

    const usarPista = () => {
        if (pistas <= 0 || ganado || perdido) {
            return;
        }
        setPistaVisible(true);
        setPistas(pistas - 1);
        setPuntaje(puntaje - 15);
        const ocultas = [];
        for (let i = 0; i < letrasNecesarias.length; i++) {
            if (!aciertosLimpios.includes(letrasNecesarias[i])) {
                ocultas.push(letrasNecesarias[i])
            }
        }
        if (ocultas.length > 0) {
            const alAzar = ocultas[Math.floor(Math.random() * ocultas.length)];
            setAciertos([...aciertos, alAzar])
        }
    };

    React.useEffect(() => {
        if (ganado && !bonoDado) {
            const vidas = 6 - errores;
            let mult = 1;
            if (nivel === 'Medio') mult = 2;
            if (nivel === 'Dificil') mult = 3;
            setPuntaje((puntaje + 50 + vidas * 10) * mult);
            setBonoDado(true);
        }
    }, [ganado]);

    useEffect(() =>{
        if (nivel !== 'Dificil' || palabra === '' || ganado || perdido) {
            return;
        }
        if (tiempo === null || tiempo <= 0) {
            return;
        }
        const id = setInterval(() => {
            setTiempo((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval (id);
    }, [nivel, palabra, ganado, perdido, tiempo]); 

    return { palabra, pista, pistas, pistaVisible, elegirPalabra, aciertos, fallos,
        errores, puntaje, tiempo, procesar, usarPista, ganado, perdido };
}
