import { apiUrls, get } from '@/shared/api';

import type { Tag } from '../model/types';

export const getTags = (keyword?: string) =>
  get<Tag[]>(apiUrls.tags, { params: keyword ? { keyword } : undefined });
