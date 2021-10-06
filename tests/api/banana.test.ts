import fooba from "../../__no_ops/fooba";

test("calculate something", () => {
  const foo = 8;
  const bar = 6;

  expect(foo + bar + fooba).toEqual(18);
});
