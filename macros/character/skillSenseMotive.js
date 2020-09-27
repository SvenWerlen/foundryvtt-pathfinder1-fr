Id: zFcfhb5acaDaVv7n
Name: Test : Psychologie
Icon: systems/pf1/icons/skills/red_09.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de psychologie
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de psychologie", dd: "-" },
  { name: "Sentir si quelque-chose cloche (pressentiment)", dd: "20" },
  { name: "Percevoir un enchantement", dd: "25 ou 15 (domination)" },
  { name: "Intercepter un message secret", dd: "vs Bluff de celui qui émet le message" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Psychologie : ${actors[0].name}`, 
    skillId: "sen",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
