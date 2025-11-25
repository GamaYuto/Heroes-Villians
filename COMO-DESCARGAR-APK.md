# 📱 Instrucciones para Descargar el APK

## ✅ Tu código ya está en GitHub!

Repositorio: https://github.com/GamaYuto/Heroes-Villians

---

## 🚀 Pasos para Generar el APK

### 1. Ir a GitHub Actions

Abre tu navegador y ve a:
```
https://github.com/GamaYuto/Heroes-Villians/actions
```

### 2. Ejecutar el Workflow

1. Click en **"Build Android APK"** en el menú izquierdo
2. Click en el botón **"Run workflow"** (arriba a la derecha)
3. Selecciona **"Branch: main"**
4. Click en **"Run workflow"** verde

### 3. Esperar la Compilación

- El proceso tarda aproximadamente **10-15 minutos**
- Verás un círculo amarillo 🟡 girando mientras compila
- Cuando termine, aparecerá una ✅ verde

### 4. Descargar el APK

1. Click en el workflow completado
2. Scroll hacia abajo hasta la sección **"Artifacts"**
3. Click en **"app-debug"** para descargar
4. Descomprime el ZIP
5. ¡Tendrás tu `app-debug.apk`!

---

## 📱 Instalar en tu Dispositivo Android

### Opción A: Transferir por Cable

1. Conecta tu teléfono a la PC con USB
2. Copia `app-debug.apk` a tu teléfono
3. En el teléfono, ve a Ajustes → Seguridad → "Instalar apps desconocidas"
4. Habilita para tu gestor de archivos
5. Abre el APK desde el teléfono
6. Click "Instalar"

### Opción B: Transferir por Internet

1. Sube el APK a Google Drive / OneDrive / Dropbox
2. Abre el link desde tu teléfono
3. Descarga el APK
4. Sigue los pasos 3-6 de la Opción A

---

## 🔍 Verificar el APK (Para Documentación)

Después de descargar, ejecuta en PowerShell:

```powershell
# Ver tamaño
Get-Item app-debug.apk | Select-Object Name, @{N='Tamaño (MB)';E={[math]::Round($_.Length/1MB, 2)}}

# Calcular SHA256 (incluir en documentación del parcial)
Get-FileHash app-debug.apk -Algorithm SHA256 | Format-List
```

---

## 📊 Información del APK

- **Nombre App**: Heroes y Villanos
- **Package ID**: com.heroesvillanos.app
- **Versión**: 1.0.0
- **Min Android**: 5.0 (API 21)
- **Target Android**: 14 (API 34)
- **Tamaño estimado**: 5-10 MB

---

## ⚠️ Si el Workflow Falla

Si ves un ❌ rojo en GitHub Actions:

1. Click en el workflow fallido
2. Click en "build" para ver el log
3. Busca el error en rojo
4. Avísame y te ayudo a corregirlo

---

## 🎓 Para el Parcial - Incluir:

✅ **Link del repositorio**: https://github.com/GamaYuto/Heroes-Villians
✅ **APK**: app-debug.apk (descargado de GitHub Actions)
✅ **Hash SHA256**: [ejecutar comando de arriba]
✅ **Screenshots**: Capturas de la app funcionando
✅ **Manual de instalación**: Este documento

---

## 📸 Screenshots Sugeridos

1. Pantalla de Explorar (con personajes)
2. Detalle de un personaje
3. Pantalla de Favoritos
4. Ajustes (tema claro/oscuro)
5. Búsqueda funcionando
6. Filtros aplicados

---

## 🔗 Links Útiles

- **Repositorio**: https://github.com/GamaYuto/Heroes-Villians
- **Actions**: https://github.com/GamaYuto/Heroes-Villians/actions
- **Releases** (opcional): Puedes crear un release con el APK

---

## 💡 Tip: Crear un Release

Para que el APK sea más fácil de descargar:

1. Ve a: https://github.com/GamaYuto/Heroes-Villians/releases
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Title: `Heroes y Villanos v1.0.0 - Parcial Final`
5. Arrastra tu `app-debug.apk` al área de archivos
6. Click "Publish release"

Ahora cualquiera puede descargar desde:
```
https://github.com/GamaYuto/Heroes-Villians/releases/latest
```
