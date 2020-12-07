import { createEntityStore } from '@datorama/akita';

import { User } from 'src/shared/model/user';

export const anonymousUser: User = {
  username: '',
  email: '',
  image: '',
  isAuthenticated: false,
};

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: anonymousUser,
};

const userStore = createEntityStore<UserState>(initialState, {
  name: 'user',
});

export default userStore;
