"use client";

import { ReactNode, useEffect } from 'react';
import i18n from '@/lib/i18n/config';
import { I18nextProvider } from 'react-i18next';

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  useEffect(() => {
    // You can add any language initialization logic here
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}