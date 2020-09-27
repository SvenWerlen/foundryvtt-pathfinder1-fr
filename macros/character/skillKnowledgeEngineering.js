Id: E0vFljuVgm1jwri2
Name: Test : Connaissances (Ingénierie)
Icon: systems/pf1/icons/skills/red_25.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de connaissances (ingénierie)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de connaissances (ingénierie)", dd: "-" },
  { name: "" },
  { name: "Répondre à une question ayant trait à sa spécialité", dd: "10 (basique), 15 (facile), 20 (difficile) ou 30 (très difficile)" },
  { name: "Reconnaître un monstre et identifier ses particularités ou points faibles", dd: "5 (commun), 10 (normal) ou 15+ (rare) + FP du monstre" },
  { name: "" },
  { name: "Reconnaître une construction dangereuse", dd: "10" },
  { name: "Déterminer le style ou l'âge d'un édifice", dd: "15" },
  { name: "Déterminer les points faibles d'un édifice", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Connaissances (Ingénierie) : ${actors[0].name}`, 
    skillId: "ken",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
