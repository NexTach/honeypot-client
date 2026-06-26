'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/api';

import { getGif, getGifs } from '../api/gifApi';
import type { Gif, GifListParams } from './types';

export const useGetGifs = (params: GifListParams) =>
  useQuery({
    queryKey: queryKeys.gifs.list(params),
    queryFn: () => getGifs(params),
  });

export const useGetGif = (id: number, initialData?: Gif) =>
  useQuery({
    queryKey: queryKeys.gifs.detail(id),
    queryFn: () => getGif(id),
    initialData,
  });
