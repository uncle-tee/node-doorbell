import { Configuration } from "../data";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  ClientErrorException,
  ServiceUnavailableException,
} from "../exceptions";

export class Httpclient {
  protected axiosInstance: AxiosInstance;

  request = () => {
    return this.axiosInstance;
  };

  constructor(
    private readonly configuration: Configuration,
    protected readonly customAxios?: AxiosInstance
  ) {
    if (this.customAxios) {
      this.axiosInstance = this.customAxios;
    } else {
      this.axiosInstance = axios.create({
        baseURL: configuration?.basePath,
      });
    }
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.axiosInstance.interceptors.request.use((requestConfig) => {
      requestConfig.headers.Authorization = `Basic ${this.configuration.apiKey}`;
      return requestConfig;
    });
  };

  private _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => {
    return data;
  };

  private _handleError = (error: any) => {
    if (
      error &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 499
    ) {
      throw new ClientErrorException(
        error.response.status,
        error.response.data
      );
    }
    throw new ServiceUnavailableException(
      error.response.status,
      error.response.data
    );
  };
}
