import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhraseList from "../../components/PhraseList";
import { useApp } from "../../context/appContext";

jest.mock("../../context/appContext", () => ({
  useApp: jest.fn(),
}));

const mockPhrasesData = [
  { id: 1, text: "First test phrase" },
  { id: 2, text: "Second test phrase with React" },
  { id: 3, text: "Another one to test" },
];

describe("PhraseList Component", () => {
  const mockDeletePhraseFn = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;

  const setupMockContext = (phrases = mockPhrasesData) => {
    (useApp as jest.Mock).mockReturnValue({
      state: { phrases },
      deletePhrase: mockDeletePhraseFn,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
  });

  test("renders search input and initial phrases", () => {
    setupMockContext();
    render(<PhraseList />);

    expect(screen.getByPlaceholderText(/Buscar.../i)).toBeInTheDocument();
    expect(screen.getByText("First test phrase")).toBeInTheDocument();
    expect(screen.getByText("Second test phrase with React")).toBeInTheDocument();
    expect(screen.getByText("Another one to test")).toBeInTheDocument();
  });

  test("renders correctly when there are no phrases", () => {
    setupMockContext([]);
    render(<PhraseList />);

    expect(screen.getByPlaceholderText(/Buscar.../i)).toBeInTheDocument();
    expect(screen.queryByText("First test phrase")).not.toBeInTheDocument();
  });

  test("filters phrases based on search input (case-insensitive and trims whitespace)", async () => {
    setupMockContext();
    render(<PhraseList />);
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    await user.type(searchInput, "react");
    expect(screen.queryByText("First test phrase")).not.toBeInTheDocument();
    expect(screen.getByText("Second test phrase with React")).toBeInTheDocument();
    expect(screen.queryByText("Another one to test")).not.toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "  first  ");
    expect(screen.getByText("First test phrase")).toBeInTheDocument();
    expect(
      screen.queryByText("Second test phrase with React")
    ).not.toBeInTheDocument();
  });

  test("shows all phrases when search input is cleared", async () => {
    setupMockContext();
    render(<PhraseList />);
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    await user.type(searchInput, "React");
    expect(screen.queryByText("First test phrase")).not.toBeInTheDocument();

    await user.clear(searchInput);
    expect(screen.getByText("First test phrase")).toBeInTheDocument();
    expect(screen.getByText("Second test phrase with React")).toBeInTheDocument();
    expect(screen.getByText("Another one to test")).toBeInTheDocument();
  });

  test("shows no phrases if filter does not match any", async () => {
    setupMockContext();
    render(<PhraseList />);
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    await user.type(searchInput, "nonexistentsearchterm");
    expect(screen.queryByText("First test phrase")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Second test phrase with React")
    ).not.toBeInTheDocument();
  });

  test("calls deletePhrase with correct id when a phrase's delete button is clicked", async () => {
    setupMockContext();
    render(<PhraseList />);

    const phraseToDeleteText = "Second test phrase with React";
    const phraseIdToDelete = 2;

    const phraseCardContent = screen.getByText(phraseToDeleteText).closest('div');
    
    if (!phraseCardContent) {
      throw new Error(`Could not find CardContent for phrase: ${phraseToDeleteText}`);
    }

    const deleteButton = within(phraseCardContent).getByRole("button");

    await user.click(deleteButton);

    expect(mockDeletePhraseFn).toHaveBeenCalledTimes(1);
    expect(mockDeletePhraseFn).toHaveBeenCalledWith(phraseIdToDelete);
  });
});
