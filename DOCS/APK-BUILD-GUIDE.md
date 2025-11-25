# Guía para compilar APK de Heroes & Villanos sin Android Studio

## 📋 Requisitos Previos

- ✅ Node.js instalado (v20+)
- ✅ Java JDK instalado (v17+)
- ✅ Proyecto ya tiene Gradle Wrapper incluido

## 🚀 Métodos de Compilación

### Método 1: Script Automatizado (RECOMENDADO)

```powershell
# Ejecutar desde la raíz del proyecto
.\build-apk.ps1
```

Este script automáticamente:
1. Compila la aplicación web
2. Sincroniza con Capacitor
3. Genera el APK
4. Muestra la ubicación y hash del archivo

---

### Método 2: Manual (Paso a Paso)

```powershell
# 1. Compilar aplicación web
npm run build

# 2. Sincronizar con Capacitor
npx cap sync android

# 3. Generar APK
cd android
.\gradlew assembleDebug
cd ..
```

**APK generado en:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

### Método 3: APK Release (Firmado)

Para generar un APK de producción firmado:

#### 3.1. Crear Keystore

```powershell
cd android\app
keytool -genkey -v -keystore heroes-villains.keystore -alias heroes-villains -keyalg RSA -keysize 2048 -validity 10000
```

Responde las preguntas:
- Contraseña: (guárdala en lugar seguro)
- Nombre y apellido
- Organización
- Ciudad, Estado, País

#### 3.2. Configurar Gradle

Crear archivo `android/keystore.properties`:

```properties
storePassword=TU_CONTRASEÑA_AQUI
keyPassword=TU_CONTRASEÑA_AQUI
keyAlias=heroes-villains
storeFile=app/heroes-villains.keystore
```

#### 3.3. Modificar `android/app/build.gradle`

Agregar antes de `android {`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {`, agregar:

```gradle
signingConfigs {
    release {
        if (keystorePropertiesFile.exists()) {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

#### 3.4. Compilar Release

```powershell
cd android
.\gradlew assembleRelease
```

**APK release en:**
```
android\app\build\outputs\apk\release\app-release.apk
```

---

## 🌐 Método 4: Ionic AppFlow (Build en la Nube)

Si tu PC tiene problemas con el build local:

```powershell
# 1. Instalar Ionic CLI
npm install -g @ionic/cli

# 2. Login en Ionic (crear cuenta gratis en ionic.io)
ionic login

# 3. Conectar proyecto
ionic link

# 4. Build en la nube
ionic package build android --type=debug

# 5. Descargar APK
ionic package download
```

---

## 🐙 Método 5: GitHub Actions (Automatizado)

El proyecto ya incluye `.github/workflows/build-android.yml`

### Pasos:

1. Sube el proyecto a GitHub
2. Ve a "Actions" en tu repositorio
3. Ejecuta manualmente "Build Android APK"
4. Descarga el APK desde "Artifacts"

---

## 📱 Instalación en Dispositivo

### Opción A: Cable USB

```powershell
# 1. Habilitar "Depuración USB" en tu Android
# 2. Conectar dispositivo
# 3. Instalar con ADB (si tienes Android SDK)
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

### Opción B: Manual

1. Copia `app-debug.apk` a tu teléfono (cable, email, Drive, etc.)
2. En Android: Ajustes → Seguridad → "Instalar apps desconocidas" → Habilitar para tu navegador/gestor archivos
3. Abre el APK desde el teléfono
4. Acepta la instalación

---

## 🔍 Verificar APK

### Ver información del APK

```powershell
# Tamaño
Get-Item android\app\build\outputs\apk\debug\app-debug.apk | Select-Object Name, @{N='Size (MB)';E={[math]::Round($_.Length/1MB, 2)}}

# Hash SHA256 (para documentación)
Get-FileHash android\app\build\outputs\apk\debug\app-debug.apk -Algorithm SHA256
```

### Analizar contenido (si tienes aapt)

```powershell
aapt dump badging android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ⚠️ Solución de Problemas

### Error: "JAVA_HOME not set"

```powershell
# Verificar Java
java -version

# Configurar JAVA_HOME (ajusta la ruta)
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
```

### Error: "SDK location not found"

Crear `android/local.properties`:

```properties
sdk.dir=C\:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk
```

### Build muy lento

Primera vez es normal (descarga dependencias). Builds subsecuentes serán más rápidos.

### Gradle daemon issues

```powershell
cd android
.\gradlew --stop
.\gradlew assembleDebug
```

---

## 📊 Información del APK

- **App ID**: `com.heroesvillanos.app`
- **Nombre**: "Heroes y Villanos"
- **Versión**: 1.0.0
- **Min SDK**: Android 5.0 (API 21)
- **Target SDK**: Android 14 (API 34)
- **Tamaño estimado**: ~5-15 MB (debug), ~3-8 MB (release)

---

## 📝 Para el Parcial

Incluir en la documentación:

1. **APK**: Archivo `app-debug.apk` o `app-release.apk`
2. **Hash SHA256**: Output de `Get-FileHash`
3. **Screenshots**: Capturas de la app instalada
4. **Manual**: Instrucciones de instalación

```powershell
# Generar hash para documentación
Get-FileHash android\app\build\outputs\apk\debug\app-debug.apk -Algorithm SHA256 | Format-List
```

---

## 🎯 Checklist Final

- [ ] APK compilado exitosamente
- [ ] APK instalado en dispositivo de prueba
- [ ] Todas las funcionalidades testeadas
- [ ] Screenshots tomados
- [ ] Hash SHA256 documentado
- [ ] Manual de instalación escrito
- [ ] APK incluido en entrega (o link de descarga)
