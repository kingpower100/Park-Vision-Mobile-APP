// service/api.ts
import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8000"          // Android emulator
    : "http://192.168.1.18:8000";     // iOS simulator or device

// Interfaces pour typer les données
export interface SignupData {
  name: string;
  password: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TopupData {
  userId: number;
  amount: number;
}

// Signup - Inscription d'un nouvel utilisateur
export const signup = async (userData: SignupData) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Signup failed');
  }

  return res.json(); // exemple : { id, name, email, ... }
};

// Login - Connexion d'un utilisateur
export const login = async (credentials: LoginCredentials) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Login failed");
  }

  return res.json(); // exemple : { access_token: "..." }
};

//Parking 

export type ParkingAreaDTO = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  total_spots: number;
};



const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Fetch parking areas
export async function fetchParkingAreas(): Promise<ParkingAreaDTO[]> {
  const resp = await api.get<ParkingAreaDTO[]>("/parking-areas/");
  return resp.data;
}