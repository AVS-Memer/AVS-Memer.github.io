export class Term {
  constructor(inputs) {
    this.c = inputs.c || 1;
    this.d = inputs.d || 1;
  }
  evaluate(number) {
    return term.c * Math.pow(number || 0, term.d);
  }
  toText() {
    let t = ``;
    if (this.c == -1) {
      t += `-`;
    } else if (![0,1].includes(this.c)) {
      t += `${this.c}`;
    }
    if (this.c != 0) {
      if (this.d != 0) {
        t += `x`;
        if (this.d != 1) {
          t += `^${this.d}`;
        }
      }
    }
    return t;
  }
  multiply(input) {
    this.c *= input.c;
    this.d += input.d;
  }
  divide(input) {
    this.c /= input.c;
    this.d -= input.d;
  }
}
export class Expression {
  constructor(terms) {
    this.terms = terms;
  }
  evaluate(number) {
    let sum = 0;
    this.terms.forEach(term => {
      sum += term.evaluate(number);
    });
    return sum;
  }
  toText() {
    t = ``;
    simplify(this.terms);
    this.terms.forEach((term) => {
      if (term.c < 0) {
        t += `${term.toText()}`;
      } else {
        t += `+${term.toText()}`;
      }
    });
    return t;
  }
  simplify() {
    z = [];
    this.terms.forEach((term) => {
      if (term.c == 0) {
        this.terms.remove(term);
      } else if (z.includes(term.d)) {
        this.terms[z.indexOf(term.d)].add(term);
        this.terms.remove(term);
      } else {
        z.push(term.d);
      }
    });
  }
  multiply(input) {
    this.terms.forEach(term => {
      term.multiply(input);
    });
  }
  divide(input) {
    this.terms.forEach(term => {
      term.divide(input);
    });
  }
}
export function solveQuadratic(inputs) {
  inputs.a = inputs.a || 1;
  inputs.b = inputs.b || 0;
  inputs.c = inputs.c || 0;
  if (b**2-4*a*c >= 0) {
    return [(-inputs.b+Math.sqrt(inputs.b**2-4*inputs.a*inputs.c))/(2*a),(-inputs.b-Math.sqrt(inputs.b**2-4*inputs.a*inputs.c))/(2*inputs.a)]
  } else {
    return false;
  }
}
export function findEquation(inputs) {
  let y = [new Term({c: inputs.coefficient || 1, d: 0})];
  inputs.solutions.forEach((solution) => {
    let z = [new Term({c: inputs.coefficient || 1, d: 0})];
    y.forEach((term) => {
      z.push(new Term({c: -term.c*solution, d: term.d}));
      term.d++;
    });
    y.contat(z);
    simplify(y);
  });
  return y;
}
export function findSolutionsOfQuadratic(inputs) {
  inputs.a = inputs.a || 1;
  inputs.b = inputs.b || 0;
  inputs.c = inputs.c || 0;
  if (inputs.b**2-4*inputs.a*inputs.c >= 0) {
    return [(-inputs.b+Math.sqrt(inputs.b**2-4*inputs.a*inputs.c))/(2*inputs.a),(-inputs.b-Math.sqrt(inputs.b**2-4*inputs.a*inputs.c))/(2*inputs.a)];
  } else if (inputs.a < 0) {
    return [`${-inputs.b/(2*inputs.a)} - ${-Math.sqrt(4*inputs.a*inputs.c-inputs.b**2)/(2*inputs.a)}i`,`${-inputs.b/(2*inputs.a)} + ${-Math.sqrt(4*inputs.a*inputs.c-inputs.b**2)/(2*inputs.a)}i`];
  } else {
    return [`${-inputs.b/(2*inputs.a)} + ${Math.sqrt(4*inputs.a*inputs.c-inputs.b**2)/(2*inputs.a)}i`,`${-inputs.b/(2*inputs.a)} - ${Math.sqrt(4*inputs.a*inputs.c-inputs.b**2)/(2*inputs.a)}i`];
  }
}
