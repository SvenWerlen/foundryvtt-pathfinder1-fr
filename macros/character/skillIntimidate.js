Id: chu1b7KWLKc3ddjv
Name: Test : Intimidation
Icon: systems/pf1/icons/skills/red_10.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'intimidation
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'intimidation", dd: "-" },
  { name: "" },
  { name: "Forcer un adversaire à se montrer amical (1d6 x 10 minutes)", dd: "10 + DV (cible) + Sag (cible)" },
  { name: "Démoraliser un adversaire (secoué 1rd)", dd: "10 + DV (cible) + Sag (cible)" },
  
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
    title: `Intimidation : ${actors[0].name}`, 
    skillId: "int",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
