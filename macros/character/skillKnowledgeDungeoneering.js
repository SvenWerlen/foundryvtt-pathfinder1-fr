Id: ft3Q9AxkF04sMguR
Name: Test : Connaissances (Exploration souterraine)
Icon: systems/pf1/icons/skills/red_25.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de connaissances (exploration souterraine)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de connaissances (exploration souterraine)", dd: "-" },
  { name: "Répondre à une question ayant trait à sa spécialité", dd: "10 (basique), 15 (facile), 20 (difficile) ou 30 (très difficile)" },
  { name: "Reconnaître un monstre et identifier ses particularités ou points faibles", dd: "5 (commun), 10 (normal) ou 15+ (rare) + FP du monstre" },
  { name: "Identifier un danger souterrain", dd: "15 + FP du danger" },
  { name: "Identifier un minerai, une roche ou un métal", dd: "10" },
  { name: "Déterminer l'inclinaison d'une pente", dd: "15" },
  { name: "Déterminer la profondeur à laquelle le personnage se trouve", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Connaissances (Exploration souterraine) : ${actors[0].name}`, 
    skillId: "kdu",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
