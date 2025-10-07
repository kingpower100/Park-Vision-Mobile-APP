from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from app.models import User

from app.schemas import UserCreate, UserLogin,UserResponse
from app.database import get_db

SECRET_KEY = "my_secret_key"  # à sécuriser !
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

# Signup


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # ✅ Convertir ici la date en objet date
    try:
        parsed_dob = datetime.strptime(user.date_of_birth, "%d/%m/%Y").date()
    except ValueError:
        raise HTTPException(
            status_code=400, detail="Invalid date format. Use DD/MM/YYYY (e.g. 10/04/2000)"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        phone_number=user.phone_number,
        date_of_birth=parsed_dob,  # ✅ envoyé à la DB en date
        hashed_password=bcrypt.hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Login
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = jwt.encode(
        {
            "sub": db_user.email,
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": access_token, "token_type": "bearer"}
