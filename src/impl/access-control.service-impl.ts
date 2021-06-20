import {
  AccessRequestPayload,
  AuthCredentials,
  ComputerSignatureResponse,
  HttpMethod,
} from "../data";
import { Httpclient } from "./http.service";
import * as cryptoJS from "crypto-js";
import {
  ClientErrorException,
  ServiceUnavailableException,
} from "../exceptions";
import { AuthService } from "../service";
import { InternalServerException } from "../exceptions";

export class AccessControlServiceImpl implements AuthService {
  private httpClient?: Httpclient;

  constructor(private readonly authCredentials: AuthCredentials) {}

  private generateHeader(): string {
    return Buffer.from(
      `${this.authCredentials.userName}:${this.authCredentials.password}`
    ).toString("base64");
  }

  private createHttpClient(): void {
    this.httpClient = new Httpclient({
      apiKey: this.generateHeader(),
      basePath: this.authCredentials.baseUrl,
    });
  }

  public async generateToken(): Promise<AccessRequestPayload> {
    this.createHttpClient();
    try {
      const response = await this.httpClient
        ?.request()
        .post("/api/access-control/v2/getToken", {
          duration: 1200,
          plainText: true,
        });
      if (response) {
        const data = response as any;
        return new AccessRequestPayload(data.accessToken, data.accessSecret);
      }
      //Throw and error because is only means that there is a problem with acesss impl
      throw new InternalServerException(
        500,
        "There was an internal error and we will resolve soon"
      );
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        //lOG THIS TO THE central log its a big issue that should be resolved,
        // The login gere is very critical and every thing can just just down here
        throw new ServiceUnavailableException(
          503,
          "Service is currently not available and will be back shortly"
        );
      }
      if (error instanceof ClientErrorException) {
        //Please stream error to the server immediately there is a communication issue.
        throw new InternalServerException(
          500,
          "Service is currently unavailable and will be available shortly"
        );
      }
      // Log the error here for server errors
      throw error;
    }
  }

  async computeSignature(
    httpMethod: HttpMethod,
    encodedUrl: string
  ): Promise<ComputerSignatureResponse> {
    const accessToken: AccessRequestPayload = await this.generateToken();
    const as = accessToken?.accessSecret;
    const at = accessToken?.accessToken;

    const timestamp: number = Math.floor(Date.now() / 1000);
    const nonce: string = this.authCredentials.nonce;

    const signature = cryptoJS
      .SHA512(
        `${at}&&${as}&&${timestamp.toString()}&&${nonce}&&${httpMethod}&&${encodeURIComponent(
          encodedUrl
        )}`
      )
      .toString();

    return {
      signature,
      timestamp,
      accessToken: at,
    };
  }
}
