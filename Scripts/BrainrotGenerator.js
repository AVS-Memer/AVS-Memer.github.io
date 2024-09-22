let brainrot = {};
fetch("/Data/JSON/BrainrotGenerator/brainrot.json")
  .then(res => {return res.json()})
  .then(data => Object.keys(data).forEach(type => brainrot[type] = data[type]))
  .catch(err => console.log(err));
let brainrotRandomType = (t) => {
  return brainrot[t][Math.floor(Math.random()*brainrot[t].length)];
}
let randomize = () => {
  if (Math.random() < 0.02) {
    document.getElementById("sentences").innerText = document.getElementById("sentences").innerText + "Look behind you\n";
    document.querySelector("button").innerText = "Uh oh, he found you.\nRetry";
    document.querySelector("button").onclick = () => {window.location.reload()}
  } else if (Math.random() < 0.5) {
    chosenBrainrot = {
      "adj": brainrotRandomType("adj"),
      "person": brainrotRandomType("person"),
      "verbPt": brainrotRandomType("verb-pt"),
      "place": brainrotRandomType("place")
    }
    string = "A " + chosenBrainrot.adj + " " + chosenBrainrot.person + " " + chosenBrainrot.verbPt + " in " + chosenBrainrot.place + ".";
    if (["a", "e", "i", "o", "u"].includes(chosenBrainrot.adj[0].toLowerCase())) {
      string = "An" + string.slice(1);
    }
    document.getElementById("sentences").innerText = document.getElementById("sentences").innerText + string + "\n";
  } else {
    chosenBrainrot = {
      "adj": brainrotRandomType("adj"),
      "person1": brainrotRandomType("person"),
      "verbPt": brainrotRandomType("verb-pt"),
      "person2": brainrotRandomType("person"),
      "place": brainrotRandomType("place")
    }
    if (brainrot["verb-pt"].slice(0,4).includes(chosenBrainrot.verbPt)) {
      chosenBrainrot.verbPt += " with";
    } else if (brainrot["verb-pt"].slice(4,8).includes(chosenBrainrot.verbPt)) {
      chosenBrainrot.verbPt += " on";
    }
    if (chosenBrainrot.person1 == chosenBrainrot.person2) {
      chosenBrainrot.person2 = "themself";
    }
    if (brainrot.person.slice(0,4).includes(chosenBrainrot.person2)) {
      chosenBrainrot.person2 = "the " + chosenBrainrot.person2;
    } else if (brainrot.person.slice(4,6).includes(chosenBrainrot.person2)) {
      chosenBrainrot.person2 = "a " + chosenBrainrot.person2;
    }
    string = "A " + chosenBrainrot.adj + " " + chosenBrainrot.person1 + " " + chosenBrainrot.verbPt + " " + chosenBrainrot.person2 + " in " + chosenBrainrot.place + ".";
    if (["a", "e", "i", "o", "u"].includes(chosenBrainrot.adj[0].toLowerCase())) {
      string = "An" + string.slice(1);
    }
    document.getElementById("sentences").innerText = document.getElementById("sentences").innerText + string + "\n";
  }
}
randomize();
