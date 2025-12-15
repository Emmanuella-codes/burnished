import { Mode } from "@/server/session.server";
import { proxy, subscribe } from "valtio";

export interface BurnedState {
  activeTab: Mode;
  file: File | null;
  jobDesc: string;
  isLoading: boolean;
  result: {
    mode: Mode;
    content: string | Record<string, any>;
  } | null;
  _hydrated: boolean;
};

export const burnedStore = proxy<BurnedState>({
  activeTab: "roast",
  file: null,
  jobDesc: "",
  isLoading: false,
  result: null,
  _hydrated: false,
});

// load from localStorage (call this from a useEffect)
// export const hydrateBurnedStore = () => {
//   if (typeof window === "undefined" || burnedStore._hydrated) return;

//   try {
//     const saved = localStorage.getItem("burnedStore");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       burnedStore.activeTab = parsed.activeTab || "roast";
//       burnedStore.jobDesc = parsed.jobDesc || "";
//       burnedStore.result = parsed.result || null;
//     }
//   } catch (error) {
//     console.error("Failed to load state:", error);
//   } finally {
//     burnedStore._hydrated = true;
//   }
// };

// subscribe to changes and save to localStorage
if (typeof window !== "undefined") {
  subscribe(burnedStore, () => {
    if (!burnedStore._hydrated) return; // don't save until hydrated

    try {
      const stateToSave = {
        activeTab: burnedStore.activeTab,
        jobDesc: burnedStore.jobDesc,
        result: burnedStore.result,
      };
      localStorage.setItem("burnedStore", JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  });
}

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
