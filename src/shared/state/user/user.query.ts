import { createEntityQuery } from '@datorama/akita';

import userStore, { UserState } from 'src/shared/state/user/user.store';

export const userQuery = createEntityQuery<UserState>(userStore);

export const getUser$ = userQuery.select('user');
