import { db } from  '../firebase-config.js';
import { collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore';

async function getCommunityMembers(communityManagerId) {
  try {
    // Reference to the collection
    const communitiesRef = collection(db, 'Communities');
    // Create a query against the collection looking for the communityId field
    const q = query(communitiesRef, where("communityManagerId", "==", communityManagerId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No such document!");
        return []; // Return an empty array or handle as needed
    } else {
      const listOfUserIdAndJoinedAt = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            // Access subcollection 'Members' within each document
            const membersRef = collection(doc.ref, 'Members');
            const membersSnapshot = await getDocs(membersRef);
            membersSnapshot.forEach(memberDoc => {
                // Extract user IDs from each document in the 'Members' subcollection
                const userData = {
                  user_id: memberDoc.data().user_id,
                  joined_at: memberDoc.data().joinedAt
                }
                listOfUserIdAndJoinedAt.push(userData);
            }
          );
        }));
        return listOfUserIdAndJoinedAt;
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


async function fetchUserData(request) {
  try {
        const communityManagerId = request['communityManagerId'];
        // const communityId = request.body.communityId

        // Await the asynchronous function to get the list of users
        const listOfUserIdAndJoinedAt = await getCommunityMembers(communityManagerId);

        const listOfUsers = []
        listOfUserIdAndJoinedAt.forEach(user => {
          listOfUsers.push(user.user_id)
        } )

        // Await the asynchronous function to get user data
        let userData = await getUserDetails(listOfUsers);

        // Add joinedAt field from listOfUserIdAndJoinedAt to userData
        userData = userData.map(user => {
          const matchedUserData = listOfUserIdAndJoinedAt.find(data => data.user_id === user.id);
          if (matchedUserData) {
            user.joinedAt = matchedUserData.joined_at.toDate().toLocaleString();
          }
          return user;
        });

        return userData;
  } catch (error) {
      console.error("Error in main function:", error);
      throw error;
  }
}

export default {fetchUserData};
