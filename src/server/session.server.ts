import { UploadResponse } from "@/typings/document";
import { POST, ResponseType } from "./base.api";
import { ServerConfig } from "./config";

export type Mode = "roast" | "format" | "letter";

export const uploadCV = async (
  file: File,
  mode: Mode,
  jobDescription?: string,
): Promise<ResponseType<UploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mode", mode);

  if (mode === "format" && jobDescription) {
    formData.append("jobDescription", jobDescription);
  }

  const response = await POST<UploadResponse>({
    baseRoute: ServerConfig.baseUrl,
    ext: "documents/upload",
    body: formData,
  })

  return response;
};
