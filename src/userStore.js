import React, { createContext, useReducer, useContext } from 'react';

const InitialUserStore = {
  username: '',
  email: '',
  image: '',
  isAuthenticated: false,
};

const UserContext = createContext(InitialUserStore);

const ACTIONS = {
  UPDATE_USER: 'UPDATE_USER',
  RESET_USER: 'RESET_USER',
};

function UserReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_USER:
      return {
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
        isAuthenticated: true,
      };
    case ACTIONS.RESET_USER:
      localStorage.removeItem('token');
      return {
        username: '',
        email: '',
        image: '',
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

// Global store for accessing and modifying user data
export function UserStoreProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, InitialUserStore);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to allow direct user data manipulation
export default function useUserStore() {
  const [state, dispatch] = useContext(UserContext);

  function update(payload) {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload,
    });
  }

  function reset() {
    dispatch({
      type: ACTIONS.RESET_USER,
      payload: {},
    });
  }

  return {
    ...state,
    update,
    reset,
  };
}
