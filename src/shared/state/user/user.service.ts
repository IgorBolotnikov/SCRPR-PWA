import { User } from 'src/shared/model/user';
import userStore, { anonymousUser } from 'src/shared/state/user/user.store';

export function updateUser(user: User): void {
  userStore.update({ user: { ...user, isAuthenticated: true } });
}

export function resetUser(): void {
  userStore.update({ user: anonymousUser });
}
