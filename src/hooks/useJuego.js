import React from "react";
import { PALABRAS } from '../data/palabras'
import { useState } from "react";


export default function useJuego(categoria, nivel) {
    const [pista, setPista] = useState('')
    const [palabra, setPalabra] = useState('')

    const elegirPalabra = () => {
        const porCategoria = categoria === 'Aleatoria' ? PALABRAS : PALABRAS.filter(
            (p) => p.categoria === categoria
        );
        const porNivel = porCategoria.filter((p) =>{
            const largo = p.palabra.replace(/ /g, '').length;
            if (nivel === 'Facil') return largo >= 4 && largo <=6;
            if (nivel === 'Medio') return largo >= 7 && largo <=9;
            if (nivel === 'Dificil') return largo >= 10 ;
        })
        
        const elegida = porNivel[Math.floor(Math.random() * porNivel.length)];
        if (elegida) {
            setPalabra(elegida.palabra);
            setPista(elegida.pista);
        }
    }
    return { palabra, pista, elegirPalabra };    
}