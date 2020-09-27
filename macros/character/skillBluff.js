Id: hpSx1qbEoWjrcLqW
Name: Test de Bluff
Icon: systems/pf1/icons/skills/yellow_17.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de bluff
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de bluff", dd: "-" },
  { name: "Convaincre de dire la vérité", dd: "vs Psychologie de l'ennemi" },
  { name: "Feinter en combat (CA sans Dex)", dd: "10 + BBA (ennemi) + Sag (ennemi)" },
  { name: "Feinter en combat (CA sans Dex)", dd: "10 + Psychologie (ennemi)" },
  { name: "Transmettre un message secret", dd: "15 (simple) ou 20 (complexe)" },
  { name: "Créer une diversion pour se cacher", dd: "vs Psychologie de l'ennemi" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Bluff : ${actors[0].name}`, 
    skillId: "blf",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
