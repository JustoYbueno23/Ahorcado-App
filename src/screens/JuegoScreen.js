import React from 'react';
import { View, Text } from 'react-native';
import useJuego from '../hooks/useJuego'
import Teclado from '../components/Teclado';

export default function JuegoScreen() {
    const { palabra, pista} = useJuego();
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Juego</Text>
            < Teclado/>
        </View>
    );

}