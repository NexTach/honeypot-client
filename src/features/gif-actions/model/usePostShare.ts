'use client';

import { useMutation } from '@tanstack/react-query';

import { shareGif } from '@/entities/gif';

// ponytail: shareCount는 다음 방문 시 갱신. 즉시 반영 필요하면 onSuccess에서 router.refresh().
export const usePostShare = (id: number) =>
  useMutation({
    mutationFn: () => shareGif(id),
  });
