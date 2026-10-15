# Ahorcado-App
Aquí tu `README.md` estilo PokeFinder para tu Ahorcado:

```md
<div align="center">

# 🎮 Ahorcado App

**Juego del ahorcado con temática colombiana. Escribe tu nombre, elige categoría y nivel, y adivina la palabra con teclado en pantalla, pistas, puntaje, cronómetro en difícil, vibración, sonidos y estadísticas locales. Funciona sin internet.**

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

## Instalación y configuración

### Requisitos previos

- Node.js v18 o superior
- npm
- Expo Go en tu celular Android o emulador
- Cuenta Expo para el APK con EAS Build

### Pasos para instalar

```bash
git clone https://github.com/usuario/ahorcado-app
cd ahorcado-app
npm install
npx expo start
```

Escanea el QR con Expo Go en Android. No requiere API Key ni internet: el banco y sonidos son locales.

## Estructura del proyecto

```text
ahorcado-app/
├── App.js                     # Entrada y proveedor de navegación
├── app.json                   # Nombre, icono, splash y configuración
├── eas.json                   # Perfil preview con buildType apk
├── assets/                    # Icono, splash y sonidos
│   └── sonidos/               # Acierto, Error, Victorias, Derrota
└── src/
    ├── navigation/
    │   └── AppNavigator.js    # Stack de 6 pantallas
    ├── screens/
    │   ├── InicioScreen.js        # Nombre y 4 destinos
    │   ├── CategoriaScreen.js     # 5 categorías y 3 niveles
    │   ├── JuegoScreen.js         # Arma marcador, dibujo, palabra, teclado, pista y modal
    │   ├── InstruccionesScreen.js # Reglas, niveles y puntos
    │   ├── EstadisticasScreen.js  # Totales y top 10 con FlatList
    │   └── ConfiguracionScreen.js # Sonido, vibración, tema y borrado
    ├── components/
    │   ├── Ahorcado.js        # Dibujo SVG en 6 partes
    │   ├── PalabraOculta.js   # Guiones, espacios y tildes
    │   ├── Teclado.js         # 27 teclas A–Z con Ñ
    │   ├── Marcador.js        # Vidas, puntaje y tiempo
    │   └── ModalResultado.js  # Final con nuevo y menú
    ├── hooks/
    │   ├── useJuego.js        # Estado y lógica de partida
    │   └── useTema.js         # Lee ajuste y devuelve claro u oscuro
    ├── data/
    │   └── palabras.js        # 60 palabras con categoría y pista
    ├── storage/
    │   └── almacenamiento.js  # 3 claves con AsyncStorage
    └── theme/
        └── colores.js         # Paleta clara y oscura
```

## Librerías utilizadas

| Librería | Para qué se usa |
|---|---|
| react-native | Framework base de la app móvil |
| expo | Crear, correr y configurar sin Android Studio |
| @react-navigation/native | Contenedor principal de navegación |
| @react-navigation/native-stack | Stack entre las 6 pantallas |
| react-native-screens | Optimización de pantallas nativas |
| react-native-safe-area-context | Área segura con notch y barra |
| react-native-svg | Dibujo del ahorcado en 6 partes |
| @react-native-async-storage/async-storage | Stats, top 10 y ajustes locales |
| expo-haptics | Vibración al acertar y fallar |
| expo-audio | Sonidos locales de acierto, error, victoria y derrota |
| @expo/vector-icons | Iconos de gear y categorías |

## Banco local en vez de API

No consume API: usa `src/data/palabras.js` con 60 palabras de los 3 niveles.

| Categoría | Ejemplo | Nivel |
|---|---|---|
| capitales | TUNJA | Fácil 4–6 |
| Animales Colombia | CHIGÜIRO | Medio 7–9 |
| Frutas | LULO | Fácil 4–6 |
| Comidas Tipicas | BANDEJA PAISA | Difícil 10+ con espacio visible |

## Conceptos técnicos implementados

### useState

Guarda palabra, pista, aciertos, fallos, errores, puntaje, pistas y tiempo.

```js
const [palabra, setPalabra] = useState('');
const [aciertos, setAciertos] = useState([]);
const [errores, setErrores] = useState(0);
const [puntaje, setPuntaje] = useState(0);
```

### useEffect para elegir y cronómetro

Elige una vez al entrar y baja 1 por segundo solo en difícil.

```js
useEffect(() => {
  elegirPalabra();
}, []);

