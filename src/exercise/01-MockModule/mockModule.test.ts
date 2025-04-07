/* Mock Modules */

/* Mock the function using jest.mock() and jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
Mock the functions in the utils files, they are being used in the convertCase function.
Set up the mock functions before each test.

1. Test cases for the reverseString function
2. Test cases for the toLowerCase function
3. Test cases for the toUpperCase function
4. Test cases for the default case when it is unknown
5. Test cases for the empty string
*/
import { convertCase } from "./convertCase";
import * as utils from "./utils";

jest.mock("./utils", () => ({
  reverseString: jest.fn(),
  toLowerCase: jest.fn(),
  toUpperCase: jest.fn(),
}));

describe("convertCase with mocked utils functions", () => {
  const mockedUtils = utils as jest.Mocked<typeof utils>;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar
  });

  test("uses reverseString when caseType is 'reverse'", () => {
    mockedUtils.reverseString.mockReturnValue("olleh");
    const result = convertCase("hello", "reverse");
    expect(mockedUtils.reverseString).toHaveBeenCalledWith("hello");
    expect(result).toBe("olleh");
  });

  test("uses toLowerCase when caseType is 'lower'", () => {
    mockedUtils.toLowerCase.mockReturnValue("hello");
    const result = convertCase("HELLO", "lower");
    expect(mockedUtils.toLowerCase).toHaveBeenCalledWith("HELLO");
    expect(result).toBe("hello");
  });

  test("uses toUpperCase when caseType is 'upper'", () => {
    mockedUtils.toUpperCase.mockReturnValue("HELLO");
    const result = convertCase("hello", "upper");
    expect(mockedUtils.toUpperCase).toHaveBeenCalledWith("hello");
    expect(result).toBe("HELLO");
  });

  test("returns original string when caseType is 'unknown'", () => {
    const result = convertCase("Hello", "unknown");
    expect(mockedUtils.toUpperCase).not.toHaveBeenCalled();
    expect(mockedUtils.toLowerCase).not.toHaveBeenCalled();
    expect(mockedUtils.reverseString).not.toHaveBeenCalled();
    expect(result).toBe("Hello");
  });

  test("handles empty string", () => {
    mockedUtils.toUpperCase.mockReturnValue("");
    const result = convertCase("", "upper");
    expect(mockedUtils.toUpperCase).toHaveBeenCalledWith("");
    expect(result).toBe("");
  });
});
