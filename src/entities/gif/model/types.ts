export interface Gif {
  id: string;
  title: string;
  description: string;
  tags: string[];
  width: number;
  height: number;
  loop: boolean;
  uploader: string;
  shareCount: number;
  url: string;
  isPublic: boolean;
}
