/* Exercise 2: Test using snapshots */

/* Mock the function using jest.fn().
Write three tests inside a describe block. You should use import the superHeros[] and getFlyingSuperHeros function.

1. First Test: 
Test should return an empty array if no superheros have the 'Fly' power"
2. Second Test:
Test should return an array of superHeros that have the 'Fly' power"
3. Third Test:
Test should match the snapshot of flying superheros.
The snapshot file should contain the expected output of the test.
The snapshot should be saved in a __snapshots__ directory next to the test file.
The snapshot file should be named SuperHeros.test.ts.snap.
*/

import { getFlyingSuperHeros } from "./getFlyingSuperHeros";
import { superHeros } from "./superHeros";

jest.mock("./getFlyingSuperHeros");

const mockedGetFlyingSuperHeros = getFlyingSuperHeros as jest.MockedFunction<typeof getFlyingSuperHeros>;

describe("getFlyingSuperHeros", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an empty array if no superheros have the 'Fly' power", () => {
    const heroesWithoutFly = superHeros.filter(hero => !hero.power.includes("Fly"));
    mockedGetFlyingSuperHeros.mockReturnValueOnce([]);

    const result = getFlyingSuperHeros(heroesWithoutFly);
    expect(result).toEqual([]);
  });

  test("should return an array of superHeros that have the 'Fly' power", () => {
    const flyingHeroes = superHeros.filter(hero => hero.power.includes("Fly"));
    mockedGetFlyingSuperHeros.mockReturnValueOnce(flyingHeroes);

    const result = getFlyingSuperHeros(superHeros);
    expect(result).toEqual(flyingHeroes);
  });

  test("should match the snapshot of flying superheros", () => {
    const flyingHeroes = superHeros.filter(hero => hero.power.includes("Fly"));
    mockedGetFlyingSuperHeros.mockReturnValueOnce(flyingHeroes);

    const result = getFlyingSuperHeros(superHeros);
    expect(result).toMatchSnapshot();
  });
});

