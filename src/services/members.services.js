function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const initStackedBarChartData = {
  labels: [],
  datasets: [
    {
      barThickness: 20,
      minBarLength: 2,
      label: "Active users",
      data: [],
      backgroundColor: "#FFD22F",
    },
    {
      barThickness: 20,
      minBarLength: 2,
      label: "New users",
      data: [],
      backgroundColor: "#0099FF",
    },
  ],
};

const initGroupedBarChartData = {
  data:[],
  labels: []
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
  if (!members) return initStackedBarChartData;
  const aggregatedMembers = membersGroupbyCreatedAt(members);
  const monthsSortedbyDate = Object.keys(aggregatedMembers).sort(
    (a, b) => new Date(a) - new Date(b)
  );

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

// too many loops, probably refine it later
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

  const usersGroupbyDiscipline = members.reduce((groups, user) => {
    if (!sortedTopIndustries.has(user.industry)) return groups;

    const key = user.discipline;
    if (!groups[key]) {
      groups[key] = {};
    }

    groups[key][user.industry] = (groups[key][user.industry] || 0) + 1;
    return groups;
  }, {});

  const topDisciplines = Object.keys(usersGroupbyDiscipline)
    .sort(
      (a, b) =>
        Object.keys(usersGroupbyDiscipline[b]).length -
        Object.keys(usersGroupbyDiscipline[a]).length
    )
    .slice(0, 5);

  const formattedDisciplinesMap = {};
  for (const discipline of topDisciplines) {
    for (const industry of sortedTopIndustries) {
      if (!usersGroupbyDiscipline[discipline][industry])
        usersGroupbyDiscipline[discipline][industry] = 0;
      formattedDisciplinesMap[discipline] = usersGroupbyDiscipline[discipline];
    }
  }

  const data = [];
  for (const discipline in formattedDisciplinesMap) {
    const sortedIndustries = {};
    sortedTopIndustries.forEach((key) => {
      sortedIndustries[key] = formattedDisciplinesMap[discipline][key];
    });

    data.push({ name: discipline, data: Object.values(sortedIndustries) });
  }
  const labels = Array.from(sortedTopIndustries);
  console.log("formattedMemebersDataForGroupedBarChart: ", data, labels);
  return { data, labels };
};

function getCountriesFromMembers(members) {
  const countries = members.reduce((group, user) => {
    const country = user.country;
    if (country) group.add(country);
    return group;
  }, new Set());

  return Array.from(countries).sort().map((element, index) => ({
    content: element,
    id: index + 1,
  }));
}
function getCitiesFromMembers(members) {
  const cities = members.reduce((group, user) => {
    const city = user.city;
    if (city) group.add(city);
    return group;
  }, new Set());

  return ["All"].concat(Array.from(cities).sort()).map((element, index) => ({
    content: element,
    id: index + 1,
  }));
}

function getStatesFromMembers(members) {
  const states = members.reduce((group, user) => {
    const state = user.state;
    if (state) group.add(state);
    return group;
  }, new Set());

  return ["All"].concat(Array.from(states).sort()).map((element, index) => ({
    content: element,
    id: index + 1,
  }));
}

function formattedStatesDataForPieChart(country, members) {
  const filteredMembers = members.filter((user) => user.country === country);
  const hash = filteredMembers.reduce((group, user) => {
    const key = user.state;
    if (!group[key]) {
      group[key] = { count: 0, users: [] };
    }

    group[key].count += 1;
    group[key].users.push(user);

    return group;
  }, {});

  const stateLabels = Object.keys(hash).sort();

  const data = [];
  for (const state of stateLabels) {
    data.push(hash[state].count);
  }

  return { data, stateLabels };
}

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
  initStackedBarChartData,
  initGroupedBarChartData,
  formattedMemebersDataForStackedBarChart,
  formattedMemebersDataForGroupedBarChart,
  getCountriesFromMembers,
  getCitiesFromMembers,
  getStatesFromMembers,
  formattedStatesDataForPieChart,
  totalMembers,
  newMembers,
};
