import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Aura Palette Colorimetry Engine")

# Permitir CORS para comunicación con el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ColorAnalyzer:
    def __init__(self, image_bytes):
        # 1. Cargar imagen desde bytes
        nparr = np.frombuffer(image_bytes, np.uint8)
        self.image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if self.image is None:
            raise ValueError("No se pudo procesar la imagen enviada.")
            
        self.hsv = cv2.cvtColor(self.image, cv2.COLOR_BGR2HSV)
        self.lab = cv2.cvtColor(self.image, cv2.COLOR_BGR2LAB)
        self.height, self.width, _ = self.image.shape

    def extract_skin_pixels(self):
        """Extrae la región de la piel usando MediaPipe FaceMesh o un fallback robusto de segmentación HSV en la zona central."""
        try:
            import mediapipe as mp
            if not hasattr(mp, 'solutions') or not hasattr(mp.solutions, 'face_mesh'):
                raise AttributeError("MediaPipe solutions face_mesh no disponible.")
                
            mp_face_mesh = mp.solutions.face_mesh
            with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1) as face_mesh:
                results = face_mesh.process(cv2.cvtColor(self.image, cv2.COLOR_BGR2RGB))
                if not results.multi_face_landmarks:
                    raise ValueError("No se detectó ningún rostro en la imagen mediante MediaPipe.")
                
                landmarks = results.multi_face_landmarks[0].landmark
                
                # Puntos clave de las mejillas (Landmarks de MediaPipe)
                cheek_pts = [117, 123, 50, 346, 352, 280]
                mask = np.zeros((self.height, self.width), dtype=np.uint8)
                
                coords = []
                for pt_idx in cheek_pts:
                    x = int(landmarks[pt_idx].x * self.width)
                    y = int(landmarks[pt_idx].y * self.height)
                    coords.append((x, y))
                
                # Crear polígono para extraer piel
                hull = cv2.convexHull(np.array(coords))
                cv2.fillConvexPoly(mask, hull, 255)
                
                # Filtrar sombras y brillos en espacio HSV (V = Valor/Luminosidad)
                v_channel = self.hsv[:, :, 2]
                valid_mask = (mask == 255) & (v_channel > 50) & (v_channel < 220)
                
                skin_lab = self.lab[valid_mask]
                skin_hsv = self.hsv[valid_mask]
                
                if len(skin_lab) > 0:
                    return skin_lab, skin_hsv
                raise ValueError("Región de piel vacía en detector de rostros.")
                
        except Exception as e:
            # Fallback robusto: Segmentación por rango de color de piel en la región central (donde suele estar el rostro en retratos)
            y_start, y_end = int(self.height * 0.25), int(self.height * 0.75)
            x_start, x_end = int(self.width * 0.25), int(self.width * 0.75)
            
            center_hsv = self.hsv[y_start:y_end, x_start:x_end]
            center_lab = self.lab[y_start:y_end, x_start:x_end]
            
            # Filtro de color de piel en HSV:
            # H: 0-25 o 165-180 (tonos de piel), S: 20-150, V: 50-240 (evita sombras y reflejos)
            h = center_hsv[:, :, 0]
            s = center_hsv[:, :, 1]
            v = center_hsv[:, :, 2]
            
            valid_mask = (((h >= 0) & (h <= 25)) | ((h >= 165) & (h <= 180))) & (s >= 20) & (s <= 150) & (v > 50) & (v < 240)
            
            skin_lab = center_lab[valid_mask]
            skin_hsv = center_hsv[valid_mask]
            
            if len(skin_lab) == 0:
                # Relajar el filtro si no se detectó nada
                valid_mask = (v > 40) & (v < 245)
                skin_lab = center_lab[valid_mask]
                skin_hsv = center_hsv[valid_mask]
                
            return skin_lab, skin_hsv

    def compute_metrics(self):
        skin_lab, skin_hsv = self.extract_skin_pixels()
        
        if len(skin_lab) == 0:
            raise ValueError("No se obtuvieron píxeles válidos de piel para el análisis.")

        # 2. Temperatura (Basado en el canal 'b' de CIE LAB: +b es cálido/amarillo, -b es frío/azul)
        # B-channel en OpenCV escala de 0 a 255 (128 es neutro)
        b_mean = np.mean(skin_lab[:, 2])
        temp_score = int(np.clip(((b_mean - 120) / 25) * 100, 0, 100)) # 0% muy frío, 100% muy cálido

        # 3. Valor / Claridad (Basado en el canal 'L' de CIE LAB: L-lightness)
        l_mean = np.mean(skin_lab[:, 0])
        value_score = int(np.clip((l_mean / 255) * 100, 0, 100)) # 0% oscuro, 100% claro

        # 4. Croma / Saturación (Basado en el canal 'S' de HSV)
        s_mean = np.mean(skin_hsv[:, 1])
        chroma_score = int(np.clip((s_mean / 255) * 100, 0, 100)) # 0% suave/muted, 100% brillante

        # 5. Determinación de la Estación
        station = self.classify_station(temp_score, value_score, chroma_score)

        return {
            "temperature": temp_score, # % Cálido
            "value": value_score,       # % Claro
            "chroma": chroma_score,     # % Saturado/Brillante
            "station_key": station
        }

    def classify_station(self, temp, val, chroma):
        """Mapeo a las 12 estaciones de colorimetría."""
        is_warm = temp > 50
        is_light = val > 50
        is_bright = chroma > 45

        if is_warm:
            if is_light and is_bright:
                return "warm-spring"
            elif is_light and not is_bright:
                return "light-spring"
            elif not is_light and not is_bright:
                return "deep-autumn"
            else:
                return "warm-autumn"
        else: # Frío
            if is_light and not is_bright:
                return "soft-summer"
            elif is_light and is_bright:
                return "light-summer"
            elif not is_light and is_bright:
                return "bright-winter"
            else:
                return "deep-winter"

@app.post("/api/analyze-color")
async def analyze_color(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo enviado debe ser una imagen.")
        
    try:
        contents = await file.read()
        analyzer = ColorAnalyzer(contents)
        result = analyzer.compute_metrics()
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
