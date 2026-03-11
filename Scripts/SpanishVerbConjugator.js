let verbs = {};
fetch("/Data/JSON/SpanishVerbConjugator/verbs.json")
  .then(res => {return res.json()})
  .then(data => Object.keys(data).forEach(form => verbs[form] = data[form]))
  .catch(err => console.log(err));
document.getElementById("msg").onclick = () => {
  if (document.getElementById("msg").innerText == "More tenses coming soon!") {
    document.getElementById("msg").innerText = "¡Más tiempos verbales próximamente!";
  } else {
    document.getElementById("msg").innerText = "More tenses coming soon!";
  }
}
document.getElementById("conjugate").onclick = () => {
  document.getElementById("answer").value = conjugate(document.getElementById("verb").value,document.getElementById("pov").value,document.getElementById("tense").value);
}
const conjugate = (verbInput, pov, tense) => {
  let stem, ending, verb = verbInput, reflexive = null;
  if (verb.slice(verb.length-2) == "se") {
    verb = verb.slice(0,verb.length-2);
    reflexive = verbs.reflexive_pronouns[pov];
  }
  if (tense == "present indicative") {
    stem = verb.slice(0,verb.length-2);
    ending = verbs.tense.present_indicative.endings[verb.slice(verb.length-2)][pov];
    if (!["nosotros","vosotros"].includes(pov)) {
      if (verb.slice(verb.length-3) == "uir" && verb.slice(verb.length-4) != "guir") stem += "y";
      Object.values(verbs.tense.present_indicative.stem_changes).forEach(stemChange => {
        if (Object.keys(stemChange).includes(verb)) stem = stemChange[verb];
      });
    }
    if (pov == "yo") {
      let foundIrregularYo = false;
      Object.values(verbs.tense.present_indicative.irregular_yo_verbs).forEach(irregular => {
        if (Object.keys(irregular).includes(verb)) {
          stem = irregular[verb].slice(0,irregular[verb].length-1);
          foundIrregularYo = true;
          if (irregular == verbs.tense.present_indicative.irregular_yo_verbs.other) {
            ending = irregular[verb].slice(irregular[verb].length-1);
          }
        }
      });
      if (!foundIrregularYo) {
        if (verb.endsWith("ger") || verb.endsWith("gir")) stem = stem.slice(0,-1) + "j";
        else if (verb.endsWith("cer") || verb.endsWith("cir")) stem = stem.slice(0,-1) + "zc";
        else if (verb.endsWith("guir")) stem = stem.slice(0, -2) + "g";
        ending = "o";
      }
    }
    if (Object.keys(verbs.tense.present_indicative.irregulars).includes(verb)) return (reflexive?reflexive + " ":"") + verbs.tense.present_indicative.irregulars[verb][pov];
    else return (reflexive?reflexive + " ":"") + stem + ending;
  } else if (tense == "preterite indicative") {
    stem = verb.slice(0,-2);
    ending = verbs.tense.preterite_indicative.endings[verb.slice(-2)][pov];
    if (!["nosotros","vosotros"].includes(pov)) {
      if (["él/ella/usted","ellos/ellas/ustedes"].includes(pov)) {
        if (verb.endsWith("uir") && !verb.endsWith("guir")) ending = "y" + ending.slice(1);
        else if (verb.endsWith("cir")) ending = ending.slice(1);
      }
      Object.values(verbs.tense.preterite_indicative.stem_changes).forEach(stemChange => {
        if (Object.keys(stemChange).includes(verb)) {
          stem = stemChange[verb];
          if (stemChange == verbs.tense.preterite_indicative.stem_changes.i_y) {
            ending = "y" + ending.slice(1);
          } else if (stemChange == verbs.tense.preterite_indicative.stem_changes.j) {
            stem += "j";
            ending = verbs.tense.preterite_indicative.endings.irregular[pov];
          } else if (stemChange == verbs.tense.preterite_indicative.stem_changes.other) ending = verbs.tense.preterite_indicative.endings.irregular[pov];
        }
      });
      if (verb.endsWith("cir")) stem = stem.slice(stem.length-1) + "j";
    }
    if (pov == "yo") {
      if (verb.endsWith("car")) {
        stem = verb.slice(-3);
        ending = "qué";
      } else if (verb.endsWith("gar")) {
        stem = verb.slice(-3);
        ending = "gué";
      } else if (verb.endsWith("guar")) {
        stem = verb.slice(-4);
        ending = "güé";
      } else if (verb.endsWith("zar")) {
        stem = verb.slice(-3);
        ending = "cé";
      }
    }
    if (Object.keys(verbs.tense.preterite_indicative.irregulars).includes(verb)) return (reflexive?reflexive + " ":"") + verbs.tense.preterite_indicative.irregulars[verb][pov];
    else return (reflexive?reflexive + " ":"") + stem + ending;
  } else if (tense == "imperfect indicative") {
    stem = verb.slice(0,-2);
    ending = verbs.tense.imperfect_indicative.endings[verb.slice(verb.length-2)][pov];
    if (Object.keys(verbs.tense.imperfect_indicative.irregulars).includes(verb)) return (reflexive?reflexive + " ":"") + verbs.tense.imperfect_indicative.irregulars[verb][pov];
    else return (reflexive?reflexive + " ":"") + stem + ending;
  } else if (tense == "present perfect indicative") {
    return (reflexive?reflexive + " ":"")+conjugate("haber",pov,"present indicative")+" "+conjugate(verb,null,"past participle");
  } else if (tense == "past participle") {
    for (const root of Object.keys(verbs.tense.past_participle.irregulars_roots)) {
      if (verb.endsWith(root)) return verb.slice(0,-root.length)+verbs.tense.past_participle.irregulars_roots[root];
    }
    if (Object.keys(verbs.tense.past_participle.irregulars).includes(verb)) return verbs.tense.past_participle.irregulars[verb];
    stem = verb.slice(0,-2);
    ending = verbs.tense.past_participle.endings[verb.slice(-2)];
    if (ending == "ido" && ["a","e","i","o","u"].includes(stem.slice(-1))) ending = "ído";
    return stem + ending;
  } else if (tense == "pluperfect indicative") {
    return (reflexive?reflexive + " ":"")+conjugate("haber",pov,"imperfect indicative")+" "+conjugate(verb,null,"past participle");
  }
}
