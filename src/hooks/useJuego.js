import React from "react";
import {PALABRAS} from '../data/palabras'
import { useState } from "react";

export default function useJuego(categoria, nivel) {
    const [pista, setPista] = useState('')
    const [palabra, setPalabra] = useState('')
    return{palabra, pista};
}