var currentTime = new Date();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();
function updateTime() {
  currentTime = new Date();
  hours = currentTime.getHours();
  minutes = currentTime.getMinutes();
  seconds = currentTime.getSeconds();
}
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let block = {c: "red", s: Math.min(100,(window.innerWidth-100)/6)};
let dec2bin = (dec) => {
  return (dec >>> 0).toString(2);
};
let unitsBit = (num, total) => {
  return dec2bin(num % total);
};
let otherBit = (num, total) => {
  return dec2bin(Math.floor(num/total));
};
let updateBlocks = () => {
  updateTime();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = block.c;
  unitsBit(seconds,10).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(block.s*5+100,(block.s+20)*(4-unitsBit(seconds,10).length+i), block.s, block.s);
    }
  });
  otherBit(seconds,10).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(block.s*4+80,(block.s+20)*(4-otherBit(seconds,10).length+i), block.s, block.s);
    }
  });
  unitsBit(minutes,10).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(block.s*3+60,(block.s+20)*(4-unitsBit(minutes,10).length+i), block.s, block.s);
    }
  });
  otherBit(minutes,10).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(block.s*2+40,(block.s+20)*(4-otherBit(minutes,10).length+i), block.s, block.s);
    }
  });
  unitsBit(hours,12).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(block.s+20,(block.s+20)*(4-unitsBit(hours,12).length+i), block.s, block.s);
    }
  });
  otherBit(hours,12).split("").forEach((n,i) => {
    if (n == "1") {
      ctx.fillRect(0,(block.s+20)*(4-otherBit(hours,12).length+i), block.s, block.s);
    }
  });
  ctx.fillStyle = "black";
  ctx.font = "bold "+block.s/2+"px Arial";
  ctx.fillText("Seconds", block.s*4+80, block.s*4+100);
  ctx.fillText("Minutes", block.s*2+60, block.s*4+100);
  ctx.fillText("Hours", 40, block.s*4+100);
  ctx.fillText(seconds, block.s*4.5+100, block.s*4.5+100);
  ctx.fillText(minutes, block.s*2.5+60, block.s*4.5+100);
  ctx.fillText(hours, block.s*0.5+50, block.s*4.5+100);
};
setInterval(updateBlocks,1000);
