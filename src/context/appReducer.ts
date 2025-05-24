import { AppAction } from "./actions";

export interface AppState {
  phrases: {
    id: number;
    text: string;
  }[];
}

export const estadoInicial: AppState = {
  phrases: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_PHRASE":
      return {
        phrases: [
          { id: Math.random(), text: action.payload.text },
          ...state.phrases,
        ],
      };
    case "DELETE_PHRASE":
      return { phrases: state.phrases.filter((p) => p.id !== action.payload.id) };
    default:
      return state;
  }
}

export default appReducer;