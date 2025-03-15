const sortByAlleles = (a, b) => {
  const positionA = sortAlleles.indexOf(a);
  const positionB = sortAlleles.indexOf(b);
  if (positionA !== undefined && positionB !== undefined) {
    return positionA - positionB;
  } else if (positionA !== undefined) {
    return -1;
  } else if (positionB !== undefined) {
    return 1;
  } else {
    return 0;
  }
}
let sortAlleles = document.getElementById("sort").value.split("");
let femaleAlleles = document.getElementById("female").value.split("").sort(sortByAlleles);
let maleAlleles = document.getElementById("male").value.split("").sort(sortByAlleles);
let square = document.getElementsByTagName("tbody")[0];
document.getElementById("fill").onclick = () => {
  sortAlleles = document.getElementById("sort").value.split("");
  femaleAlleles = document.getElementById("female").value.split("").sort(sortByAlleles);
  maleAlleles = document.getElementById("male").value.split("").sort(sortByAlleles);
  square.innerHTML = "";
  for (let i = -1; i < 2**(femaleAlleles.length/2); i++) {
    let newRow = square.insertRow();
    for (let j = -1; j < 2**(maleAlleles.length/2); j++) {
      let cell;
      if (i == -1) {
        cell = newRow.appendChild(document.createElement("th"));
        if (j == -1) {
          cell.innerText = "♀♂";
        } else {
        	let jStr = j.toString(2);
          while (jStr.length < maleAlleles.length/2) {
          	jStr = "0"+jStr;
          }
        	for (let k = 0; k < maleAlleles.length/2; k++) {
          	cell.innerText += maleAlleles[2*k+parseInt(jStr.charAt(k))];
          }
        }
      } else {
        if (j == -1) {
          cell = newRow.appendChild(document.createElement("th"));
        	let iStr = i.toString(2);
          while (iStr.length < femaleAlleles.length/2) {
          	iStr = "0"+iStr;
          }
        	for (let k = 0; k < femaleAlleles.length/2; k++) {
          	cell.innerText += femaleAlleles[2*k+parseInt(iStr.charAt(k))];
          }
        } else {
          cell = newRow.insertCell();
          for (let k = 0; k < maleAlleles.length/2; k++) {
            if (sortAlleles.indexOf(square.rows[0].cells[j+1].textContent.charAt(k)) < sortAlleles.indexOf(square.rows[i+1].cells[0].textContent.charAt(k))) {
              cell.innerText += square.rows[0].cells[j+1].textContent.charAt(k)+square.rows[i+1].cells[0].textContent.charAt(k);
            } else {
              cell.innerText += square.rows[i+1].cells[0].textContent.charAt(k)+square.rows[0].cells[j+1].textContent.charAt(k);
            }
          }
        }
      }
    }
  }
}
