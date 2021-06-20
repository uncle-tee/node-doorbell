import { mockAuthCredentials, mockAxiosInstance } from "../__mocks__/mock";
import faker from "faker";

import { HttpMethod } from "../src/data";

import { AccessControl } from "../src";

jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockAxiosInstance;
  })
}));


describe("Auth-control-service-impl", () => {
  afterEach(() => {
    mockAxiosInstance.interceptors.response.use.mockClear() ;
    mockAxiosInstance.interceptors.request.use.mockClear();
    mockAxiosInstance.post.mockClear();
  });

  it("Test  response with right payload", async () => {
    const authService = AccessControl(mockAuthCredentials);
    const accessRequestPayload = await authService.generateToken();
    expect(accessRequestPayload.accessToken).toBeDefined();
    expect(accessRequestPayload.accessSecret).toBeDefined();
    return accessRequestPayload;
  });

  it("Test that a token can be generated", async () => {
    const authService = AccessControl(mockAuthCredentials);
    const computerSignatureResponse = await authService.computeSignature(
      HttpMethod.GET,
      faker.internet.url()
    );
    expect(computerSignatureResponse.accessToken).toBeDefined();
    expect(computerSignatureResponse.signature).toBeDefined();
    expect(computerSignatureResponse.timestamp).toBeDefined();
  });
});
