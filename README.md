# ParkVision - Smart Parking Management System

A comprehensive smart parking solution consisting of a React Native mobile application and FastAPI backend service. The system provides real-time parking spot monitoring, interactive maps, and user management.

## 🏗️ Project Architecture

```
ParkVision/
├── FRONT-PARKVISION-P2M-/ParkVision/    # React Native Mobile App
├── BACK-PARKVISION-P2M/smart-parking-backend/  # FastAPI Backend
└── README.md                            # This file
```

## 🚀 System Overview

### Frontend (React Native + Expo)
- **Platform**: Cross-platform mobile app (iOS, Android, Web)
- **Framework**: React Native with Expo SDK 54
- **Features**: Interactive maps, user authentication, real-time parking data
- **Maps**: React Native Maps with web compatibility
- **Navigation**: Expo Router for seamless navigation

### Backend (FastAPI + PostgreSQL)
- **Framework**: FastAPI with Python 3.12+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based authentication
- **API**: RESTful API with automatic documentation
- **Features**: User management, parking area management, real-time monitoring

## 🎯 Key Features

### 🗺️ Interactive Parking Maps
- Real-time parking spot visualization
- GPS-based location services
- Public and private parking areas
- Navigation integration

### 👤 User Management
- User registration and authentication
- JWT token-based security
- Profile management
- Secure password handling

### 📊 Real-time Monitoring
- Camera-based parking spot detection
- Live availability updates
- Parking area management
- Status tracking

### 🌐 Cross-Platform Support
- **iOS**: Native iOS app with full functionality
- **Android**: Native Android app with full functionality
- **Web**: Web-compatible version with fallback components

## 🛠️ Technology Stack

### Frontend Technologies
- **React Native**: 0.79.5
- **Expo SDK**: 54.0.0
- **TypeScript**: 5.8.3
- **React Navigation**: 7.x
- **React Native Maps**: 1.20.1
- **Axios**: HTTP client
- **Expo Location**: GPS services

### Backend Technologies
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: Python ORM
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.12+
- PostgreSQL 12+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd BACK-PARKVISION-P2M/smart-parking-backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure database (create PostgreSQL database)
# Update DATABASE_URL in app/config.py

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd FRONT-PARKVISION-P2M-/ParkVision

# Install dependencies
npm install

# Start Expo development server
npm run start
```

### 3. Access the Applications

- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Frontend Mobile**: Scan QR code with Expo Go app
- **Frontend Web**: http://localhost:8081 (or 8082)

## 📱 Mobile App Features

### 🗺️ Map Functionality
- Interactive parking maps with real-time data
- GPS-based user location tracking
- Parking spot markers with availability status
- Navigation integration with Google Maps

### 🔐 Authentication
- User registration with validation
- Secure login with JWT tokens
- Profile management
- Password security with bcrypt

### 📊 Data Management
- Real-time parking area data
- Public and private parking locations
- User location services
- Offline-capable components

## 🔧 Backend API Features

### 🔐 Authentication Endpoints
- `POST /signup` - User registration
- `POST /login` - User authentication
- JWT token management
- Secure password handling

### 🅿️ Parking Management
- `GET /parking-areas/` - List all parking areas
- `GET /parking-areas/{id}` - Get specific parking area
- Real-time parking spot monitoring
- Camera-based detection system

### 📊 Database Models
- **Users**: User profiles and authentication
- **Parking Areas**: Parking location management
- **Cameras**: Monitoring camera locations
- **Parking Spots**: Individual parking spaces
- **Parking Status**: Real-time availability tracking

## 🌐 Web Compatibility

The frontend includes web-compatible components for cross-platform support:

- **MapView.web.tsx**: Web fallback for map functionality
- **Marker.web.tsx**: Web-compatible parking markers
- **Circle.web.tsx**: Web-compatible map circles
- **Metro Configuration**: Web platform handling

## 🔧 Configuration

### Frontend Configuration
- Update API URL in `app/services/api.ts`
- Configure platform-specific settings
- Set up environment variables

### Backend Configuration
- Database connection settings
- JWT secret key configuration
- CORS settings for frontend integration

## 📊 Database Schema

### Core Entities
```
Users (1) ──→ (N) Parking Areas
Parking Areas (1) ──→ (N) Cameras
Cameras (1) ──→ (N) Parking Spots
Parking Spots (1) ──→ (N) Parking Status
```

### Key Relationships
- **Cascade Deletes**: Maintains data integrity
- **Foreign Keys**: Enforces referential integrity
- **Indexes**: Optimized for fast queries
- **Timestamps**: Real-time status tracking

## 🚀 Deployment

### Backend Deployment
1. Configure production database
2. Set environment variables
3. Run database migrations
4. Deploy with Uvicorn/Gunicorn

### Frontend Deployment
1. Configure production API URLs
2. Build for target platforms
3. Deploy to app stores
4. Configure web hosting

## 🧪 Testing

### Backend Testing
- Use Swagger UI at `/docs`
- Test authentication endpoints
- Verify database operations
- Check CORS configuration

### Frontend Testing
- Test on iOS/Android devices
- Verify web compatibility
- Test map functionality
- Validate user flows

## 📈 Performance Considerations

### Frontend Optimization
- Lazy loading for maps
- Image optimization
- Bundle size optimization
- Platform-specific builds

### Backend Optimization
- Database query optimization
- Connection pooling
- Caching strategies
- API response optimization

## 🔒 Security Features

### Authentication Security
- JWT token expiration
- Password hashing with bcrypt
- Input validation with Pydantic
- CORS configuration

### Data Security
- SQL injection prevention
- Input sanitization
- Secure database connections
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
   
## 🖼️ Screenshots & Demos


## Splash Screens

![IMG_1](https://github.com/user-attachments/assets/893ee96e-07c4-4a15-af61-62940f56214d)



![Image1](https://github.com/user-attachments/assets/e5c6fb9b-a2fd-474e-8396-35f3f1dea1de)

## Sign up Screen
![IMG_2](https://github.com/user-attachments/assets/fe993fa9-56e8-47f0-99ca-df1e3cf88369)

## Login Screen 
![IMG_0722](https://github.com/user-attachments/assets/3dae8256-386d-4195-8a22-44ddefd9d84d)

## App Workflow
![IMG_0723](https://github.com/user-attachments/assets/eb7ee9ea-eb34-4d2f-bad6-23525ffd46b4)

![IMG_0725](https://github.com/user-attachments/assets/46f7f197-161d-4517-9f6c-c3fdcc6ae28f)

![IMG_0728](https://github.com/user-attachments/assets/abf059f4-4c7b-4699-b9b1-b912eedbd50d)



## 📄 License
This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the individual README files for detailed documentation

## 🎯 Future Enhancements

- **Real-time Notifications**: Push notifications for parking updates
- **Payment Integration**: In-app payment processing
- **Analytics Dashboard**: Parking usage analytics
- **Machine Learning**: Predictive parking availability
- **IoT Integration**: Sensor-based parking detection

---

**ParkVision** - Revolutionizing Smart Parking Management 🚗📍✨

*Built with ❤️ using React Native, FastAPI, and modern web technologies*
