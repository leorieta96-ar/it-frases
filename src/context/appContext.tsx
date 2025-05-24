import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AppAction } from "./actions";
import appReducer, { AppState, estadoInicial } from "./appReducer";

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: estadoInicial,
  dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, estadoInicial);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const { state, dispatch } = useContext(AppContext);

  const addPhrase = (text: string) => {
    dispatch({ type: "ADD_PHRASE", payload: { text } });
  };

  const deletePhrase = (id: number) => {
    dispatch({ type: "DELETE_PHRASE", payload: { id } });
  };

  return { state, addPhrase, deletePhrase };
};
