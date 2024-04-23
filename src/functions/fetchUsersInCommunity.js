import { db } from  '../firebase-config.js';
import { collection, getDocs} from 'firebase/firestore';

async function getListOfUserInCommunity(communityId) {
    const communityCollection = collection(db, 'Community');
    try {
        const snapshot = await getDocs(communityCollection)
        const listOfUsers = snapshot.docs.map(doc => [doc.data().members])
        console.log(listOfUsers)
        return listOfUsers
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error(error.message);
    }
}

export {getListOfUserInCommunity}