Id: EE9J9KDcuMkbYahA
Name: Test : Estimation
Icon: systems/pf1/icons/items/jewelry/ring-orb.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'estimation
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'estimation", dd: "-" },
  { name: "" },
  { name: "Évaluer les objets courants", dd: "20 ou plus" },
  { name: "Repérer l'objet le plus précieux au sein d'un trésor", dd: "20 ou plus" },
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
    title: `Estimation : ${actors[0].name}`, 
    skillId: "apr",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
