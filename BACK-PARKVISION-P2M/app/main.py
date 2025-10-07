from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importez vos routers
from app.routes.auth_routes    import router as auth_router
from app.routes.parking_routes import router as parking_router

app = FastAPI()

# ① CORS : autorise vos appels depuis Expo / navigateur
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # en prod, remplacez par votre(s) URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ② Enregistrement des routers
app.include_router(auth_router)      # routes /auth/*
app.include_router(parking_router)   # routes /parking-spots/*

# (optionnel) racine pour tester que ça tourne
@app.get("/")
def root():
    return {"message": "Smart Parking Backend OK"}
