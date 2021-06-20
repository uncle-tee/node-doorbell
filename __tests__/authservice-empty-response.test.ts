import {
  mockAuthCredentials,
  mockAxiosEmptyDataResponseInstance
} from "../__mocks__/mock";
import { AccessControl } from "../src";
import { InternalServerException } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxiosEmptyDataResponseInstance;
  })
}));

describe("Auth-control-service-impl", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("test that internal server error is thrown when data is empty on token generate ", async () => {
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
