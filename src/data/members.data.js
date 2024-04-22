import { faker } from "@faker-js/faker";

const generateUser = () => {
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const createdAt = faker.date.between({from: oneYearAgo, to: currentDate});

  return {
    id: faker.string.uuid(),
    location: `${faker.location.city()}, ${faker.location.state({abbreviated: true,})}`,
    createdAt: createdAt,
  };
};

const membersData = async (amount = 200) => {
  const generatedUsers = await Promise.all(
    Array.from({ length: amount }, generateUser)
  );
  return generatedUsers;
};

export default membersData;
