'use client';

import { useEffect } from 'react';

export function PWAInstallPrompt() {
  useEffect(() => {
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      
      // Show install button or banner
      showInstallPromotion();
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      hideInstallPromotion();
    };

    const showInstallPromotion = () => {
      const installBanner = document.getElementById('install-banner');
      if (installBanner) {
        installBanner.style.display = 'block';
      }
    };

    const hideInstallPromotion = () => {
      const installBanner = document.getElementById('install-banner');
      if (installBanner) {
        installBanner.style.display = 'none';
      }
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for the appinstalled event
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is running in standalone mode');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt variable
    (window as any).deferredPrompt = null;
  };

  return (
    <div
      id="install-banner"
      className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">تثبيت التطبيق</h3>
          <p className="text-sm opacity-90">احصل على تجربة أفضل مع تطبيق العيادة</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded font-medium text-sm"
          >
            تثبيت
          </button>
          <button
            onClick={() => {
              const banner = document.getElementById('install-banner');
              if (banner) banner.style.display = 'none';
            }}
            className="text-white opacity-75 hover:opacity-100 px-2"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export function NotificationPermission() {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && 'serviceWorker' in navigator) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          console.log('Notification permission:', permission);
        });
      }
    }
  }, []);

  return null;
}

