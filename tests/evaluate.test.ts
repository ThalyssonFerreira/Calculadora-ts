import { describe, it, expect } from "vitest";
import { evaluate } from "../src/evaluate";

describe("evaluate", () => {
  it("soma", () => { expect(evaluate("1+2")).toBe(3); });
  it("precedência", () => { expect(evaluate("2+3*4")).toBe(14); });
  it("parênteses", () => { expect(evaluate("(2+3)*4")).toBe(20); });
  it("flutuante", () => { expect(evaluate("10.5 + 0.5")).toBe(11); });
  it("divisão por zero → inválida", () => { expect(() => evaluate("1/0")).toThrow(); });
  it("expressão inválida", () => { expect(() => evaluate("2//3")).toThrow(); });
});
