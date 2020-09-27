Id: P7ex3VGPNvBtjhkf
Name: Test de Sabotage
Icon: systems/pf1/icons/items/inventory/lockpick.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de sabotage
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de sabotage", dd: "-" },
  { name: "Coincer un serrure (1 rd)", dd: "10" },
  { name: "Saboter une roue de chariot (1d4 rds)", dd: "15" },
  { name: "Désarmer/réarmer un piège (2d4 rds)", dd: "20" },
  { name: "Désarmer/réarmer un piège complexe (2d4 rds)", dd: "25" },
  { name: "Saboter un mécanisme à engrenages complexes (2d4 rds)", dd: "25" },
  { name: "Crocheter une serrure simple", dd: "20" },
  { name: "Crocheter une serrure moyenne", dd: "25" },
  { name: "Crocheter une serrure bonne", dd: "30" },
  { name: "Crocheter une serrure excellente", dd: "40" },
  
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Sabotage : ${actors[0].name}`, 
    skillId: "dev",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
