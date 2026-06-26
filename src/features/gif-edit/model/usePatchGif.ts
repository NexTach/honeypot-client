'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type GifUpdatePayload, updateGif } from '@/entities/gif';
import { queryKeys } from '@/shared/api';

export const usePatchGif = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GifUpdatePayload) => updateGif(id, payload),
    onSuccess: () => {
      // ['gifs'] prefix → 목록·상세 캐시 모두 무효화.
      queryClient.invalidateQueries({ queryKey: queryKeys.gifs.all });
    },
  });
};
