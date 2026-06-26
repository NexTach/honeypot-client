'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/api';

import { getTags } from '../api/tagApi';

export const useGetTags = (keyword?: string) =>
  useQuery({
    queryKey: queryKeys.tags.list(keyword),
    queryFn: () => getTags(keyword),
    staleTime: 60_000,
  });
