"use client";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt({ appName = "TP Dumpsters" }: { appName?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-neutral-900 border border-neutral-700 rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-md mx-auto">
      <img src="/images/logo/TP.png" alt="TP" className="w-12 h-12 rounded-xl" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">{appName}</p>
        <p className="text-neutral-400 text-xs">Install for quick access</p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-tp-red text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-tp-red-dark transition-colors flex-shrink-0"
      >
        Install
      </button>
      <button
        onClick={() => setShowBanner(false)}
        className="text-neutral-500 hover:text-white p-1 flex-shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
