import { selector } from 'recoil';

import { User } from '../types/user';
import { fetchData } from '../utils/fetchMethods';

const userState = selector({
  key: 'user',
  get: async () => {
    const { data } = await fetchData<null, User>('GET', '/api/user');
    return data;
  },
});

export default userState;
