Id: N4ZbObrhlTT8pG0p
Name: Test : Profession*
Icon: systems/pf1/icons/skills/yellow_41.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de profession
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de profession", dd: "-" },
  { name: "" },
  { name: "Répondre à une question relative à la profession", dd: "10 (simple) ou 15+ (complexe)" },
  { name: "Utiliser son métier pour vivre (moitié du résultat en p.o. / semaine)", dd: "spécial" },
]

// keep choice in storage
let specialty = null
if (typeof(Storage) !== "undefined") {
  specialty = localStorage.skillSpecialty
} else {
  specialty = MacrosPF1SkillChecksDialog.skillSpecialty
}

if( !specialty ) { ui.notifications.warn("Aucune spécialité spécifiée pour <i>Profession</i> !") }

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Profession : ${actors[0].name}`, 
    skillId: "pro",
    subSkillId: specialty,
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
