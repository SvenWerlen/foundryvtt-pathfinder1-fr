Id: GFOBTXEvXIDNUaqk
Name: Test : Représentation*
Icon: systems/pf1/icons/skills/gray_06.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de représentation
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de représentation", dd: "-" },
  { name: "" },
  { name: "Divertir son public et en vivre", dd: "voir détails" },
]

// retrieve choice from storage
let specialty = null
let rollMode = null
if (typeof(Storage) !== "undefined") {
  specialty = localStorage.skillSpecialty
  rollMode = localStorage.rollMode
} else {
  specialty = MacrosPF1SkillChecksDialog.skillSpecialty
  rollMode = MacrosPF1SkillChecksDialog.rollMode
}

if( !specialty ) { ui.notifications.warn("Aucune spécialité spécifiée pour <i>Représentation</i> !") }

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Représentation : ${actors[0].name}`, 
    skillId: "prf",
    subSkillId: specialty,
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
