from pydantic import BaseModel, EmailStr, field_validator
from typing import Annotated
from datetime import date, datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    date_of_birth: str  # ← ne pas mettre `date` ici
    password: str



class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str
    date_of_birth: date

    class Config:
        orm_mode = True

#parking 
#**************************************
from pydantic import BaseModel
from typing import Optional

class ParkingArea(BaseModel):
    id: int
    name: str
    lat: float
    lon: float
    total_spots: int

    class Config:
        orm_mode = True
