import { db } from  '../firebase-config.js';
import { collection, doc, getDoc} from 'firebase/firestore';

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

export default fetchUserDataForCommunity;