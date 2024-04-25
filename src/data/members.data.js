import { faker } from "@faker-js/faker";
import { useEffect, useState, useCallback } from "react";

// only for test
const generateUser = () => {
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const createdAt = faker.date.between({ from: oneYearAgo, to: currentDate });

  return {
    id: faker.string.uuid(),
    location: `${faker.location.city()}, ${faker.location.state({
      abbreviated: true,
    })}`,
    createdAt: createdAt,
  };
};

const membersData = async (amount = 200) => {
  return await Promise.all(Array.from({ length: amount }, generateUser));
};

const membersDataByLocation = async (city, state, amount = 200) => {
  return new Promise((resolve, reject) => {
    const data = Array.from({ length: amount }, generateUser).filter(
      (item) => item.location === `${city}, ${state}`
    );
    if (data.length > 0) {
      resolve(data);
    } else {
      reject(new Error("No data found!"));
    }
  });
};

export { membersData, membersDataByLocation };

const useMembersFakeData = (amount = 200) => {
  const generateUser = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const createdAt = faker.date.between({
      from: oneYearAgo,
      to: currentDate,
    });

    return {
      id: faker.string.uuid(),
      location: `${faker.location.city()}, ${faker.location.state({
        abbreviated: true,
      })}`,
      createdAt: createdAt,
    };
  };

  const membersData = (amount = 200) => {
    return Array.from({ length: amount }, generateUser);
  };
  const [members, setMembers] = useState(membersData());

  useEffect(() => {}, []);

  const fetchMembersFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (members && members.length > 0) {
        resolve(members);
      } else {
        reject(new Error("No members found!"));
      }
    });
  }, [members]);

  const fetchMembersFakeDataByLocation = useCallback(
    async (city, state) => {
      return new Promise((resolve, reject) => {
        const data = members.filter(
          (item) => item.location === `${city}, ${state}`
        );
        if (data && data.length > 0) {
          resolve(data);
        } else {
          reject(new Error("No members found!"));
        }
      });
    },
    [members]
  );

  const fetchCitiesFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const cities = members.reduce((cities, member) => {
        const locationArr = member.location.split(",");
        cities.push(locationArr[0]);
        return cities;
      }, []);
      if (cities && cities.length > 0) {
        resolve(cities);
      } else {
        reject(new Error("No cities found!"));
      }
    });
  }, [members]);

  const fetchStatesFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const states = members.reduce((states, member) => {
        const locationArr = member.location.split(",");
        states.push(locationArr[1].trim());
        return states;
      }, []);
      if (states && states.length > 0) {
        resolve(states);
      } else {
        reject(new Error("No states found!"));
      }
    });
  }, [members]);

  return {
    fetchMembersFakeData,
    fetchMembersFakeDataByLocation,
    fetchCitiesFakeData,
    fetchStatesFakeData,
  };
};

export default useMembersFakeData;
