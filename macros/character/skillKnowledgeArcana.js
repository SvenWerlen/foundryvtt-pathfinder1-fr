Id: zYZP3lmHr4E8HkOm
Name: Test : Connaissances (Mystères)
Icon: systems/pf1/icons/skills/red_25.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de connaissances (mystères)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de connaissances (mystères)", dd: "-" },
  { name: "" },
  { name: "Répondre à une question ayant trait à sa spécialité", dd: "10 (basique), 15 (facile), 20 (difficile) ou 30 (très difficile)" },
  { name: "Reconnaître un monstre et identifier ses particularités ou points faibles", dd: "5 (commun), 10 (normal) ou 15+ (rare) + FP du monstre" },
  { name: "" },
  { name: "Identifier les auras magiques avec un sort de détection de la magie", dd: "15 + niveau du sort" },
  { name: "Identifier un effet de sort déjà actif", dd: "20 + niveau du sort" },
  { name: "Reconnaître des matériaux créés par magie", dd: "20 + niveau du sort" },
  { name: "Identifier un sort ayant pris le personnage pour cible", dd: "25 + niveau du sort" },
  { name: "Identifier un sort lancé en utilisant une composante matérielle", dd: "20" },
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
    title: `Connaissances (Mystères) : ${actors[0].name}`, 
    skillId: "kar",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
