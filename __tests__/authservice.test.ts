import * as faker from "faker";
import {
  mockAuthCredentials,
  mockAxiosInstance
} from "../__mocks__/mock";
import { AccessControl } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxiosInstance;
  })
}));

describe("Auth-control-service-impl", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Test  response with right payload", async () => {
    const authService = AccessControl(mockAuthCredentials);
    const accessRequestPayload = await authService.generateToken();
    expect(accessRequestPayload.accessToken).toBeDefined();
    expect(accessRequestPayload.accessSecret).toBeDefined();
    return accessRequestPayload;
  });
});
