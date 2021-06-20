import {
  mockAuthCredentials,
  mockAxios4XXErrorResponseInstance
} from "../__mocks__/mock";
import { AccessControl, InternalServerException } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxios4XXErrorResponseInstance;
  })
}));

describe.only("Auth-control-service-impl", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it.only("Test that internal service exception is thrown for 4XX error is thrown", async () => {
    const accessControl = AccessControl(mockAuthCredentials);
    let thrownError = null;
    try {
      await accessControl.generateToken();
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError instanceof InternalServerException).toEqual(true);
  });
});
