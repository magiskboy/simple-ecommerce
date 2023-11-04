export interface Response<T = any> {
  data?: T;
  errors?: any[];
  message?: string;
  name?: string;
}
