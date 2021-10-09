import calculatePaginationNumbers from "../calculatePaginationNumbers";

describe("calculates numbers for pagination", () => {
  it("should returrn correct order 1", () => {
    const result = calculatePaginationNumbers(60, 22);

    // console.log(result);

    expect(result).toEqual([0, 21, 22, 23, 59]);

    const result1 = calculatePaginationNumbers(20, 0);

    expect(result1).toEqual([null, null, 0, 1, 19]);

    // console.log(result1);

    const result2 = calculatePaginationNumbers(20, 19);

    expect(result2).toEqual([0, 18, 19, null, null]);

    // console.log(result2);
  });
});
