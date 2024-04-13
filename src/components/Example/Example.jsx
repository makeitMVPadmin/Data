import { useEffect, useState } from "react";
import { getMembers } from "../../functions/members";

const Example = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getMembers();
      console.log(members);
      setMembers(members);
    }

    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li style={{ listStyle: 'none' }} key={member.id}>
            <p>ID: {member.userID}</p>
            <p>Full Name: {member.fullName}</p>
            {member.email && 
              <p>Email Address: {member.email}</p>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Example;