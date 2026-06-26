import type { GifListParams } from '@/entities/gif';

export const queryKeys = {
  gifs: {
    all: ['gifs'] as const,
    list: (params: GifListParams) => ['gifs', 'list', params] as const,
    detail: (id: number) => ['gifs', 'detail', id] as const,
  },
  users: {
    me: ['users', 'me'] as const,
  },
  tags: {
    list: (keyword?: string) => ['tags', keyword ?? ''] as const,
  },
} as const;
