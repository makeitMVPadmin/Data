import { useEffect, useState } from "react";
import { getUsers } from "../../utils/firebaseUsers";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li style={{ listStyle: 'none' }} key={user.userID}>
            <p>ID: {user.userID}</p>
            <p>Full Name: {user.fullName}</p>
            {user.email && 
              <p>Email Address: {user.email}</p>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
