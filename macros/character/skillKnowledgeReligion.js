Id: dR8tchaKy8OezxVL
Name: Test : Connaissances (Religion)
Icon: systems/pf1/icons/skills/red_25.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de connaissances (religion)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de connaissances (religion)", dd: "-" },
  { name: "" },
  { name: "Répondre à une question ayant trait à sa spécialité", dd: "10 (basique), 15 (facile), 20 (difficile) ou 30 (très difficile)" },
  { name: "Reconnaître un monstre et identifier ses particularités ou points faibles", dd: "5 (commun), 10 (normal) ou 15+ (rare) + FP du monstre" },
  { name: "" },
  { name: "Reconnaître le symbole d'une divinité courante ou identifier un membre de son clergé", dd: "10" },
  { name: "Connaître les grandes lignes de la mythologie et de la doctrine d'une foi", dd: "15" },
  { name: "Reconnaître le symbole d'une divinité peu connnue ou identifier un membre de son clergé", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Connaissances (Religion) : ${actors[0].name}`, 
    skillId: "kre",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
