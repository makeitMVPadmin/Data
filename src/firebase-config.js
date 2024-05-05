// import 'dotenv/config'
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPDdjCDshFDYFV9aq6AKaQEMjykiqsi6M",
  authDomain: "memberdatap3.firebaseapp.com",
  projectId: "memberdatap3",
  storageBucket: "memberdatap3.appspot.com",
  mesagingSenderId: "680633714418",
  appId: "1:680633714418:web:c521da7d9f16b75184b26b",
  measurementId: "G-XMYEWZ3KV7"

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };