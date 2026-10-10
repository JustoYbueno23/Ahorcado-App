import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "../screens/InicioScreen";
import CategoriaScreen from "../screens/CategoriaScreen";
import JuegoScreen from "../screens/JuegoScreen";
import InstruccionesScreen from "../screens/InstruccionesScreen";
import EstadisticasScreen from "../screens/EstadisticasScreen";
import ConfiguracionScreen from "../screens/ConfiguracionScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={InicioScreen} 
            options={{
                headerShown: false
            }} />

            <Stack.Screen name="Categoria" component={CategoriaScreen} 
            options={{
                headerShown: false,
                title: 'Categoria y nivel'
                
            }} />

            <Stack.Screen name="Juego" component={JuegoScreen} 
            options={{
                headerShown: false,
                title: 'Juego'
            }} />

            <Stack.Screen name="Instrucciones" component={InstruccionesScreen} 
            options={{
                headerShown: false,
                title: 'Instrucciones'
            }} />

            <Stack.Screen name="Estadisticas" component={EstadisticasScreen} 
            options={{
                headerShown: false,
                title: 'Estadisticas'
            }} />
            
            <Stack.Screen name="Configuracion" component={ConfiguracionScreen} 
            options={{
                headerShown: false,
                title: 'Configuracion'
            }} />
        </Stack.Navigator>
    );
}