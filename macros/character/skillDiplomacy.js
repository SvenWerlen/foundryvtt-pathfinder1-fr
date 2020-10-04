Id: 6IQVIEXEIxvUbjgm
Name: Test : Diplomatie
Icon: systems/pf1/icons/skills/gray_05.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de diplomatie
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de diplomatie", dd: "-" },
  { name: "" },
  { name: "Modifier l'attitude d'un PNJ (Hostile)", dd: "25 + Cha de la créature" },
  { name: "Modifier l'attitude d'un PNJ (Inamical)", dd: "20 + Cha de la créature" },
  { name: "Modifier l'attitude d'un PNJ (Indifférent)", dd: "15 + Cha de la créature" },
  { name: "Modifier l'attitude d'un PNJ (Amical)", dd: "10 + Cha de la créature" },
  { name: "Modifier l'attitude d'un PNJ (Serviable)", dd: "0 + Cha de la créature" },
  { name: "" },
  { name: "Demander un conseil général ou demander le chemain", dd: "DD (attitude) - 5" },
  { name: "Demander des conseils précis", dd: "DD (attitude)" },
  { name: "" },
  { name: "Demander de l'aide (acte simple)", dd: "DD (attitude)" },
  { name: "Demander de l'aide (long ou complexe)", dd: "DD (attitude) + 5" },
  { name: "Demander de l'aide (dangereux)", dd: "DD (attitude) + 10" },
  { name: "Demander de l'aide (risque d'être puni)", dd: "DD (attitude) + 15 ou plus" },
  { name: "" },
  { name: "Demander de révéler un secret peu important", dd: "DD (attitude) + 5" },
  { name: "Demander de révéler un secret important", dd: "DD (attitude) + 10 ou plus" },
]

// retrieve choice from storage
let rollMode = null
if (typeof(Storage) !== "undefined") {
  rollMode = localStorage.rollMode
} else {
  rollMode = MacrosPF1SkillChecksDialog.rollMode
}

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Diplomatie : ${actors[0].name}`, 
    skillId: "dip",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
