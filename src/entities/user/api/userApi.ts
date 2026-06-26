import { apiUrls, get } from '@/shared/api';

import type { Profile } from '../model/types';

export const getMyProfile = () => get<Profile>(apiUrls.users.me);
