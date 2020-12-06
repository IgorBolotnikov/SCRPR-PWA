import React, { createContext } from 'react';

import { anonymousUser } from 'src/shared/state/user/user.store';

export const UserContext = createContext(anonymousUser);

// Global context for accessing user data
export function UserContextProvider({ children, value }) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
