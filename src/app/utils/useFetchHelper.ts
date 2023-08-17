import useSWR from 'swr';
import { fetchHelper } from '@/app/utils/fetchHelper';
import { useEffect, useState } from 'react';

export const useFetchHelper = (url: string | null) => {
  const { data, error, isLoading } = useSWR(url, fetchHelper);
  return { data, error, isLoading };
};

export const useClientDataOnMount = <T>(
  url: string
): { data: T; error?: Error; isLoading?: boolean } => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { data, error, isLoading } = useFetchHelper(mounted ? url : null);
  return { data, error, isLoading };
};
