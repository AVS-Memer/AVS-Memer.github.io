const basePowers = ["m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"];
const onesPowers = ["", "un", "duo", "tre", "quattuor", "quint", "sext", "sept", "oct", "noven"];
const tensPowers = ["", "dec", "virgint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint"];
const hundredsPowers = ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"];
const baseInput = document.getElementById("base");
const coeffInput = document.getElementById("coeff");
const expInput = document.getElementById("exp");

baseInput.onchange = () => {
  coeffInput.max = baseInput.value;
  expInput.max = Math.floor(3003/Math.log10(baseInput.value))-1;
};

document.getElementById("findName").onclick = () => {
  let base = Number(baseInput.value);
  let coeff = Number(coeffInput.value);
  let exp = Number(expInput.value);
  if (coeff > base) coeff = base;
  if (exp > Number(expInput.max)) exp = Number(expInput.max);
  if (base === 0) document.getElementById("name").innerText = 0;
  if (base <= 0) return;
  if (base !== 10) exp *= Math.log10(base);
  exp += Math.log10(coeff);
  if (exp < 3) document.getElementById("name").innerText = Math.pow(10,exp);
  else {
    let n = Math.floor(exp/3)-1;
    if (n < 10) {
      document.getElementById("name").innerText = Math.pow(10,exp-(n+1)*3).toPrecision(3)+" "+basePowers[n-1]+"illion";
    } else {
      document.getElementById("name").innerText = Math.pow(10,exp-(n+1)*3).toPrecision(3)+" "+onesPowers[n%10]+tensPowers[Math.floor(n/10)%10]+((Math.floor(n/10)%10===1)&&(n>=100)?"i":"")+hundredsPowers[Math.floor(n/100)]+"illion";
    }
  }
}
