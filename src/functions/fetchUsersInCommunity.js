import { db } from '../firebase-config.js';
import { doc, getDoc, collection } from 'firebase/firestore';

async function getListOfUserInCommunity(communityId) {
    // Access the Community collection from Firebase
    const communityDocRef = doc(collection(db, 'Community'), communityId); 

    try {
        // Get the document based on the document reference
        const community = await getDoc(communityDocRef);

        // Check if the document exists
        if (!community.exists()) {
            console.log('No matching document.');
            return [];
        }

        // Assign the 'members' array from the document data to listOfUsers
        const listOfUsers = community.data().members;
        console.log(listOfUsers);
        return listOfUsers;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error(error.message);
    }
}

export default { getListOfUserInCommunity };
