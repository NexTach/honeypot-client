export interface User {
  uploadCount: number;
  publicCount: number;
  totalShares: number;
  isAdmin: boolean;
}

export type Role = 'GENERAL' | 'ADMIN';

/** GET /v1/users/me — 인증된 사용자 프로필 */
export interface Profile {
  id: number;
  name: string;
  studentNumber: number;
  email: string | null;
  role: Role;
}
