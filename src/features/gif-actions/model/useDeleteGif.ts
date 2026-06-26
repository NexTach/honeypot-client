'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteGif } from '@/entities/gif';
import { queryKeys } from '@/shared/api';

export const useDeleteGif = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteGif(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gifs.all });
      router.push('/');
    },
  });
};
