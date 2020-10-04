Id: XH0oAxXh3kVQ8ozU
Name: Test : Déguisement
Icon: systems/pf1/icons/skills/violet_07.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de déguisement
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de déguisement", dd: "-" },
  { name: "" },
  { name: "Déterminer si le déguisement est bon ou pas", dd: "vs Perception de l'ennemi" },
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
    title: `Déguisement : ${actors[0].name}`, 
    skillId: "dis",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
