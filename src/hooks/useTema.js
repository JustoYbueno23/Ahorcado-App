import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { leerConfig } from '../storage/almacenamiento';
import { colores, oscuro } from '../theme/colores';

export function useTema() {
    const [esOscuro, setEsOscuro] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            async function cargar() {
                const config = await leerConfig();
                setEsOscuro(config.tema === 'oscuro');
            }
            cargar();
        }, [])
    );
    return esOscuro ? oscuro : colores;
}