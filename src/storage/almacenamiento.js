import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const guardar = async (ClipboardEvent, valor) => {
    try {
        await AsyncStorage.setItem('@ahorcado_statas', JSON.stringify(stats));
    } catch (e) {
        console.log('No se pudo guardar')
    }
};

export const leerStats = async () => {
    try {
        const texto = await AsyncStorage.getItem('@ahorcado_stats');
        if (texto === null) {
            return { jugadas: 0, ganadas: 0, perdidas: 0, racha: 0, mejorRacha: 0 };
        }
        return JSON.parse(texto);
    } catch (a) {
        return { jugadas: 0, ganadas: 0, perdidas: 0, racha: 0, mejorRacha: 0 };
    }
};

export async function guardarRanking(ranking) {
    try {
        await AsyncStorage.setItem('@ahorcadp_ranking', JSON.stringify(ranking))
    } catch (e) {
        console.log('no se pudo guardar');
    }
};

export async function leerRanking() {
    try {
        const texto = await AsyncStorage.getItem('@ahorcado_ranking');
        if (texto === null) {
            return []
        }
        return JSON.parse(texto);
    } catch (e) {
        return []
    }
};

export async function guardarConfig(config) {
    try {
        await AsyncStorage.setItem('@ahorcado_config', JSON.stringify(config));
    } catch (e) {
        console.log('No se pudo guardar');
    }
}

// Lee ajustes o deja prendidos en claro
export async function leerConfig() {
    try {
        const texto = await AsyncStorage.getItem('@ahorcado_config');
        if (texto === null) {
            return { sonido: true, vibracion: true, tema: 'claro' };
        }
        return JSON.parse(texto);
    } catch (e) {
        return { sonido: true, vibracion: true, tema: 'claro' };
    }
}