import React from 'react';
import { Text } from 'react-native';
import useJuego from '../hooks/useJuego'
import Teclado from '../components/Teclado';
import PalabraOculta from '../components/PalabraOculta';
import { SafeAreaView } from "react-native-safe-area-context";

export default function JuegoScreen({ route }) {
    const categoria = route.params ? route.params.categoria : 'Aleatoria';
    const nivel = route.params ? route.params.nivel : 'Facil';
    const { palabra, pista, elegirPalabra, procesar, aciertos, fallos, ganado, perdido} = useJuego(categoria, nivel);

    React.useEffect(() => {
        elegirPalabra();
    }, []);
    
    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff'}}>
            <Text>{pista}</Text>
            {ganado ? <Text>{ganado}</Text> : null}
            {perdido ? <Text>{perdido}</Text> : null}
            <PalabraOculta palabra={palabra} aciertos={aciertos} />
            <Teclado procesar={procesar} aciertos={aciertos} fallos={fallos}/>
        </SafeAreaView>
    );

}