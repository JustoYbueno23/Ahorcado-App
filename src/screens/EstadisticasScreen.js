import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { leerStats, leerRanking } from '../storage/almacenamiento';
import { colores } from '../theme/colores';

export default function EstadisticasScreen() {
    const [stats, setStats] = useState({ jugadas: 0, ganadas: 0, perdidas: 0, racha: 0, mejorRacha: 0 });
    const [ranking, setRanking] = useState([]);

    React.useEffect(() => {
        async function cargar() {
            setStats(await leerStats());
            setRanking(await leerRanking());
        }
        cargar();
    }, []);

    const porcentaje = stats.jugadas > 0 ? Math.round((stats.ganadas / stats.jugadas) * 100) : 0;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Text style={styles.tituloPantalla}>Estadísticas</Text>
            <View style={styles.tarjetas}>
                <View style={styles.tarjeta}><Text style={styles.numero}>{stats.jugadas}</Text><Text>Jugadas</Text></View>
                <View style={styles.tarjeta}><Text style={styles.numero}>{stats.ganadas}</Text><Text>Ganadas</Text></View>
                <View style={styles.tarjeta}><Text style={styles.numero}>{porcentaje}%</Text><Text>Victorias</Text></View>
                <View style={styles.tarjeta}><Text style={styles.numero}>{stats.mejorRacha}</Text><Text>Mejor racha</Text></View>
            </View>
            <Text style={styles.titulo}>Top 10</Text>
            <FlatList
                data={ranking}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.fila}>
                        <Text style={styles.texto}>{index + 1}. {item.nombre}</Text>
                        <Text style={styles.texto}>{item.puntaje}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    tituloPantalla: { fontSize: 26, fontWeight: 'bold', color: colores.encabezado, textAlign: 'center' },
    tarjetas: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
    tarjeta: { flex: 1, minWidth: '45%', backgroundColor: colores.superficie, borderRadius: 8, padding: 12, alignItems: 'center' },
    numero: { fontSize: 20, fontWeight: 'bold', color: colores.encabezado },
    titulo: { fontSize: 18, fontWeight: 'bold', color: colores.encabezado, marginTop: 16 },
    fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#CBD5E1', minHeight: 48 },
    texto: { fontSize: 16 },
});