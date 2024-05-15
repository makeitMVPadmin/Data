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
  data: [],
  labels: [],
};

const initPieChartData = {
  data: [],
  stateLabels: [],
};

const generateMonthHash = (startDate = new Date()) => {
  const currentDate = startDate;
  const months = {};

  for (let i = 0; i < 12; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    months[`${year}-${month}`] = {
      activeUsersCount: 0,
      activeUsers: [],
      newUsersCount: 0,
      newUsers: [],
    };
  }

  return months;
};
// {
//   '2024-5': {
//     activeUsersCount: 0,
//     activeUsers: [],
//     newUsersCount: 0,
//     newUsers: []
//   },
// }

const formattedMemebersDataForStackedBarChart = (members) => {
  if (!members) return initStackedBarChartData;
  const datesHash = generateMonthHash(new Date());
  const datesLabel = Object.keys(datesHash).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  for (const date of datesLabel) {
    const membersByUpdatedAt = members.filter((user) => {
      const updatedAt = new Date(user.updatedAt);
      const month = updatedAt.getMonth() + 1;
      const year = updatedAt.getFullYear();
      // `${year}-${month.toString().padStart(2, "0")}`
      const key = `${year}-${month}`;
      return key === date;
    });

    const membersByJoinedAt = members.filter((user) => {
      const joinedAt = new Date(user.joinedAt);
      const month = joinedAt.getMonth() + 1;
      const year = joinedAt.getFullYear();
      const key = `${year}-${month}`;
      return key === date;
    });
    datesHash[date].activeUsers = membersByUpdatedAt;
    datesHash[date].activeUsersCount = membersByUpdatedAt.length;

    datesHash[date].newUsers = membersByJoinedAt;
    datesHash[date].newUsersCount = membersByJoinedAt.length;
  }

  return {
    labels: datesLabel,
    datasets: [
      {
        barThickness: 20,
        minBarLength: 2,
        label: "Active users",
        data: datesLabel.map((key) => datesHash[key].activeUsersCount),
        backgroundColor: "#FFD22F",
      },
      {
        barThickness: 20,
        minBarLength: 2,
        label: "New users",
        data: datesLabel.map((key) => datesHash[key].newUsersCount),
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
  // console.log("formattedMemebersDataForGroupedBarChart: ", data, labels);
  return { data, labels };
};

function getCountriesFromMembers(members) {
  const countries = members.reduce((group, user) => {
    const country = user.locationCountry;
    if (country) group.add(country);
    return group;
  }, new Set());

  return Array.from(countries)
    .sort()
    .map((element, index) => ({
      content: element,
      id: index + 1,
    }));
}
function getCitiesFromMembers(members) {
  const cities = members.reduce((group, user) => {
    const city = user.locationCity;
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
    const state = user.locationState;
    if (state) group.add(state);
    return group;
  }, new Set());

  return ["All"].concat(Array.from(states).sort()).map((element, index) => ({
    content: element,
    id: index + 1,
  }));
}

// function formattedStatesDataForPieChart(country, members) {
// const filteredMembers = members.filter((user) => user.country === country);
function formattedStatesDataForPieChart(members) {
  const hash = members.reduce((group, user) => {
    const key = user.locationState;
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
  initPieChartData,
  formattedMemebersDataForStackedBarChart,
  formattedMemebersDataForGroupedBarChart,
  getCountriesFromMembers,
  getCitiesFromMembers,
  getStatesFromMembers,
  formattedStatesDataForPieChart,
  totalMembers,
  newMembers,
};
