export class ClientErrorException extends Error {
  data: any;
  status: number;

  constructor(status: number, data: any) {
    super();
    this.data = data;
    this.status = status;
  }
}
