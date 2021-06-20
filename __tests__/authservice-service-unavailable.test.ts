import {
  mockAuthCredentials,
  mockAxiosServiceNotAvailableErrorInstance
} from "../__mocks__/mock";
import { AccessControl, ServiceUnavailableException } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxiosServiceNotAvailableErrorInstance;
  })
}));

describe("Auth-service-service-unavailable", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Test that service will be unavailable when 5XX error is thrown", async () => {
    const accessControl = AccessControl(mockAuthCredentials);
    let thrownError = null;
    try {
      await accessControl.generateToken();
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError instanceof ServiceUnavailableException).toEqual(true);
  });
});
