import faker from "faker";
import { AuthCredentials } from "../src/data";
import { ClientErrorException } from "../src";

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

export const mockAxiosEmptyDataResponseInstance = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  post: jest.fn().mockResolvedValue(null),
};

export const mockAxios4XXErrorResponseInstance = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  post: jest.fn().mockImplementation(() => {
    throw new ClientErrorException(
      faker.datatype.number({ min: 400, max: 499 }),
      ""
    );
  }),
};

export const mockAxiosServiceNotAvailableErrorInstance = {
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
              status: 503,
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

export const mockAuthCredentials: AuthCredentials = {
  baseUrl: faker.internet.url(),
  nonce: faker.random.alphaNumeric(10),
  password: faker.random.alphaNumeric(7),
  userName: faker.name.middleName(),
};
