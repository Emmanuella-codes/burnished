/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerConfig } from "./config";

const prepareArray = (arr: any[]): any[] => {
  return arr.map(prepareVal).filter(v => v !== null);
};

const prepareVal = (val: any) => {
  if (!val) {
    if (val === 0 || val === false) return val;
  }else {
    if (typeof val === "object") {
      if (Array.isArray(val)) {
        if (Array.isArray(val)) return prepareArray(val);
      }else return prepareObject(val);
    }else return val;
  }
  return null;
};

const prepareObject = (obj: {[key: string]: any}) => {
  const res: {[key: string]: any} = {};
  for (const [key, val] of Object.entries(obj)) {
    const valRes = prepareVal(val);
    if (valRes !== null) res[key] = valRes;
  }
  return res;
};

const convertObject = (obj: {[key: string]: any}) => {
  let res = "";
  if (Object.keys(obj).length === 0) return res;
  for (const [key, val] of Object.entries(obj)) res += `${res ? '&' : ''}${key}=${val}`;
  return res;
};

const prepareRequest = ({baseRoute, ext, params, query}: Partial<BASE_API_REQ>) =>
  (baseRoute || ServerConfig.baseUrl) + 
    (ext ? `/${ext}` : '') +
    (params ? `/${params}` : '') +
    (query ? `?${convertObject(prepareObject(query))}` : '');

export type BASE_API_REQ = {
  baseRoute: string; // doesn't ends with /
  ext: string;
  params: string;
  query: Record<string, string | number | undefined>;
  body: FormData | string | Record<string, any>;
  token: string;
};

export type ResponseType<T> = {
  statusCode: number, 
  message: string, 
  payload: T,
  errors: string | null,
  token: string | null,
};

export type responseCallback<T> = (response: ResponseType<T>) => void;

const REQ_METHOD = async <T>(
  reqMethod: 'POST' | 'GET' | 'PUT' | 'DELETE',
  baseApiReq: Partial<BASE_API_REQ>,
) => {
  const { body } = baseApiReq;
  const reqUrl = prepareRequest(baseApiReq);
  const bodyIsOriginallyStringOrFormData = (typeof body === "string") || (body instanceof FormData);
  const reqBody = body ? (bodyIsOriginallyStringOrFormData ? body : JSON.stringify(prepareObject(body!))) : "";

  const payload = {
    method: reqMethod,
    headers: {
      Authorization: `Bearer ${baseApiReq?.token}`,
      ...(!bodyIsOriginallyStringOrFormData ? { "Content-Type": "application/json"} : {} ),
    },
    ...(body ? {body: reqBody} : {}),
  };

  const res = await fetch(reqUrl, payload);
  const data = (await res.json()) as ResponseType<T>;
  return data;
};

export const POST = <T>(baseApiReq: Partial<BASE_API_REQ>) => REQ_METHOD<T>("POST", baseApiReq);
export const PUT = <T>(baseApiReq: Partial<BASE_API_REQ>) => REQ_METHOD<T>("PUT", baseApiReq);
export const DELETE = <T>(baseApiReq: Partial<BASE_API_REQ>) => REQ_METHOD<T>("DELETE", baseApiReq);
export const GET = <T>(baseApiReq: Partial<BASE_API_REQ>) => REQ_METHOD<T>("GET", baseApiReq);

export const handleApiResponse = <T>(
  response: ResponseType<T>,
  onSuccess?: (data: T) => void,
  onError?: (message: string) => void 
) => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    if (onSuccess) onSuccess(response.payload as T);
    return true;
  } else {
    const errorMessage = response.message || response.errors || 'An unknown error occurred';
    if (onError) onError(errorMessage);
    return false;
  }
}
