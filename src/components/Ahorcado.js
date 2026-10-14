import React from 'react';
import { Svg, Line, Circle } from 'react-native-svg';
import { useTema } from '../hooks/useTema';

export default function Ahorcado({ errores }) {
    const tema = useTema();
    return (
        <Svg width="200" height="200">
            <Line x1="20" y1="190" x2="140" y2="190" stroke="#1F3864" strokeWidth="4" />
            <Line x1="40" y1="190" x2="40" y2="20" stroke="#1F3864" strokeWidth="4" />
            <Line x1="40" y1="20" x2="130" y2="20" stroke="#1F3864" strokeWidth="4" />
            <Line x1="130" y1="20" x2="130" y2="40" stroke="#1F3864" strokeWidth="4" />

            {errores >= 1 ? <Circle cx="130" cy="55" r="15" stroke="#1F3864"
                strokeWidth="4" fill="none" /> : null}
            {errores >= 2 ? <Line x1="130" y1="70" x2="130" y2="120" stroke="#1F3864"
                strokeWidth="4" fill="none" /> : null}
            {errores >= 3 ? <Line x1="130" y1="85" x2="105" y2="100" stroke="#1F3864"
                strokeWidth="4" fill="none" /> : null}
            {errores >= 4 ? <Line x1="130" y1="85" x2="155" y2="100" stroke="#1F3864"
                strokeWidth="4" fill="none" /> : null}
            {errores >= 5 ? <Line x1="130" y1="120" x2="110" y2="150" stroke="#1F3864" 
            strokeWidth="4" /> : null} 
            {errores >= 6 ? <Line x1="130" y1="120" x2="150" y2="150" stroke="#1F3864" 
            strokeWidth="4" /> : null} 
        </Svg>
    );
}