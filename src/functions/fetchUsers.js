import { initializeApp } from 'firebase/app';
import { db } from  '../firebase-config.js';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

async function fetchUsers() {
  const usersCollection = collection(db, 'Users');
  try {
    const snapshot = await getDocs(usersCollection);
    const usersList = snapshot.docs.map(doc => ({...doc.data()}));
    console.log(usersList);
    return usersList;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error(error.message);
  }
}

export default fetchUsers;

fetchUsers()