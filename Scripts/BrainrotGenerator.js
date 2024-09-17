let brainrot = {};
fetch("/Data/JSON/NumberBettingCalculator/brainrot.json")
  .then(res => {return res.json()})
  .then(data => Object.keys(data).forEach(type => brainrot[type] = data[type]))
  .catch(err => console.log(err));
let brainrotRandomType = (t) => {
  return brainrot[t][Math.floor(Math.random()*brainrot[t].length)];
}
let randomize = () => {
  if (Math.random() < 0.05) {
    document.querySelector("p").innerText = document.querySelector("p").innerText + "Look behind you\n";
    document.querySelector("button").hidden = true;
  } else {
    let chosenBrainrot = {
      "adj": brainrotRandomType("adj"),
      "person": brainrotRandomType("person"),
      "verbPt": brainrotRandomType("verb-pt"),
      "place": brainrotRandomType("place")
    }
    let string = "A " + chosenBrainrot.adj + " " + chosenBrainrot.person + " " + chosenBrainrot.verbPt + " in " + chosenBrainrot.place + ".";
    if (["a", "e", "i", "o", "u"].includes(chosenBrainrot.adj[0].toLowerCase())) {
      string = "An" + string.slice(1);
    }
    document.querySelector("p").innerText = document.querySelector("p").innerText + string + "\n";
  }
}
randomize();
