import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, useApp } from "../../context/appContext";

const TestComponent = () => {
  const { state, addPhrase, deletePhrase } = useApp();

  return (
    <div>
      <button onClick={() => addPhrase("hello world")}>Agregar</button>
      <ul>
        {state.phrases.map((p: any) => (
          <div key={p.id}>
            <li>{p.text}</li>
            <button onClick={() => deletePhrase(p.id)}>Eliminar</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

describe("AppContext", () => {
  test("adds a phrase to the state", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const addButton = screen.getByText("Agregar");
    await userEvent.click(addButton);

    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  test("removes a phrase from the state", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    const addButton = screen.getByText("Agregar");
    await userEvent.click(addButton);
    expect(screen.getByText("hello world")).toBeInTheDocument();
    
    const deleteButton = await screen.findByText("Eliminar");
    await userEvent.click(deleteButton);
    expect(screen.queryByText("hello world")).not.toBeInTheDocument();
  });
});
