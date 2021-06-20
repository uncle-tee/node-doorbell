import faker from "faker";

import { mockAxiosInstance } from "../__mocks__/mock";
import { Httpclient } from "../src/impl/http.service";
import { ClientErrorException, ServiceUnavailableException } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxiosInstance;
  }),
}));

describe("Http Service", () => {
  beforeEach(() => {
    mockAxiosInstance.interceptors.request.use.mockReset();
    mockAxiosInstance.interceptors.request.use.mockReset();
    mockAxiosInstance.interceptors.response.use.mockReset();
  });

  it("Test that Http service will throw when there is no data ", function (done) {
    new Httpclient({ apiKey: undefined, basePath: "" });
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    done();
  });

  it("Test that a basic api key is added to authorization header in the request interceptor", (done) => {
    const apiKey = faker.random.alphaNumeric(10);
    new Httpclient({ apiKey: apiKey, basePath: "" });
    const requestInterceptor =
      mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
    const headerReturnedValue = requestInterceptor({
      headers: {
        mockValue: apiKey,
      },
    });
    expect(headerReturnedValue.headers.Authorization).toStrictEqual(
      `Basic ${apiKey}`
    );
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    done();
  });

  it("test that client exception is thrown then error is between 400 to 499", () => {
    const apiKey = faker.random.alphaNumeric(10);
    new Httpclient({ apiKey: apiKey, basePath: "" });
    const responseErrorHnadler =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    const t = () => {
      responseErrorHnadler({
        response: {
          status: faker.datatype.number({ min: 400, max: 499 }),
        },
      });
    };
    expect(t).toThrow(ClientErrorException);
  });

  it("Test that service exception is thrown when error is greater than 499", () => {
    const apiKey = faker.random.alphaNumeric(10);
    new Httpclient({ apiKey: apiKey, basePath: "" });
    const responseErrorHnadler =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    const t = () => {
      responseErrorHnadler({
        response: {
          status: faker.datatype.number({ min: 500, max: 999 }),
        },
      });
    };
    expect(t).toThrow(ServiceUnavailableException);
  });

  it("Test that data is removed from the response", () => {
    const apiKey = faker.random.alphaNumeric(10);
    new Httpclient({ apiKey: apiKey, basePath: "" });
    const responseInterceptor =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][0];
    const mockResponse = {
      data: {
        firstName: faker.random.alphaNumeric(),
      },
    };
    const response = responseInterceptor(mockResponse);
    expect(response.firstName).toBeDefined();
  });
});
