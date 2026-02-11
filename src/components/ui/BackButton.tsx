'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  fallback?: string;        // default route if no history
  className?: string;
  iconSize?: number;
}

export default function BackButton({
  fallback = '/',
  className = '',
  iconSize = 24,
}: BackButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from');

  const handleBack = () => {
    if (from) {
      router.push(from);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button
      variant="default"
      size="icon"
      onClick={handleBack}
      className={`rounded-full ${className}`}
    >
      <ChevronLeft style={{ width: iconSize, height: iconSize }} />
    </Button>
  );
}
