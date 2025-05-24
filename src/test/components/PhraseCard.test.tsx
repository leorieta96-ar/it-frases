import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhraseCard from "../../components/PhraseCard";

describe("PhraseCard Component", () => {
  const mockDeletePhrase = jest.fn();
  const defaultProps = {
    id: 1,
    text: "Esta es una frase de prueba.",
    deletePhrase: mockDeletePhrase,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the phrase text correctly", () => {
    render(<PhraseCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  test("renders the delete icon button", () => {
    render(<PhraseCard {...defaultProps} />);
    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });

  test("calls deletePhrase with the correct id when delete button is clicked", async () => {
    render(<PhraseCard {...defaultProps} />);

    const deleteButton = screen.getByRole("button");
    await userEvent.click(deleteButton);

    expect(mockDeletePhrase).toHaveBeenCalledTimes(1);
    expect(mockDeletePhrase).toHaveBeenCalledWith(defaultProps.id);
  });
});