# Héroes & Villanos 🦸‍♂️🦹‍♀️

Aplicación móvil Ionic/Angular para explorar, filtrar y guardar favoritos de superhéroes y villanos.

## 🚀 Características

- **Explorar personajes**: Búsqueda, filtrado por universo (Marvel, DC), afiliación (Hero, Villain) y ordenamiento
- **Favoritos persistentes**: Guardar personajes favoritos con almacenamiento local (Capacitor Preferences)
- **Detalles completos**: Información detallada de cada personaje con poderes, estadísticas y enlaces
- **Configuración personalizable**: Tema oscuro y tamaño de fuente ajustable
- **Infinite scroll**: Carga progresiva de personajes para mejor rendimiento
- **Diseño responsive**: Interfaz adaptativa con componentes Ionic standalone

## 🛠️ Tecnologías

- **Framework**: Ionic 8 + Angular 18 (standalone components)
- **Capacitor**: 7.x para acceso nativo (Preferences plugin)
- **API**: [Superhero API](https://akabab.github.io/superhero-api/) (datos remotos con caché local)
- **Estilos**: SCSS + Ionic theming (dark mode, safe-area)
- **Build**: Angular CLI + Gradle 8.13 (Java 17)

## 📦 Instalación y Ejecución

### Requisitos previos
- Node.js 20.x o superior
- npm 10.x o superior

### Instalación
```bash
npm install
```

### Ejecución en navegador (RECOMENDADO)
```bash
npm start
```
Abre [http://localhost:4200/](http://localhost:4200/) en tu navegador.

### Build para producción
```bash
npm run build
```

## 🔧 Configuración

- **Datos remotos vs locales**: Editar `src/environments/environment.ts` → `useRemote: true/false`
- **Tema oscuro**: Configuración > Activar tema oscuro
- **Tamaño fuente**: Configuración > Activar texto grande

## 📱 Versión móvil

**Nota**: La versión APK presenta issues de renderizado en WebView Android (scroll bloqueado, imágenes remotas no cargan). Se recomienda **usar la versión web** (`npm start`) para demostración completa de funcionalidad.

### Si deseas probar build Android (experimental)
```bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```
APK generado: `android/app/build/outputs/apk/debug/app-debug.apk`

## 🧪 Tests
```bash
npm test
```

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   └── services/         # CharactersService, FavoritesService, SettingsService
│   ├── pages/
│   │   ├── explore/          # Búsqueda y listado con filtros
│   │   ├── detail/           # Detalles de personaje
│   │   ├── favorites/        # Listado de favoritos
│   │   └── settings/         # Configuración de tema y fuente
│   └── shared/
│       └── components/       # CharacterCard, RatingBadge, EmptyState
├── assets/
│   ├── icon/                 # Favicon y app icons
│   └── manifest.webmanifest  # PWA manifest
├── environments/             # Config remote/local data
└── theme/                    # Ionic theming variables
```

## 🎨 Capturas y funcionalidades

- **Explorar**: Búsqueda con autocompletado, filtros multi-criterio, infinite scroll
- **Favoritos**: Toggle persistente con feedback visual, sincronización entre vistas
- **Detalles**: Card expandido con todas las estadísticas, poderes, biografía y enlaces
- **Settings**: Cambio de tema (dark/light) y tamaño de texto con persistencia

## 🐛 Issues conocidos

- **Android APK**: Scroll bloqueado por `body { position: fixed }` en WebView (issue de Ionic core styles)
- **Imágenes remotas**: No cargan en APK Android a pesar de `allowMixedContent: true` (posible CSP o cleartext policy)
- **Manifest icons**: Path corregido pero falta agregar imágenes reales 192x192 y 512x512

## 📄 Licencia

Proyecto educativo - Datos cortesía de [Akabab Superhero API](https://github.com/akabab/superhero-api)

---

**Desarrollado con ❤️ usando Ionic + Angular**
