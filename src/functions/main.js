import { fetchUserDataForCommunity } from './fetchUserDataForCommunity';
import { fetchUsersInCommunity } from './fetchUsersInCommunity';

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

export default { main };
