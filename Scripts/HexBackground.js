let updateHex = () => {
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  document.body.style.color = `rgb(${256*Math.round(1-r/256)}, ${256*Math.round(1-g/256)}, ${256*Math.round(1-b/256)})`;
  let rHex = ((r < 16)?"0":"") + r.toString(16).toUpperCase();
  let gHex = ((g < 16)?"0":"") + g.toString(16).toUpperCase();
  let bHex = ((b < 16)?"0":"") + b.toString(16).toUpperCase();
  document.getElementById("hex").innerText = "Hex: #" + rHex + gHex + bHex;
}
let r = Math.floor(Math.random()*256);
let g = Math.floor(Math.random()*256);
let b = Math.floor(Math.random()*256);
document.getElementById("r").value = r;
document.getElementById("g").value = g;
document.getElementById("b").value = b;
updateHex();
document.getElementById("r").oninput = function() {
 r = parseInt(this.value);
 updateHex();
}
document.getElementById("g").oninput = function() {
 g = parseInt(this.value);
 updateHex();
}
document.getElementById("b").oninput = function() {
 b = parseInt(this.value);
 updateHex();
}
