import axios from "axios";
import {setupInterceptorsTo} from "./interceptors";

setupInterceptorsTo(axios);
export interface Response<T = unknown> {
  status: number;
  statusText: string;
  data: T;
}

export class Axios {
  host: string;
  headers?: any;
  auth?: any;

  constructor(opt: { host: string; headers?: any; auth?: any }) {
    this.host = opt.host;
    this.headers = opt.headers;
    this.auth = opt.auth;
  }

  private generateQuerystring(parameters: any): string {
    return Object.keys(parameters)
      .map(function (key) {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key])
        );
      })
      .join("&");
  }

  private generateURL(api: string, parameters: any): string {
    const qs = this.generateQuerystring(parameters);
    if (qs != "") {
      return this.host.concat(api, "?", qs);
    }
    return this.host.concat(api);
  }

  get<T = unknown, R = Response<T>, D = any>(
    api: string,
    paramters?: any,
    headers?: any
  ): Promise<R> {
    const url = this.generateURL(api, paramters);
    const mergeHeadrs = { ...this.headers, ...headers };
    return axios.get<T, R, D>(url, { headers: mergeHeadrs, auth: this.auth ?? undefined });
  }

  post<T = unknown, R = Response<T>, D = any>(
    api: string,
    data: any,
    paramters?: any,
    headers?: any
  ): Promise<any> {
    const url = this.generateURL(api, paramters);
    const mergeHeadrs = { ...this.headers, ...headers };
    return axios.post<T, R, D>(url, data, { headers: mergeHeadrs, auth: this.auth ?? undefined });
  }

  put<T = unknown, R = Response<T>, D = any>(
    api: string,
    data: any,
    paramters?: any,
    headers?: any
  ): Promise<any> {
    const url = this.generateURL(api, paramters);
    const mergeHeadrs = { ...this.headers, ...headers };
    return axios.put<T, R, D>(url, data, { headers: mergeHeadrs, auth: this.auth ?? undefined});
  }

  patch<T = unknown, R = Response<T>, D = any>(
    api: string,
    data: any,
    paramters?: any,
    headers?: any
  ): Promise<any> {
    const url = this.generateURL(api, paramters);
    const mergeHeadrs = { ...this.headers, ...headers };
    return axios.patch<T, R, D>(url, data, { headers: mergeHeadrs, auth: this.auth ?? undefined});
  }

  delete<T = unknown, R = Response<T>, D = any>(
    api: string,
    paramters?: any,
    headers?: any
  ): Promise<any> {
    const url = this.generateURL(api, paramters);
    const mergeHeadrs = { ...this.headers, ...headers };
    return axios.delete<T, R, D>(url, { headers: mergeHeadrs, auth: this.auth ?? undefined});
  }
}
