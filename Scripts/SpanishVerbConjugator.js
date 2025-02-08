let verbs = {};
let tense, pov, verb, reflexive, stem, ending;
fetch("/Data/JSON/SpanishVerbConjugator/verbs.json")
  .then(res => {return res.json()})
  .then(data => Object.keys(data).forEach(form => verbs[form] = data[form]))
  .catch(err => console.log(err));
Object.keys(verbs.tense.present_indicative.endings.ar).forEach(form => {
  const formOption = document.createElement("option");
  formOption.value = form;
  formOption.text = form;
  document.getElementById("pov").appendChild(formOption);
});
document.getElementById("conjugate").onclick = () => {
  pov = document.getElementById("pov").value;
  tense = document.getElementById("tense").value;
  verb = document.getElementById("verb").value;
  if (verb.slice(verb.length-2) == "se") {
    verb = verb.slice(0,verb.length-2);
    reflexive = verbs.reflexive_pronouns[pov];
  }
  if (tense == "present indicative") {
    stem = verb.slice(0,verb.length-2);
    ending = verbs.tense.present_indicative.endings[verb.slice(verb.length-2)][pov];
    if (!["nosotros","vosotros"].includes(pov)) {
      if (verb.slice(verb.length-3) == "uir" && verb.slice(verb.length-4) != "guir") {
        stem += "y";
      }
      Object.values(verbs.tense.present_indicative.stem_changes).forEach(stemChange => {
        if (Object.keys(stemChange).includes(verb)) {
          stem = stemChange[verb];
        }
      });
    }
    if (pov == "yo") {
      Object.values(verbs.tense.present_indicative.irregular_yo_verbs).forEach(irregular => {
        if (Object.keys(irregular).includes(verb)) {
          stem = irregular[verb].slice(0,irregular[verb].length-1);
          if (irregular == verbs.tense.present_indicative.irregular_yo_verbs.other) {
            ending = irregular[verb].slice(irregular[verb].length-1);
          }
        }
      });
    }
    if (Object.keys(verbs.tense.present_indicative.irregulars).includes(verb)) {
      document.getElementById("answer").value = (reflexive?reflexive + " ":"") + verbs.tense.present_indicative.irregulars[verb][pov];
    } else {
      document.getElementById("answer").value = (reflexive?reflexive + " ":"") + stem + ending;
    }
  } else if (tense == "preterite indicative") {
    stem = verb.slice(0,verb.length-2);
    ending = verbs.tense.preterite_indicative.endings[verb.slice(verb.length-2)][pov];
    if (!["nosotros","vosotros"].includes(pov)) {
      if (["él/ella/usted","ellos/ellas/ustedes"].includes(pov)) {
        if (verb.slice(verb.length-3) == "uir" && verb.slice(verb.length-4) != "guir") {
          ending = "y" + ending.slice(1);
        } else if (verb.slice(verb.length-3) == "cir") {
          ending = ending.slice(1);
        }
      }
      Object.values(verbs.tense.preterite_indicative.stem_changes).forEach(stemChange => {
        if (Object.keys(stemChange).includes(verb)) {
          stem = stemChange[verb];
          if (stemChange == verbs.tense.preterite_indicative.stem_changes.i_y) {
            ending = "y" + ending.slice(1);
            console.log(stemChange, verb, stem, ending);
          } else if (stemChange == verbs.tense.preterite_indicative.stem_changes.j) {
            stem = stem.slice(stem.length-1) + "j";
          } else if (stemChange == verbs.tense.preterite_indicative.stem_changes.irregular) {
            ending = verbs.tense.preterite_indicative.endings[pov];
          }
        }
      });
      if (verb.slice(verb.length-3) == "cir") {
        stem = stem.slice(stem.length-1) + "j";
      }
    }
    if (pov == "yo") {
      if (verb.slice(verb.length-3) == "car") {
        stem = verb.slice(verb.length-3);
        ending = "qué";
      } else if (verb.slice(verb.length-3) == "gar") {
        stem = verb.slice(verb.length-3);
        ending = "gué";
      } else if (verb.slice(verb.length-3) == "guar") {
        stem = verb.slice(verb.length-3);
        ending = "güé";
      } else if (verb.slice(verb.length-3) == "zar") {
        stem = verb.slice(verb.length-3);
        ending = "cé";
      }
    }
    if (Object.keys(verbs.tense.preterite_indicative.irregulars).includes(verb)) {
      document.getElementById("answer").value = (reflexive?reflexive + " ":"") + verbs.tense.preterite_indicative.irregulars[verb][pov];
    } else {
      document.getElementById("answer").value = (reflexive?reflexive + " ":"") + stem + ending;
    }
  }
}
