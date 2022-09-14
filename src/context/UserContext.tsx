import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
};

export const UserContext = createContext<any | null>(null);

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};