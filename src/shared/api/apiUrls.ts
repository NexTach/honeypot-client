// axios baseURL('/api') 및 서버 apiFetcher(API_BASE + path) 양쪽에서 그대로 사용.
// 즉 여기 경로는 백엔드 prefix('/api') 제외, '/v1' 부터 시작.
export const apiUrls = {
  gifs: {
    list: '/v1/gifs',
    detail: (id: number) => `/v1/gifs/${id}`,
    // Discord 등은 URL 확장자로 미디어 타입을 판별하므로 `.gif`로 끝나야 임베드된다.
    raw: (id: number) => `/v1/gifs/${id}/raw.gif`,
    share: (id: number) => `/v1/gifs/${id}/share`,
    reports: (gifId: number) => `/v1/gifs/${gifId}/reports`,
    like: (gifId: number) => `/v1/gifs/${gifId}/like`,
  },
  auth: {
    login: '/v1/auth/datagsm/login',
    callback: '/v1/auth/datagsm/callback',
    reissue: '/v1/auth/reissue',
    logout: '/v1/auth/logout',
  },
  users: {
    me: '/v1/users/me',
    myLikes: '/v1/users/me/likes',
    myGifs: '/v1/users/me/gifs',
  },
  reports: {
    adminList: '/v1/admin/reports',
    process: (id: number) => `/v1/admin/reports/${id}`,
  },
  tags: '/v1/tags',
} as const;

// 외부(Discord 임베드 등)·표시용 절대 URL. /api rewrite 프록시(이중 홉) 건너뛰고 백엔드 직격.
export const gifRawUrl = (id: number) =>
  `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrls.gifs.raw(id)}`;
