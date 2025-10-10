import { Mode } from "@/server/session.server";
import { proxy } from "valtio";

export interface BurnedState {
  activeTab: Mode;
  file: File | null;
  jobDesc: string;
  isLoading: boolean;
  result: {
    mode: Mode;
    content: string;
    fileType: "text" | "file";
  } | null;
};

export const burnedStore = proxy<BurnedState>({
  activeTab: "roast",
  file: null,
  jobDesc: "",
  isLoading: false,
  result: null,
});

export const burnedActions = {
  setActiveTab: (tab: Mode) => (burnedStore.activeTab = tab),
  setFile: (file: File | null) => (burnedStore.file = file),
  setJobDesc: (desc: string) => (burnedStore.jobDesc = desc),
  setLoading: (state: boolean) => (burnedStore.isLoading = state),
  setResult: (result: BurnedState["result"]) => (burnedStore.result = result),
  reset: () => {
    burnedStore.file = null;
    burnedStore.jobDesc = "";
    burnedStore.isLoading = false;
    burnedStore.result = null;
  },
};
