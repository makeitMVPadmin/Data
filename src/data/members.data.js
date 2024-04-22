import { faker } from "@faker-js/faker";

const generateUser = () => {
  return {
    id: faker.string.uuid(),
    location: `${faker.location.city()}, ${faker.location.state({
      abbreviated: true,
    })}`,
    createdAt: faker.date.past(),
  };
};

const members = async () => {
  const generatedUsers = await Promise.all(
    Array.from({ length: 500 }, generateUser)
  );
  return generatedUsers;
};

export default members;
