import {
  AccessRequestPayload,
  ComputerSignatureResponse,
  HttpMethod,
} from "../data";

export interface AuthService {
  generateToken(): Promise<AccessRequestPayload>;

  computeSignature(
    httpMethod: HttpMethod,
    encodedUrl: string
  ): Promise<ComputerSignatureResponse>;
}
