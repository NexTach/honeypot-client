'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadGif } from '@/entities/gif';
import { queryKeys } from '@/shared/api';

export const usePostGif = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: uploadGif,
    onSuccess: (gif) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gifs.all });
      router.push(`/gifs/${gif.id}`);
    },
  });
};
