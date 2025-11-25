# 🌐 Compilar APK usando Ionic AppFlow (Sin instalar nada)

## ❌ Problema Detectado

Tu PC tiene Java 24, pero Gradle 8.11.1 requiere Java 17 o 21.
**Solución más rápida**: Usar build en la nube con Ionic AppFlow.

---

## ✅ Solución: Ionic AppFlow (GRATIS)

### Paso 1: Instalar Ionic CLI

```powershell
npm install -g @ionic/cli
```

### Paso 2: Crear cuenta en Ionic (GRATIS)

```powershell
ionic login
```

Esto abrirá tu navegador. Crea una cuenta gratuita en https://ionic.io

### Paso 3: Conectar tu proyecto

```powershell
cd "c:\Users\Auxiliar Tic's\Downloads\heroes-villains"
ionic link
```

Selecciona "Create new app" y dale un nombre.

### Paso 4: Push a Ionic Git (o usa GitHub)

```powershell
# Si no tienes Git inicializado
git init
git add .
git commit -m "Initial commit"

# Agregar remote de Ionic (te lo dará el comando anterior)
ionic git remote
```

### Paso 5: Build en la nube

```powershell
ionic package build android --type=debug
```

Espera 5-10 minutos. El APK se compilará en servidores de Ionic.

### Paso 6: Descargar APK

```powershell
ionic package download
```

---

## 🚀 Alternativa MÁS RÁPIDA: GitHub + GitHub Actions

Ya creé el workflow automatizado. Solo necesitas:

### 1. Crear repositorio en GitHub

Ve a https://github.com/new y crea un repo nuevo.

### 2. Push tu código

```powershell
cd "c:\Users\Auxiliar Tic's\Downloads\heroes-villains"

# Inicializar Git (si no está)
git init
git add .
git commit -m "Heroes y Villanos - Proyecto final"

# Conectar con GitHub (reemplaza con tu repo)
git remote add origin https://github.com/TU_USUARIO/heroes-villains.git
git branch -M main
git push -u origin main
```

### 3. Ejecutar workflow

1. Ve a tu repo en GitHub
2. Click en "Actions"
3. Selecciona "Build Android APK"
4. Click "Run workflow" → "Run workflow"
5. Espera ~10 minutos
6. Descarga el APK de "Artifacts"

---

## 💻 Alternativa LOCAL: Instalar Java 17

Si prefieres compilar localmente:

### Opción A: Usando Chocolatey

```powershell
# Instalar Chocolatey (si no lo tienes)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar Java 17
choco install openjdk17 -y
```

### Opción B: Descarga manual

1. Ve a: https://adoptium.net/temurin/releases/?version=17
2. Descarga: **Windows x64 JDK .msi**
3. Instala
4. Edita `android/gradle.properties`:
   ```properties
   org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.XX-hotspot
   ```

Luego:

```powershell
cd android
.\gradlew assembleDebug
```

---

## ⚡ Mi Recomendación

**Para entrega del parcial HOY**: Usa **GitHub Actions** (más confiable y documentable)

**Para desarrollo futuro**: Instala Java 17 localmente

---

## 🆘 Si todo falla: EAS Build (Expo)

Otra alternativa cloud gratuita:

```powershell
npm install -g eas-cli
eas build --platform android
```

Pero requiere configuración adicional.
