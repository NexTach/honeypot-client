'use client';

import { useMutation } from '@tanstack/react-query';

import { likeGif, unlikeGif } from '@/entities/gif';

// ponytail: GifResponse에 isLiked 없음 → 좋아요 상태는 컴포넌트 로컬 토글로만 관리.
// 백엔드가 isLiked 제공하면 서버 상태 기반으로 교체.
export const usePostLike = (id: number) => useMutation({ mutationFn: () => likeGif(id) });

export const useDeleteLike = (id: number) => useMutation({ mutationFn: () => unlikeGif(id) });
