Id: jRVlxAqqIoJJP1lm
Name: Test : Vol
Icon: systems/pf1/icons/skills/blue_02.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de vol
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de vol", dd: "-" },
  { name: "" },
  { name: "Se déplacer sur une distance inférieure à la moitié de sa vitesse et rester en vol", dd: "10" },
  { name: "Faire du surplace/vol stationnaire", dd: "15" },
  { name: "Virer de plus de 45° en sacrifiant 1,50 m de mouvement", dd: "15" },
  { name: "Virer à 180° en sacrifiant 3 m de mouvement", dd: "20" },
  { name: "Voler vers le haut selon un angle de plus de 45°", dd: "20" },
  { name: "" },
  { name: "Éviter une chute vers le sol suite à une collision", dd: "25" },
  { name: "Éviter les dégâts d'une chute", dd: "10" },
  { name: "Éviter de perdre 3 m d'altitude suite à des dégâts", dd: "10" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Vol : ${actors[0].name}`, 
    skillId: "fly",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
