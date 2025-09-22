export class CalcError extends Error {}

export function evaluate(expr: string): number {
  // Remove caractere que não seja permitido
  const cleaned = expr.replace(/[^0-9.+\-*/() ]/g, "");

  try {
    const fn = new Function(
      `"use strict"; 
       const r = (${cleaned}); 
       if(!isFinite(r)) throw 0; 
       return r;`
    );

    const result = Number(fn());

    if (!Number.isFinite(result)) {
      throw new CalcError("Operação inválida.");
    }

    return result;
  } catch {
    throw new CalcError("Expressão inválida.");
  }
}
