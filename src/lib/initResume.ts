import { mockResume } from "@/dummy/mockResume";
import { resumeStore } from "@/store/resumeStore";

export function initMockResume() {
  Object.assign(resumeStore, mockResume)
}
