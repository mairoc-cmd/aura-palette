# Usar una imagen oficial de Python ligera
FROM python:3.11-slim

# Instalar dependencias del sistema necesarias para OpenCV y MediaPipe
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar requerimientos e instalarlos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del motor
COPY colorimetry_engine.py .

# Exponer el puerto estándar que configurará la nube
EXPOSE 8000

# Comando para arrancar la aplicación
CMD ["uvicorn", "colorimetry_engine:app", "--host", "0.0.0.0", "--port", "8000"]