useEffect(() => {
  if (nivel !== 'Dificil' || palabra === '' || ganado || perdido) {
    return;
  }
  const id = setInterval(() => {
    setTiempo((t) => (t > 0 ? t - 1 : 0));
  }, 1000);
  return () => clearInterval(id);
}, [nivel, palabra, ganado, perdido, tiempo]);
```

### Filtrado por categoría y nivel con azar

```js
const porCategoria = categoria === 'Aleatoria' ? PALABRAS : PALABRAS.filter((p) => p.categoria === categoria);
const porNivel = porCategoria.filter((p) => {
  const largo = p.palabra.replace(/ /g, '').length;
  if (nivel === 'Facil') return largo >= 4 && largo <= 6;
  if (nivel === 'Medio') return largo >= 7 && largo <= 9;
  if (nivel === 'Dificil') return largo >= 10;
  return false;
});
const elegida = porNivel[Math.floor(Math.random() * porNivel.length)];
```

### Normalizar tildes guardando Ñ con try/catch en guardado

```js
export const normalizar = (texto) => {
  return texto.toUpperCase()
    .replaceAll('Á', 'A')
    .replaceAll('É', 'E')
    .replaceAll('Í', 'I')
    .replaceAll('Ó', 'O')
    .replaceAll('Ú', 'U')
    .replaceAll('Ü', 'U');
};
```

```js
export async function guardarStats(stats) {
  try {
    await AsyncStorage.setItem('@ahorcado_stats', JSON.stringify(stats));
  } catch (e) {
    console.log('No se pudo guardar');
  }
}
```

### Navegación con Native Stack Navigator

```js
navigation.navigate('Juego', { nombre: nombre, categoria: categoria, nivel: nivel });
const categoria = route.params ? route.params.categoria : 'Aleatoria';
```

## Requerimientos funcionales implementados

- [x] Nombre obligatorio sin vacío
- [x] Categoría y nivel con 5 opciones y 3 niveles
- [x] Palabra al azar por longitud con espacios visibles
- [x] Teclado A–Z con Ñ que se bloquea en verde y rojo
- [x] Tildes que no cuentan como distintas
- [x] Dibujo en 6 partes y modal con nuevo y menú
- [x] Puntaje en vivo, pistas con descuento y cronómetro difícil
- [x] Vibración y sonidos según ajustes
- [x] Stats, ranking y config con AsyncStorage
- [x] Atrás con confirmación en partida

## Requerimientos no funcionales implementados

- [x] Diseño igual a Figma en 360x800 con SafeAreaView
- [x] Áreas 48 y textos desde 14
- [x] Respuesta inmediata sin bloqueos
- [x] Offline total con banco y sonidos locales
- [x] Código en pantallas, componentes y hooks con nombres claros
- [x] APK preview con EAS Build

## Extras implementados

- Tema claro y oscuro aplicado con hook propio
- Saludo con nombre y tarjetas por categoría con icono
- Ranking top 10 ordenado con fecha y multiplicador por nivel
- Borrrado con confirmación yloader de ajustes al enfocar

## Desarrollado con

React Native + Expo, React Navigation, AsyncStorage y EAS Build.

## Autor

Juan José Medina Orozco

## Enlaces

- Diseño: [https://www.figma.com/...](https://app.mockflow.com/iview/Ma83adc3a2be442e38b3b5dfb33fc82871791394466478)
- APK: [https://expo.dev/artifacts/...](https://expo.dev/accounts/juanmedinao3/projects/AhorcadoApp/builds/ad03678f-f946-41ec-9d38-2c34e354c7a5)
- Video: [https://youtu.be/...](https://youtu.be/fjpt_yj84QU)
```
