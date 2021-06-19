export class InternalServierException extends Error {
  data: any;
  status: number;

  constructor(status = 500, data: any) {
    super();
    this.data = data;
    this.status = status;
  }
}
