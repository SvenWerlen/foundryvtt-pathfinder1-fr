Id: tFMT9FlBamA5pISR
Name: Test : Évasion
Icon: systems/pf1/icons/skills/red_06.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'évasion
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'évasion", dd: "-" },
  { name: "Se libérer de cordes", dd: "20 + BMO de celui qui a ligoté" },
  { name: "Se libérer d'un filet", dd: "20" },
  { name: "Se libérer de contrôle des plantes", dd: "20" },
  { name: "Se libérer de corde animée", dd: "20" },
  { name: "Se libérer de empire végétal ou enchevêtrement", dd: "20" },
  { name: "Se libérer du sort de collet", dd: "23" },
  { name: "Se libérer de menottes", dd: "30" },
  { name: "Se libérer d'un conduit étroit", dd: "30" },
  { name: "Se libérer de menottes de qualité supérieure", dd: "35" },
  { name: "Se libérer d'une situation de lutte", dd: "DMD de l'adversaire" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Évasion : ${actors[0].name}`, 
    skillId: "esc",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
