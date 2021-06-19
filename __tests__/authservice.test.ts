import * as faker from "faker";

const mockRequest = {
  interceptors: {
    request: {
      use: jest.fn()
    },
    response: {
      use: jest.fn()
    }
  },
  post: jest.fn().mockResolvedValue({
    accessToken: faker.random.alphaNumeric(20),
    accessSecret: faker.random.alphaNumeric(20)
  })
};
jest.mock("axios", () => ({
  create: jest.fn(() => {
    return mockRequest;
  })
}));
import { AccessControl } from "../src";

import axios from "axios";

describe("Auth-control-service-impl", () => {
  it("Test  response with right payload", async () => {
    const authService = AccessControl({
      baseUrl: faker.internet.url(),
      nonce: faker.random.alphaNumeric(10),
      password: faker.random.alphaNumeric(7),
      userName: faker.name.middleName()
    });
    const accessRequestPayload = await authService.generateToken();
    expect(accessRequestPayload.accessToken).toBeDefined();
    expect(accessRequestPayload.accessSecret).toBeDefined();
    return accessRequestPayload;
  });

  it("should ", function() {

  });
});
