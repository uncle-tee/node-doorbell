import faker from "faker";
import axios from "axios";

export const mockAxiosInstance = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  post: jest.fn().mockResolvedValue({
    accessToken: faker.random.alphaNumeric(20),
    accessSecret: faker.random.alphaNumeric(20),
  }),
};

export const mockAxiosInstanceError = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest
        .fn()
        .mockImplementation((onResponseCallBack, onErrorCallBack) => {
          const data = {
            response: {
              status: faker.datatype.number({ min: 400, max: 499 }),
            },
          };
          onErrorCallBack(data);
        }),
    },
  },
  post: jest.fn().mockResolvedValue({
    accessToken: faker.random.alphaNumeric(20),
    accessSecret: faker.random.alphaNumeric(20),
  }),
};
