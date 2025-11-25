# Script para compilar APK sin Android Studio
# Uso: .\build-apk.ps1

Write-Host "🚀 Iniciando compilación de APK..." -ForegroundColor Cyan
Write-Host ""

# Paso 1: Build web
Write-Host "📦 Paso 1/4: Compilando aplicación web..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build web" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build web completado" -ForegroundColor Green
Write-Host ""

# Paso 2: Sync Capacitor
Write-Host "🔄 Paso 2/4: Sincronizando con Capacitor..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en la sincronización" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Sincronización completada" -ForegroundColor Green
Write-Host ""

# Paso 3: Build APK
Write-Host "🔨 Paso 3/4: Compilando APK (esto puede tardar varios minutos)..." -ForegroundColor Yellow
cd android
.\gradlew assembleDebug
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al compilar APK" -ForegroundColor Red
    cd ..
    exit 1
}
cd ..
Write-Host "✅ APK compilado exitosamente" -ForegroundColor Green
Write-Host ""

# Paso 4: Ubicación del APK
$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "🎉 ¡ÉXITO! APK generado correctamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Ubicación: $apkPath" -ForegroundColor Cyan
    Write-Host "📏 Tamaño: $($apkSize.ToString('F2')) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📱 Para instalar en tu dispositivo:" -ForegroundColor Yellow
    Write-Host "   1. Copia el APK a tu teléfono" -ForegroundColor White
    Write-Host "   2. Habilita 'Instalar desde fuentes desconocidas'" -ForegroundColor White
    Write-Host "   3. Abre el APK y acepta la instalación" -ForegroundColor White
    Write-Host ""
    
    # Calcular hash SHA256
    Write-Host "🔐 Calculando hash SHA256..." -ForegroundColor Yellow
    $hash = (Get-FileHash -Path $apkPath -Algorithm SHA256).Hash
    Write-Host "SHA256: $hash" -ForegroundColor Cyan
    Write-Host ""
    
    # Abrir carpeta
    Write-Host "¿Deseas abrir la carpeta del APK? (S/N)" -ForegroundColor Yellow
    $respuesta = Read-Host
    if ($respuesta -eq "S" -or $respuesta -eq "s") {
        explorer.exe (Split-Path -Parent (Resolve-Path $apkPath))
    }
} else {
    Write-Host "❌ No se encontró el APK en la ubicación esperada" -ForegroundColor Red
    exit 1
}
