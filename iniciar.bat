@echo off
title Aura Palette Launcher
echo ==========================================
echo       Iniciando Aura Palette...
echo ==========================================
echo.

:: 1. Iniciar el backend en segundo plano
echo [1/2] Iniciando motor de colorimetria en el puerto 8000...
start /b python -m uvicorn colorimetry_engine:app --host 0.0.0.0 --port 8000

:: Esperar 3 segundos para asegurar que el backend levanto
timeout /t 3 /nobreak >nul

:: 2. Abrir la interfaz web
echo [2/2] Abriendo Aura Palette en tu navegador...
start "" "index.html"

echo.
echo ==========================================
echo Servidor backend ACTIVO.
echo Para apagar el backend y cerrar el servicio,
echo simplemente cierra esta ventana de consola.
echo ==========================================
echo.

:: Mantener la consola abierta para que el usuario pueda cerrarla para apagar el server
pause >nul
taskkill /f /im python.exe >nul 2>&1
