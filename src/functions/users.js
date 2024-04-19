import {db} from '../Firebase/FirebaseConfig';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';

async function doesUserExist(snapshot) {
    if (!snapshot.exists()) throw new Error('User not found.');
}

// Change 'Users' path to appropriate members path when the collection is created
async function getUsers() {
  try {
    const usersCollection = collection(db, 'Users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
  } catch (err) {
    throw new Error('Error getting users: ' + err.message);
  }
}

async function getUserById(id) {
  try {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    return userSnapshot.data();
  } catch (err) {
    throw new Error('Error getting user by ID: ' + err.message);
  }
}

async function addUser(user) {
  try {
    if (!user.fullName || !user.email) {
        throw new Error('User must have a name and an email address.');
    }
    const { id } = await addDoc(collection(db, 'Users'), user);
    return id;
  } catch (err) {
    throw new Error('Error adding user: ' + err.message);
  }
}

// The shouldMerge parameter is optional and defaults to false.
// If set to true, the user object will be merged with the existing document and will not overwrite any existing fields.
// If set to false, the user object will overwrite the existing document.
async function updateUser(id, user, shouldMerge = false) {
  const userRef = doc(db, 'Users', id);
  try {
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    await setDoc(userRef, user, { merge: shouldMerge });
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
}

async function deleteUser(id) {
  try {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    await deleteDoc(userRef);
  } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser };
