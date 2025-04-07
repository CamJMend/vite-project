/* Exercise 0: Test the function by using a mock function */

/* Mock the function using jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
The mock function receives a prop of type number. The mocked function adds a 6 to the number.
1. First Test: 
The forEach function should be called 3 times
2. Second Test:
The forEach function should be called with the correct arguments.
3. Third Test:
Test the first argument of the first call to the function was 0 and the result is 6.
Test the first argument of the second call to the function was 1  and the result is 7.
4. Forth Test:
Test the first argument of the third call to the function was 4 and the result is not 9.
*/

import { forEach } from "./forEach";

describe("forEach with mock function", () => {
  let mockFn: jest.Mock;

  beforeEach(() => {
    mockFn = jest.fn((x: number) => x + 6);
    jest.clearAllMocks(); // Limpiar
  });

  const inputArray = [0, 1, 4];

  test("calls the mock function 3 times", () => {
    forEach(inputArray, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test("calls the mock function with correct arguments", () => {
    forEach(inputArray, mockFn);
    expect(mockFn).toHaveBeenCalledWith(0);
    expect(mockFn).toHaveBeenCalledWith(1);
    expect(mockFn).toHaveBeenCalledWith(4);
  });

  test("checks the arguments and return values of the first and second calls", () => {
    forEach(inputArray, mockFn);
    // Acceder a los argumentos de cada llamada
    expect(mockFn.mock.calls[0][0]).toBe(0);
    expect(mockFn.mock.results[0].value).toBe(6);

    expect(mockFn.mock.calls[1][0]).toBe(1);
    expect(mockFn.mock.results[1].value).toBe(7);
  });

  test("checks third call argument is 4 and result is not 9", () => {
    forEach(inputArray, mockFn);

    expect(mockFn.mock.calls[2][0]).toBe(4);
    expect(mockFn.mock.results[2].value).not.toBe(9);
  });
});

