import express from "express";
import { AccessControl } from "../src";
import { AuthService } from "../src/service";

const app = express();
const PORT = 8000;

app.get("/access-token", async (req, res) => {
  const authService: AuthService = AccessControl({
    baseUrl: "https://sandbox.globalaccelerex.com",
    nonce: "TEST_ME",
    password: "peter",
    userName: "peter",
  });
  return res.json(await authService.generateToken());
});

app.listen(PORT, () =>
  console.log(`Server is starting on port on port ${PORT}`)
);
