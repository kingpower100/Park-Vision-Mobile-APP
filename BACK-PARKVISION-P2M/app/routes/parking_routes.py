# routers/parking_areas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/parking-areas",
    tags=["parking-areas"],
)

@router.get("/", response_model=List[schemas.ParkingArea])
def read_parking_areas(db: Session = Depends(get_db)):
    areas = db.query(models.ParkingArea).all()
    return areas

@router.get("/{area_id}", response_model=schemas.ParkingArea)
def read_parking_area(area_id: int, db: Session = Depends(get_db)):
    area = db.query(models.ParkingArea).get(area_id)
    if not area:
        raise HTTPException(status_code=404, detail="Parking area not found")
    return area
