// axios baseURL('/api') 및 서버 apiFetcher(API_BASE + path) 양쪽에서 그대로 사용.
// 즉 여기 경로는 백엔드 prefix('/api') 제외, '/v1' 부터 시작.
export const apiUrls = {
  gifs: {
    list: '/v1/gifs',
    detail: (id: number) => `/v1/gifs/${id}`,
    raw: (id: number) => `/v1/gifs/${id}/raw`,
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
