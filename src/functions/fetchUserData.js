import { db } from  '../firebase-config.js';
import { collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore';

async function getCommunityMembers(communityId) {
  try {
    // Reference to the collection
    const communitiesRef = collection(db, 'Communities');
    // Create a query against the collection looking for the communityId field
    const q = query(communitiesRef, where("communityId", "==", communityId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No such document!");
        return []; // Return an empty array or handle as needed
    } else {
        const allMembers = querySnapshot.docs.flatMap(doc => doc.data().members || []);
        return allMembers;
    }
  } catch (error) {
    console.error("Error in getCommunityMembers:", error);
    throw error; // Re-throw the error to handle it further up in your call stack
  }
}

// Function takes list of users, recieved from the community table
async function getUserDetails(listOfUsers) {
  const usersCollection = collection(db, 'Users');
  const usersList = []
  
  // for each user id in the array we will pull their data
  for(let userId of listOfUsers){
      try {
        // pull specific row where user id matches in firebase
        const userDoc = doc(usersCollection, userId)

        // async functionality, wait until we get the data
        const docSnapshot = await getDoc(userDoc);

        // checks if the user exists and if they do, push all there details to the users list
        if(docSnapshot.exists()) {
            usersList.push({...docSnapshot.data()})
        } else {
            console.log(`No user found with ID: ${userId}`)
        }
      } catch (error) {
          console.error("Failed to fetch users:", error);
          throw new Error(error.message);
      }
  }

  // return details of all users from the listOfUsers array
  return usersList
}


async function main(request) {
  try {
        const communityId = request['communityId'];
        // const communityId = request.body.communityId

        // Await the asynchronous function to get the list of users
        const listOfUsers = await getCommunityMembers(communityId);

        // Await the asynchronous function to get user data
        const userData = await getUserDetails(listOfUsers);

        return userData;
  } catch (error) {
      console.error("Error in main function:", error);
      throw error;
  }
}

// const request ={communityId: '0000033'}
// main(request)

export default {main};
