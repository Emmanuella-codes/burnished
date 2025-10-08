import { Mode } from "@/server/session.server";
import { proxy } from "valtio";

export type ResultData = {
  mode: Mode;
  content: string | null;
  fileType: "file" | "text";
};

type cvState = {
  activeMode: Mode;
  results: ResultData | null;
  jobDescription: string;
};

export const cvStore = proxy<cvState>({
  activeMode: "roast",
  results: null,
  jobDescription: "",
});

export const cvActions = {
  setMode: (mode: Mode) => {
    cvStore.activeMode = mode;
  },
  setJobDescription: (desc: string) => {
    cvStore.jobDescription = desc;
  },
  setResults: (data: ResultData) => {
    cvStore.results = data;
  },
  reset: () => {
    cvStore.results = null;
    cvStore.jobDescription = "";
  },
}
