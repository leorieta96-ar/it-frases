import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhraseInput from "../../components/PhraseInput";
import { useApp } from "../../context/appContext";

jest.mock("../../context/appContext", () => ({
  useApp: jest.fn(),
}));

describe("PhraseInput Component", () => {
  const mockAddPhrase = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
  
    jest.clearAllMocks();
  
    (useApp as jest.Mock).mockReturnValue({
      addPhrase: mockAddPhrase,
    });
  
    user = userEvent.setup();
  });

  test("renders the input field and add button", () => {
    render(<PhraseInput />);
    expect(
      screen.getByLabelText(/Escribe una nueva frase.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Añadir Frase/i })
    ).toBeInTheDocument();
  });

  test("allows typing in the input field", async () => {
    render(<PhraseInput />);
    const inputElement = screen.getByLabelText(
      /Escribe una nueva frase.../i
    ) as HTMLInputElement;
    await user.type(inputElement, "Nueva frase de prueba");
    expect(inputElement.value).toBe("Nueva frase de prueba");
  });

  test("calls addPhrase and clears input when adding a valid phrase", async () => {
    render(<PhraseInput />);
    const inputElement = screen.getByLabelText(
      /Escribe una nueva frase.../i
    ) as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /Añadir Frase/i });

    await user.type(inputElement, "Frase válida");
    await user.click(addButton);

    expect(mockAddPhrase).toHaveBeenCalledTimes(1);
    expect(mockAddPhrase).toHaveBeenCalledWith("Frase válida");
    expect(inputElement.value).toBe("");
  });

  test("does not call addPhrase if input is empty and button is clicked", async () => {
    render(<PhraseInput />);
    const inputElement = screen.getByLabelText(
      /Escribe una nueva frase.../i
    ) as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /Añadir Frase/i });

    expect(inputElement.value).toBe("");
    await user.click(addButton);

    expect(mockAddPhrase).not.toHaveBeenCalled();
  });

  test("does not call addPhrase if input is only whitespace and button is clicked", async () => {
    render(<PhraseInput />);
    const inputElement = screen.getByLabelText(
      /Escribe una nueva frase.../i
    ) as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /Añadir Frase/i });

    await user.type(inputElement, "   ");
    await user.click(addButton);

    expect(mockAddPhrase).not.toHaveBeenCalled();
    expect(inputElement.value).toBe("   ");
  });
});