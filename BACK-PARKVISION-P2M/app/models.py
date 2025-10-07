from sqlalchemy import Column, BigInteger, String, Float, ForeignKey, Integer, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from app.database import Base  # ici on peut importer Base (c'est propre maintenant)
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Date
from app.database import Base
Base = declarative_base()
class ParkingArea(Base):
    __tablename__ = "parking_areas"

    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    total_spots = Column(Integer, default=0)

    cameras = relationship("Camera", back_populates="parking_area", cascade="all, delete")


class Camera(Base):
    __tablename__ = "cameras"

    id = Column(BigInteger, primary_key=True)
    camera_code = Column(String, unique=True, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    parking_area_id = Column(BigInteger, ForeignKey("parking_areas.id", ondelete="CASCADE"))

    parking_area = relationship("ParkingArea", back_populates="cameras")
    spots = relationship("ParkingSpot", back_populates="camera", cascade="all, delete")


class ParkingSpot(Base):
    __tablename__ = "parking_spots"

    id = Column(BigInteger, primary_key=True)
    spot_code = Column(String, nullable=False)
    polygon = Column(Text)
    camera_id = Column(BigInteger, ForeignKey("cameras.id", ondelete="CASCADE"))

    camera = relationship("Camera", back_populates="spots")
    status = relationship("ParkingStatus", back_populates="spot", cascade="all, delete")


class ParkingStatus(Base):
    __tablename__ = "parking_status"

    id = Column(BigInteger, primary_key=True)
    spot_id = Column(BigInteger, ForeignKey("parking_spots.id", ondelete="CASCADE"))
    status = Column(String, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False)

    spot = relationship("ParkingSpot", back_populates="status")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    hashed_password = Column(String, nullable=False)