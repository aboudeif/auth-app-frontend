
export interface IRestResponse<T> {
  status: number;
  data: T;
  errors: IRestResponseError[];
  validation: IValidation;
}

export interface IRestResponseError {
  code: number;
  msg: string;
}

export interface IValidation { [key: string]: string[] }