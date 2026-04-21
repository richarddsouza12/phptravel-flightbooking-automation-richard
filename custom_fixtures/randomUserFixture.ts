import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

export type RandomUser = {
  name: string;
  email: string;
  phone: string;
};

export type LoginData = {
  email: string;
  password: string;
};

const test = base.extend<{
  randomUser: RandomUser;
  loginData: LoginData;
}>(
    {
      
    randomUser: async ({}, use) => {

      const randomUser: RandomUser = {
        name: faker.person.fullName(),
        email: `user${Math.random().toString(36).substr(2, 9)}@example.com`,
        phone: String(Math.floor(Math.random() * 9000000000) + 1000000000),
      };

      await use(randomUser);
    },

    loginData: async ({}, use) => {

      const loginData: LoginData = {
        email: "richarddsouza12@gmail.com",
        password: "Test@1234"
      };

      await use(loginData);
    }

  }
);

export { test };