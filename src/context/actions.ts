export type AppAction =
  | { type: "ADD_PHRASE"; payload: { text: string } }
  | { type: "DELETE_PHRASE"; payload: { id: number } };