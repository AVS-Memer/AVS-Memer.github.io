export function derivativeOf(inputs) {
  inputs.expression.simplify();
  inputs.expression.terms.forEach((term) => {
    if (term.d == 0) {
      inputs.expression.terms.remove(term);
    } else {
      term.c *= term.d;
      term.d--;
    }
  });
  if (inputs.number) {
    return inputs.expression.evaluate(inputs.number);
  } else {
    return inputs.expression;
  }
}
export function integralOf(inputs) {
  inputs.expression.simplify();
  inputs.expression.terms.forEach((term) => {
    if (term.d == -1) {
      inputs.terms.remove(term);
    }
    term.d++;
    term.c /= term.d;
  });
  if (inputs.number) {
    return inputs.expression.evaluate(inputs.number);
  } else {
    return inputs.expression;
  }
}
