import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these placeholders with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock-project-id.firebaseapp.com",
  projectId: "mock-project-id",
  storageBucket: "mock-project-id.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// IMPORTANT: You must replace the placeholder values above with your actual Firebase project credentials
// from the Firebase console at https://console.firebase.google.com/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Mock Authentication functions
export const signInWithGoogle = async () => {
  try {
    console.log("Mock Google sign-in attempted");
    // Return a mock user for testing UI
    return {
      uid: "mock-user-id",
      displayName: "Test User",
      email: "test@example.com",
      photoURL: "https://via.placeholder.com/150"
    };
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    console.log("Mock sign-out attempted");
    // In a real app, this would sign the user out
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

// Mock Firestore functions for mood data
export const saveMoodEntry = async (userId, date, moodData) => {
  try {
    console.log(`Mock saving mood entry for user ${userId} on ${date}:`, moodData);
    // In a real app, this would save to Firestore
    return true;
  } catch (error) {
    console.error("Error saving mood entry: ", error);
    throw error;
  }
};

export const getMoodEntries = async (userId) => {
  try {
    console.log(`Mock getting mood entries for user ${userId}`);
    // Return some mock mood data for testing
    return {
      "2023-05-01": { level: 8, notes: "Had a great day!" },
      "2023-05-05": { level: 6, notes: "Pretty normal day" },
      "2023-05-10": { level: 3, notes: "Feeling down today" },
      "2023-05-15": { level: 9, notes: "Amazing day!" }
    };
  } catch (error) {
    console.error("Error getting mood entries: ", error);
    throw error;
  }
};

export const deleteMoodEntry = async (userId, date) => {
  try {
    console.log(`Mock deleting mood entry for user ${userId} on ${date}`);
    // In a real app, this would delete from Firestore
    return true;
  } catch (error) {
    console.error("Error deleting mood entry: ", error);
    throw error;
  }
};

// Export Firebase instances
export { auth, db }; 