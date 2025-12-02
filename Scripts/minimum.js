let v = document.getElementById("v"), h = document.getElementById("h"), t = document.getElementById("t"), d = document.getElementById("d"), c = 3, a = [1,1,2];
let i = () => {
  v.innerText += "\u{1D593}";
  if (c === 1) d.innerText = "";
  h.innerText = ++c;
  t.innerText = g(c);
}
let n = () => {
  i(); i();
}
let m = () => {
  i(); i(); i();
}
let u = () => {
  i(); i();
}
let erase = () => {
  if (v.innerText.length > 0) {
    v.innerText = v.innerText.substring(0,v.innerText.length-2);
    h.innerText = --c;
    t.innerText = g(c);
    if (c === 1) d.innerText = "\u{1D58E}";
  }
}
let g = (n) => {
  if (a.length > n) return a[n];
  a[n] = g(n-3)+g(n-2)+g(n-1);
  return a[n];
}
