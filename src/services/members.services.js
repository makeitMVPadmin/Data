function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const membersGroupbyCreatedAt = (members) => {
    const groupedUsers = members.reduce((groups, user) => {
        const createdAt = new Date(user.createdAt);
        const month = createdAt.getMonth() + 1;
        const year = createdAt.getFullYear();

    const key = `${year}-${month}`;
    if (!groups[key]) {
      groups[key] = { count: 0, users: [] };
    }

    groups[key].count += 1;
    groups[key].users.push(user);

    return groups;
  }, {});
  return groupedUsers;
};

const formattedMemebersDataForStackedBarChart = (members) => {
  const aggregatedMembers = membersGroupbyCreatedAt(members);
  const monthsSortedbyDate = Object.keys(aggregatedMembers).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  console.log(aggregatedMembers);
  console.log(monthsSortedbyDate);

  return {
    labels: monthsSortedbyDate,
    datasets: [
      {
        barThickness: 20,
        minBarLength: 2,
        label: "Active users",
        data: monthsSortedbyDate.map((key) => aggregatedMembers[key].count),
        backgroundColor: "#FFD22F",
      },
      {
        barThickness: 20,
        minBarLength: 2,
        label: "New users",
        data: monthsSortedbyDate.map(() => getRandomInt(0, 10)),
        backgroundColor: "#0099FF",
      },
    ],
  };
};

// {
//   name: "Discipline 1",
//   data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
// },
// {
//   name: "Discipline 2",
//   data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
// },
const formattedMemebersDataForGroupedBarChart = (members) => {
  const topIndustries = members.reduce((groups, user) => {
    const key = user.industry;
    groups[key] = (groups[key] || 0) + 1;
    return groups;
  }, {});

  const sortedTopIndustries = new Set(
    Object.keys(topIndustries)
      .sort((a, b) => topIndustries[b] - topIndustries[a])
      .slice(0, 5)
  );
  console.log("sortedTopIndustries:", sortedTopIndustries);

  const usersGroupbyDiscipline = members.reduce((groups, user) => {
    if (!sortedTopIndustries.has(user.industry)) return groups;

    const key = user.discipline;
    if (!groups[key]) {
      groups[key] = {};
    }

    groups[key][user.industry] = (groups[key][user.industry] || 0) + 1;
    return groups;
  }, {});
  console.log("usersGroupbyDiscipline: ", usersGroupbyDiscipline);

  const topDisciplines = Object.keys(usersGroupbyDiscipline)
    .sort(
      (a, b) =>
        Object.keys(usersGroupbyDiscipline[b]).length -
        Object.keys(usersGroupbyDiscipline[a]).length
    )
    .slice(0, 5);
  console.log("topDisciplines: ", topDisciplines);

  const formattedDisciplinesMap = {};
  for (const discipline of topDisciplines) {
    for (const industry of sortedTopIndustries) {
      if (!usersGroupbyDiscipline[discipline][industry])
        usersGroupbyDiscipline[discipline][industry] = 0;
      formattedDisciplinesMap[discipline] = usersGroupbyDiscipline[discipline];
    }
  }
  console.log("formattedDisciplinesMap: ", formattedDisciplinesMap);

  const data = [];
  for (const discipline in formattedDisciplinesMap) {
    const sortedIndustries = {};
    sortedTopIndustries.forEach((key) => {
      sortedIndustries[key] = formattedDisciplinesMap[discipline][key];
    });

    data.push({ name: discipline, data: Object.values(sortedIndustries) });
  }
  const labels = Array.from(sortedTopIndustries);
  return { data, labels };
};

const totalMembers = () => {
    const currentMonthTotalMembers = 0;
    const pastMonthTotalMembers = 0;

  return [currentMonthTotalMembers, pastMonthTotalMembers];
};

const newMembers = () => {
    const currentMonthNewMembers = 0;
    const pastMonthNewMembers = 0;

  return [currentMonthNewMembers, pastMonthNewMembers];
};

export {
  formattedMemebersDataForStackedBarChart,
  formattedMemebersDataForGroupedBarChart,
  totalMembers,
  newMembers,
};
