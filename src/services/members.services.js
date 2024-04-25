
const example = [{
    id: "1",
    location: "New York, NY",
    createdAt: "Fri Mar 08 2024 13:26:42 GMT-0500 (Eastern Standard Time)"
}];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

const membersGroupbyCreatedAt = (members) => {
    const groupedUsers = members.reduce((groups, user) => {
        const createdAt = new Date(user.createdAt); // !!! should be joinedAt
        const month = createdAt.getMonth() + 1;
        const year = createdAt.getFullYear();

        const key = `${year}-${month}`;
        if (!groups[key]) {
          groups[key] = { count: 0, users: []};
        }
        
        groups[key].count += 1;
        groups[key].users.push(user);
        
        return groups;
      }, {});
      return groupedUsers;
};

const formattedMemebersDataForStackedBarChart = (members) => {
    const aggregatedMembers = membersGroupbyCreatedAt(members);
    const monthsSortedbyDate = Object.keys(aggregatedMembers).sort((a, b) => new Date(a) - new Date(b));
    const uniqueMonthsSortedbyDate = Array.from(new Set(monthsSortedbyDate));

    console.log(aggregatedMembers)
    console.log(uniqueMonthsSortedbyDate);

  return {
    labels: uniqueMonthsSortedbyDate,
    datasets: [
      {
        barThickness: 20,
        minBarLength: 2,
        label: "Active users",
        data: uniqueMonthsSortedbyDate.map((key) => aggregatedMembers[key].count),
        backgroundColor: "#FFD22F",
      },
      {
        barThickness: 20,
        minBarLength: 2,
        label: "New users",
        data: uniqueMonthsSortedbyDate.map(() => getRandomInt(0, 10)),
        backgroundColor: "#0099FF",
      },
    ],
  };
};

const totalMembers = (members) => {
    const currentMonthTotalMembers = 0;
    const pastMonthTotalMembers = 0;

    return [currentMonthTotalMembers, pastMonthTotalMembers];
};

const newMembers = (members) => {
    const currentMonthNewMembers = 0;
    const pastMonthNewMembers = 0;

    return [currentMonthNewMembers, pastMonthNewMembers];
};

export { 
    formattedMemebersDataForStackedBarChart, 
    totalMembers,
    newMembers,
};
