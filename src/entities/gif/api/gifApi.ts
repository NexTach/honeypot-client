import { apiUrls, del, get, patch, post } from '@/shared/api';

import type {
  Gif,
  GifListParams,
  GifPage,
  GifUpdatePayload,
  GifUploadPayload,
  ShareResponse,
} from '../model/types';

export const getGifs = (params: GifListParams) => get<GifPage>(apiUrls.gifs.list, { params });

export const getGif = (id: number) => get<Gif>(apiUrls.gifs.detail(id));

export const getMyGifs = (params: GifListParams) => get<GifPage>(apiUrls.users.myGifs, { params });

export const likeGif = (gifId: number) => post<void>(apiUrls.gifs.like(gifId));

export const unlikeGif = (gifId: number) => del<void>(apiUrls.gifs.like(gifId));

export const uploadGif = ({ file, title, description, isPublic, tags }: GifUploadPayload) => {
  const form = new FormData();
  form.append('file', file);
  form.append('title', title);
  if (description) form.append('description', description);
  form.append('isPublic', String(isPublic));
  tags.forEach((tag) => form.append('tags', tag));
  return post<Gif>(apiUrls.gifs.list, form);
};

export const updateGif = (id: number, payload: GifUpdatePayload) =>
  patch<Gif>(apiUrls.gifs.detail(id), payload);

export const deleteGif = (id: number) => del<void>(apiUrls.gifs.detail(id));

export const shareGif = (id: number) => post<ShareResponse>(apiUrls.gifs.share(id));
