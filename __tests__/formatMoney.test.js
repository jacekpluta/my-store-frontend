import formatMoney from "../components/formatMoney";

describe("Format money function", () => {
  it("works with cents", () => {
    expect(formatMoney(1)).toEqual("$0.01");
  });

  it("works with whole dollars", () => {
    expect(formatMoney(5000)).toEqual("$50");
  });

  it("works with dollars and cents", () => {
    expect(formatMoney(5050)).toEqual("$50.50");
  });
});
