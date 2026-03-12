"use client";
import { useSnapshot } from "valtio";
import FormView from "../FormView";
import ResultView from "../ResultView";
import { burnedActions, burnedStore } from "@/store/burnedStore";
import { HoverCardCmp } from "../compositions/HoverCardCmp";
import Loader from "../compositions/Loader";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const QUOTA_RESET_KEY = "burned_quota_reset_at";

const formatTimeLeft = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
};

export default function BurnedCmp() {
  const snap = useSnapshot(burnedStore);
  const router = useRouter();
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const timerText = useMemo(() => formatTimeLeft(timeLeftMs), [timeLeftMs]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];
    const localToken = localStorage.getItem("burned_token");

    if (!tokenCookie && !localToken) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedResetAt = localStorage.getItem(QUOTA_RESET_KEY);
    if (!savedResetAt) return;

    const resetAt = Number(savedResetAt);
    if (!Number.isFinite(resetAt)) {
      localStorage.removeItem(QUOTA_RESET_KEY);
      burnedActions.setQuotaReached(false);
      burnedActions.setQuotaResetAt(null);
      return;
    }

    if (Date.now() >= resetAt) {
      localStorage.removeItem(QUOTA_RESET_KEY);
      burnedActions.setQuotaReached(false);
      burnedActions.setQuotaResetAt(null);
      return;
    }

    burnedActions.setQuotaReached(true);
    burnedActions.setQuotaResetAt(resetAt);
  }, []);

  useEffect(() => {
    if (!snap.quotaReached || !snap.quotaResetAt) {
      setTimeLeftMs(0);
      return;
    }

    const updateCountdown = () => {
      const remaining = snap.quotaResetAt! - Date.now();
      if (remaining <= 0) {
        setTimeLeftMs(0);
        burnedActions.setQuotaReached(false);
        burnedActions.setQuotaResetAt(null);
        localStorage.removeItem(QUOTA_RESET_KEY);
        return;
      }

      setTimeLeftMs(remaining);
    };

    updateCountdown();
    const timerId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timerId);
  }, [snap.quotaReached, snap.quotaResetAt]);

  return (
    <div className="relative w-full overflow-hidden">
      {snap.isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}

      <div className={`${snap.isLoading ? "opacity-35 pointer-events-none select-none" : "opacity-100"} transition-opacity duration-200`}>
        <div className="w-[90%]">
          <div className="w-full flex justify-end">
            <HoverCardCmp />
          </div>
          {snap.quotaReached && (
            <div className="w-full flex justify-end mt-1">
              <p className="text-xs text-slate-600">
                Daily limit reached. Unlocks in {timerText}.
              </p>
            </div>
          )}
        </div>
        
        <div className="w-full flex flex-col items-center lg:gap-y-8">
          <div className="lg:w-[60%] flex-shrink-0 py-4">
            <div className="flex flex-col items-center mb-3">
              <h2 className="text-xl">🔥 CV/Resume Optimizer</h2>
              <p className="text-center">Roast, optimize or generate cover letters for your CV/Resume</p>
            </div>
            <div className="w-full flex flex-row justify-between gap-2 flex-wrap lg:flex-nowrap">
              {["roast", "format", "letter"].map((tab) => (
                <button
                  key={tab}
                  className={`${snap.activeTab === tab ? "font-bold bg-[#159d8b]" : "bg-[#58dcca] text-gray-500"} w-full lg:w-1/3 py-1.5 rounded-lg text-white text-base`}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => burnedActions.setActiveTab(tab as any)}
                >
                  {tab === "roast"
                    ? "🔥 Roast"
                    : tab === "format"
                    ? "✨ Optimize"
                    : "📝 Cover Letter"}
                </button>
              ))}
            </div>
          </div>
          <div
            className="w-full lg:w-[96%] mt-5 mb-4 lg:mb-0 flex flex-col lg:flex-row gap-5"
            style={{ height: 'calc(100vh - 200px)' }}
          >
            <div className="w-full lg:w-1/2 lg:overflow-y-auto no-scrollbar">
              <FormView />
            </div>
            <div className="w-full lg:w-1/2 lg:h-full overflow-y-auto no-scrollbar">
              <ResultView />
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
}
