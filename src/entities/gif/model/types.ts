export interface Tag {
  id: number;
  name: string;
}

export interface Gif {
  id: number;
  title: string;
  description: string | null;
  isPublic: boolean;
  blindedByAdmin: boolean;
  objectKey: string;
  contentType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  likeCount: number;
  shareCount: number;
  uploaderId: number;
  uploaderName: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

/** Spring Page<GifResponse> — UI에서 쓰는 필드만 추림 */
export interface GifPage {
  content: Gif[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface GifListParams {
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}

export interface GifUploadPayload {
  file: File;
  title: string;
  description?: string;
  isPublic: boolean;
  tags: string[];
}

export interface GifUpdatePayload {
  title: string;
  description?: string | null;
  isPublic: boolean;
  tags: string[];
}

export interface ShareResponse {
  shareCount: number;
}
