import { db } from '../firebase-config'; // Adjust the path as necessary

async function fetchAllUsers() {
  try {
    const usersCollection = db.collection('Users');
    const snapshot = await usersCollection.get();
    const usersList = snapshot.docs.map(doc => doc.data());
    console.log(usersList);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

fetchAllUsers();
