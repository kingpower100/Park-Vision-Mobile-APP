# ParkVision Frontend

A React Native mobile application built with Expo for smart parking management. The app provides real-time parking spot availability, interactive maps, and user authentication.

## 🚀 Features

- **Interactive Maps**: Real-time parking spot visualization with react-native-maps
- **User Authentication**: Signup and login functionality
- **Location Services**: GPS-based parking spot discovery
- **Cross-Platform**: iOS, Android, and Web support
- **Real-time Data**: Live parking availability updates
- **Navigation Integration**: Direct navigation to parking spots

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router
- **Maps**: React Native Maps with web compatibility
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Location**: Expo Location
- **UI Components**: React Native components with custom styling
- **TypeScript**: Full TypeScript support

## 📱 Supported Platforms

- **iOS**: Native iOS app with full map functionality
- **Android**: Native Android app with full map functionality  
- **Web**: Web-compatible version with fallback map components

## 🏗 Project Structure

```
app/
├── (tabs)/                 # Tab navigation screens
├── components/            # Reusable UI components
│   ├── MapView.web.tsx   # Web-compatible map component
│   ├── Marker.web.tsx    # Web-compatible marker component
│   └── Circle.web.tsx    # Web-compatible circle component
├── context/              # React Context providers
│   └── AuthContext.tsx   # Authentication context
├── services/             # API services
│   └── api.ts           # Backend API integration
├── assets/              # Static assets
│   ├── images/          # App images and icons
│   ├── fonts/           # Custom fonts
│   ├── publicMarkers.ts # Public parking markers data
│   └── privateMarkers.ts # Private parking markers data
├── Home.tsx             # Home screen
├── login.tsx            # Login screen
├── signup.tsx           # Registration screen
├── Parking.tsx          # Parking management screen
├── ParkingMapScreen.tsx # Main map screen
└── UserEntry.tsx        # User profile screen
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FRONT-PARKVISION-P2M-/ParkVision
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android  
   npm run android
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
EXPO_PUBLIC_API_URL=http://localhost:8000

# For production
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

### API Configuration

The app connects to a FastAPI backend. Update the API URL in `app/services/api.ts`:

```typescript
const BASE_URL = Platform.OS === "android"
  ? "http://10.0.2.2:8000"          // Android emulator
  : "http://192.168.1.18:8000";     // iOS simulator or device
```

## 📱 Development

### Available Scripts

- `npm run start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

### Web Compatibility

The app includes web-compatible components for react-native-maps:

- `MapView.web.tsx` - Web fallback for map component
- `Marker.web.tsx` - Web fallback for markers
- `Circle.web.tsx` - Web fallback for map circles

These components provide a functional interface on web while maintaining the same API as native components.

## 🗺️ Map Features

### Parking Data Sources

- **Public Markers**: Static parking locations from `assets/publicMarkers.ts`
- **Private Markers**: Dynamic parking areas from backend API
- **User Location**: GPS-based current location with permission handling

### Map Functionality

- Real-time parking spot visualization
- Interactive markers with parking information
- User location tracking
- Navigation integration with Google Maps
- Parking spot availability status

## 🔐 Authentication

### User Registration
- Name, email, phone number, date of birth
- Password hashing and validation
- Email uniqueness validation

### User Login
- JWT token-based authentication
- Secure credential validation
- Token expiration handling

## 📊 API Integration

### Endpoints Used:

- `POST /signup` - User registration
- `POST /login` - User authentication  
- `GET /parking-areas/` - Fetch parking areas

### Data Models

```typescript
interface ParkingAreaDTO {
  id: number;
  name: string;
  lat: number;
  lon: number;
  total_spots: number;
}

interface SignupData {
  name: string;
  password: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
}
```

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "ParkVision",
       "slug": "parkvision",
       "version": "1.0.0"
     }
   }
   ```

2. **Build for platforms**
   ```bash
   # iOS
   expo build:ios
   
   # Android
   expo build:android
   
   # Web
   expo export:web
   ```

### App Store Deployment

1. Configure app store credentials
2. Build production version
3. Submit to App Store/Google Play

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo install --fix
   ```

2. **Web compatibility issues**
   - Ensure web-compatible components are in place
   - Check metro.config.js configuration

3. **Location permissions**
   - Verify location permissions in app.json
   - Test on physical device for GPS functionality

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
Tea

---

**ParkVision** - Smart Parking Made Simple 🚗📍