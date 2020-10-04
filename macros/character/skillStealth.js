Id: xyDKL2vrnrsRdUWO
Name: Test : Discrétion
Icon: systems/pf1/icons/skills/green_18.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de discrétion
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de discrétion", dd: "-" },
  { name: "" },
  { name: "Rester discret ou passer inapercu", dd: "vs Perception de l'ennemi" },
  { name: "Tirer embusqué", dd: "vs Perception de l'ennemi (malus -20)" },
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
    title: `Discrétion : ${actors[0].name}`, 
    skillId: "ste",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
