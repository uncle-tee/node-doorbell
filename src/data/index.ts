export interface AuthCredentials {
  baseUrl: string;
  userName: string;
  password: string;
  nonce: string;
}

export interface ConfigurationParameter {
  apiKey?: string | Promise<string>;
  basePath: string;
}

export class Configuration {
  apiKey?: string | Promise<string>;
  basePath: string;

  constructor(param: ConfigurationParameter) {
    this.apiKey = param.apiKey;
    this.basePath = param.basePath;
  }
}

export class AccessRequestPayload {
  constructor(public accessToken: string, public accessSecret: string) {}
}

export interface ComputerSignatureResponse {
  signature: string;
  accessToken: string;
  timestamp: number;
}

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
