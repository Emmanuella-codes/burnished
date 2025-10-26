import { UploadResponse } from "@/typings/document";
import { POST, ResponseType } from "./base.api";
import { ServerConfig } from "./config";

export type Mode = "roast" | "format" | "letter";

export const login = async (name: string): Promise<ResponseType<{ name: string }>> => {
  const response = await POST<{ name: string }>({
    baseRoute: ServerConfig.baseUrl,
    ext: "auth/token",
    body: { name },
  });

  return response;
};

export const uploadCV = async (
  file: File,
  mode: Mode,
  jobDescription?: string,
): Promise<ResponseType<UploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mode", mode);

  if ((mode === "format" || mode === "letter") && jobDescription) {
    formData.append("jobDescription", jobDescription);
  }

  const token = localStorage.getItem("burned_token");
  // for (const [key, value] of formData.entries()) {
  //   console.log("FormData →", key, value);
  // }
  const res = await fetch(`${ServerConfig.baseUrl}/documents/upload`, {
    method: "POST",
    body: formData,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  const raw = await res.json();
  const data: ResponseType<UploadResponse> = {
    statusCode: res.status,
    message: raw.message,
    payload: raw.data,
    errors: raw.error,
    token: null,
  };

  if (!res.ok) throw new Error(data.message);
  return data;
};
