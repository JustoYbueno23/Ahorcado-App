import React from 'react';
import { View, Text } from 'react-native';
import useJuego from '../hooks/useJuego'

export default function JuegoScreen() {
    const { palabra, pista} = useJuego();
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Juego</Text>
        </View>
    );
}