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

import { getFlyingSuperHeros } from "./getFlyingSuperHeros"
import * as superheros from "./superHeros";
// SuperHeros.test.ts
describe("getFlyingSuperHeros function", () => {
  it("should return an empty array if no superheros have the 'Fly' power", () => {
    const modifiedSuperHeros = superheros.superHeros.filter(
      (hero) => !hero.power.includes("Fly")
    );
    const flyingHeros = getFlyingSuperHeros(modifiedSuperHeros);
    expect(flyingHeros).toEqual([]);
  });

  it("should return an array of superHeros that have the 'Fly' power", () => {
    const flyingHeros = getFlyingSuperHeros(superheros.superHeros);
    expect(flyingHeros).toEqual([
      { name: "Superman", power: ["Fly", "Super Strength"] },
      {
        name: "IronMan",
        power: ["Intelligence", "Technology", "Fly", "Billionaire"],
      },
      { name: "GreenLantern", power: ["Energy Manipulation", "Fly"] },
    ]);
  });

  it("should match the snapshot of flying superheros", () => {
    const flyingHeros = getFlyingSuperHeros(superheros.superHeros);
    expect(flyingHeros).toMatchSnapshot();
  });
});
