import { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  isLogin: false, //sementara
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLogin: false,
      };
    case "LOADED":
      return {
        ...state,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        isLogin: true,
      };
    default:
      throw new Error();
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
