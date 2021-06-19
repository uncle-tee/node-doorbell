import { AuthService } from "./service";

import { AuthCredentials } from "./data";
import { AccessControlServiceImpl } from "./impl/access-control.service-impl";

export * from "./exceptions";

export const AccessControl = (credentials: AuthCredentials): AuthService =>
  new AccessControlServiceImpl(credentials);
