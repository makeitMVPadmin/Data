import { db } from  '../firebase-config.js';
import { collection, doc, getDoc} from 'firebase/firestore';

async function fetchUsersInCommunity(communityId) {
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

// Function takes list of users, recieved from the community table
async function fetchUserDataForCommunity(listOfUsers) {
  const usersCollection = collection(db, 'Users');
  const usersList = []
  // for each user id in the array we will pull their data
  for(const userId of listOfUsers){
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

      // Await the asynchronous function to get the list of users
      const listOfUsers = await fetchUsersInCommunity(communityId);

      // Await the asynchronous function to get user data
      const userData = await fetchUserDataForCommunity(listOfUsers);

      console.log(userData);
      return userData;
  } catch (error) {
      console.error("Error in main function:", error);
      throw error;
  }
}

export default {main};