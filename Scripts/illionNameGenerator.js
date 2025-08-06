const basePowers = ["m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"];
const onesPowers = ["", "un", "duo", "tre", "quattuor", "quint", "sext", "sept", "oct", "noven"];
const tensPowers = ["", "dec", "virgint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint"];
const hundredsPowers = ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"];

document.getElementById("base").onchange = () => {
  document.getElementById("coeff").max = document.getElementById("base").value;
};

document.getElementById("findName").onclick = () => {
  let base = document.getElementById("base").value;
  let coeff = document.getElementById("coeff").value;
  let exp = document.getElementById("exp").value;
  if (base !== 10) exp *= Math.log10(base);
  exp += Math.log10(coeff);
  if (exp < 3) console.log(Math.pow(10,exp));
  else {
    let n = Math.floor(exp/3)-1;
    if (n < 10) {
      document.getElementById("name").innerText = Math.pow(10,exp-(n+1)*3).toPrecision(3)+" "+basePowers[n-1]+"illion";
    } else {
      document.getElementById("name").innerText = Math.pow(10,exp-(n+1)*3).toPrecision(3)+" "+onesPowers[n%10]+tensPowers[Math.floor(n/10)%10]+((Math.floor(n/10)%10===1)&&(n>=100)?"i":"")+hundredsPowers[Math.floor(n/100)]+"illion";
    }
  }
}
