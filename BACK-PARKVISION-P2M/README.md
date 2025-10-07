# ParkVision Backend

A FastAPI-based backend service for smart parking management. Provides RESTful APIs for user authentication, parking area management, and real-time parking spot monitoring.

## 🚀 Features

- **User Authentication**: JWT-based authentication with signup/login
- **Parking Management**: CRUD operations for parking areas and spots
- **Real-time Monitoring**: Camera-based parking spot status tracking
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **RESTful API**: Comprehensive API endpoints with automatic documentation
- **CORS Support**: Cross-origin resource sharing for web/mobile clients

## 🛠 Tech Stack

- **Framework**: FastAPI (Python 3.12+)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with python-jose
- **Password Hashing**: bcrypt with passlib
- **Validation**: Pydantic models
- **Server**: Uvicorn ASGI server
- **Database Migrations**: Alembic

## 🏗 Project Structure

```
smart-parking-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic request/response models
│   ├── crud.py              # Database CRUD operations
│   └── routes/              # API route handlers
│       ├── __init__.py
│       ├── auth_routes.py   # Authentication endpoints
│       └── parking_routes.py # Parking management endpoints
├── requirements.txt         # Python dependencies
├── venv/                   # Virtual environment
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- PostgreSQL 12+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BACK-PARKVISION-P2M/smart-parking-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database**
   - Install PostgreSQL
   - Create database: `parkvision_db`
   - Update connection string in `app/config.py`

5. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the server**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/parkvision_db

# JWT Configuration
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

### Database Models

#### User Model
```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    hashed_password = Column(String, nullable=False)
```

#### Parking Area Model
```python
class ParkingArea(Base):
    __tablename__ = "parking_areas"
    
    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    total_spots = Column(Integer, default=0)
```

#### Camera Model
```python
class Camera(Base):
    __tablename__ = "cameras"
    
    id = Column(BigInteger, primary_key=True)
    camera_code = Column(String, unique=True, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    parking_area_id = Column(BigInteger, ForeignKey("parking_areas.id"))
```

#### Parking Spot Model
```python
class ParkingSpot(Base):
    __tablename__ = "parking_spots"
    
    id = Column(BigInteger, primary_key=True)
    spot_code = Column(String, nullable=False)
    polygon = Column(Text)
    camera_id = Column(BigInteger, ForeignKey("cameras.id"))
```

## 📡 API Endpoints

### Authentication Endpoints

#### POST `/signup`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone_number": "+1234567890",
  "date_of_birth": "10/04/2000"
}
```

#### POST `/login`
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

### Parking Management Endpoints

#### GET `/parking-areas/`
Get all parking areas
```json
[
  {
    "id": 1,
    "name": "Downtown Parking",
    "lat": 36.8008,
    "lon": 10.1817,
    "total_spots": 50
  }
]
```

#### GET `/parking-areas/{area_id}`
Get specific parking area by ID

## 🔐 Authentication

### JWT Token Implementation

- **Secret Key**: Configurable via environment variables
- **Algorithm**: HS256
- **Expiration**: 30 minutes (configurable)
- **Token Format**: Bearer token in Authorization header

### Password Security

- **Hashing**: bcrypt with salt
- **Validation**: Email uniqueness, phone number uniqueness
- **Date Format**: DD/MM/YYYY for date of birth

## 🗄️ Database Schema

### Relationships

```
ParkingArea (1) ──→ (N) Camera
Camera (1) ──→ (N) ParkingSpot
ParkingSpot (1) ──→ (N) ParkingStatus
```

### Key Features

- **Cascade Deletes**: Deleting a parking area removes all associated cameras and spots
- **Foreign Key Constraints**: Maintains data integrity
- **Indexed Fields**: Email and phone number for fast lookups
- **Timestamp Tracking**: Parking status includes timestamp for real-time monitoring

## 🚀 Development

### Running in Development Mode

```bash
# Start with auto-reload
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Start with specific host/port
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## 🧪 Testing

### Manual Testing

Use the interactive API documentation at `/docs` to test endpoints:

1. Navigate to http://localhost:8000/docs
2. Try the authentication endpoints
3. Test parking area endpoints
4. Verify CORS headers for frontend integration

### Example API Calls

```bash
# Register user
curl -X POST "http://localhost:8000/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone_number": "+1234567890",
    "date_of_birth": "10/04/2000"
  }'

# Login
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get parking areas
curl -X GET "http://localhost:8000/parking-areas/"
```

## 🚀 Deployment

### Production Configuration

1. **Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:pass@prod-db:5432/parkvision
   SECRET_KEY=your-production-secret-key
   ```

2. **Database Setup**
   ```bash
   # Create production database
   createdb parkvision_prod
   
   # Run migrations
   alembic upgrade head
   ```

3. **Server Deployment**
   ```bash
   # Using gunicorn with uvicorn workers
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   
   # Or using uvicorn directly
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

### Docker Deployment

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔧 Configuration Options

### CORS Settings

The API is configured to accept requests from:
- All origins (`*`) - **Change for production**
- All methods (`*`)
- All headers (`*`)
- Credentials enabled

### Database Connection

- **Pool Size**: Configurable connection pooling
- **Timeout**: Connection timeout settings
- **SSL**: Optional SSL for production databases

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check connection string format
   - Ensure database exists

2. **Import Errors**
   - Activate virtual environment
   - Install all dependencies
   - Check Python path

3. **CORS Issues**
   - Verify CORS middleware configuration
   - Check frontend URL in allowed origins

## 📊 Monitoring

### Health Check

The API includes a root endpoint for health checks:
```
GET /
Response: {"message": "Smart Parking Backend OK"}
```

### Logging

Configure logging for production:
```python
import logging
logging.basicConfig(level=logging.INFO)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**ParkVision Backend** - Smart Parking API 🚗🔧
