import React from 'react';
import { View, Text } from 'react-native';
import useJuego from '../hooks/useJuego'
import Teclado from '../components/Teclado';


export default function JuegoScreen({ route }) {
    const categoria = route.params ? route.params.categoria : 'Aleatoria';
    const nivel = route.params ? route.params.nivel : 'Facil';
    const { palabra, pista, elegirPalabra, procesar, aciertos, fallos} = useJuego(categoria, nivel);

    React.useEffect(() => {
        elegirPalabra();
    }, []);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>{categoria} - {nivel}</Text>
            <Text>{palabra} - {pista}</Text>

            <Teclado procesar={procesar} aciertos={aciertos} fallos={fallos}/>
        </View>
    );

}