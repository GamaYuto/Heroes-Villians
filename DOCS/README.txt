Proyecto: Héroes & Villanos
=================================

Resumen
- App Ionic + Angular con tabs (Explorar, Favoritos, Ajustes) para listar héroes y villanos.
- Fuente de datos: Mock local (assets/data/characters.json) o API Akabab (~700 personajes). Cache y modo offline.
- UX: búsqueda con debounce, filtros, ordenamiento, infinite scroll, skeleton loaders y pull-to-refresh.

Requisitos
- Node.js 20+, npm 9+
- Ionic CLI: npm i -g @ionic/cli
- Android (APK): Android Studio + SDK/Platform-Tools + JDK 17.

Instalación
1) npm ci
2) ionic serve (desarrollo) o ionic build (producción)

Configuración de datos
- src/environments/environment.ts
  - useRemote: true/false (usar API remota o JSON local)
  - remoteUrl: URL del JSON Akabab

Pruebas unitarias
- Comando: npm test
- Cobertura: npx ng test --configuration=ci --code-coverage
- Specs incluidas:
  - CharactersService: filtros/paginación/cache
  - FavoritesService: añadir/quitar/toggle/persistencia
  - SettingsService: tema/tipografía + persistencia
  - CharacterCardComponent: toggle favorito + placeholder imagen
  - RatingBadgeComponent: cálculo de estrellas
  - HighlightPipe: marcado de términos y escape regex

Build Web
1) ionic build
2) Resultado en carpeta www/

APK (Capacitor Android)
1) ionic build
2) npx cap add android (solo primera vez)
3) npx cap copy android
4) npx cap open android (abre Android Studio)
5) Generar APK:
   - Debug: Build > Build Bundle(s)/APK(s) > Build APK(s)
   - Release (firmado): Build > Generate Signed Bundle/APK… (APK)
     - Crear keystore con keytool (JDK):
       keytool -genkeypair -v -keystore hv.keystore -alias hv -keyalg RSA -keysize 2048 -validity 10000
     - Configurar firma en Android Studio y compilar.
6) SHA256 del APK:
   certutil -hashfile ".\app-release.apk" SHA256

PWA ligero
- Incluido manifest web en src/assets/manifest.webmanifest y link en index.html.
- (Opcional) Añadir service worker: ng add @angular/pwa

Estructura principal
- src/app/core/services: characters, favorites, settings
- src/app/pages: explore, detail, favorites, settings (tabs)
- src/app/shared/components: character-card, rating-badge, empty-state
- src/app/shared/pipes: highlight.pipe

Consejos de uso
- Pull-to-refresh en Explorar fuerza recarga remota y resetea paginación.
- El corazón en tarjeta solo gestiona favoritos; detalle via icono “i” o botón.

Demo sugerida (3–5 min)
1) Abrir app en móvil/emulador/Chrome móvil.
2) Buscar “man”, mostrar resaltado y filtros (Marvel/DC, Héroe/Villano).
3) Ordenar por rating; hacer pull-to-refresh; scroll infinito.
4) Entrar a detalle; usar acciones (favorito/compartir/wiki).
5) Ver Favoritos; cambiar tema y tamaño de fuente en Ajustes.

Changelog (resumen)
- Integración API Akabab + mapeo y cache.
- Infinite scroll, skeletons, pull-to-refresh.
- Mejora tarjetas + rating estrellado y Detail.
- Limpieza de tabs y rutas; back fijo a /tabs/explore.
- Pruebas unitarias (6) y PWA ligero.
