let brainrot = {
  "noun": ["sigma", "tax", "rizz", "gyatt"],
  "person": ["Rizzler", "Blue Tie", "Group Leader", "Quandale Dingle", "Turkish Quandale Dingle", "Kai Cenat", "Sigma", "Drake"],
  "place": ["Ohio", "the Gooning Cave", "the TikTok Rizz Party"],
  "verb": ["mew", "edge", "jelq", "goon", "looksmaxx", "jelqmaxx", "lose their streak"],
  "verb-pt": ["mewed", "edged", "jelqed", "gooned", "looksmaxxed", "jelqmaxxed", "lost their streak"],
  "adj": ["Skibidi", "Sigma", "Fat", "Fanum", "Level 1000 Gyatt", "Alpha", "Beta", "Negative Aura"]
};
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
