Id: FPkOj8fuJVNF02PG
Name: Test : Survie
Icon: systems/pf1/icons/skills/green_10.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de survie
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de survie", dd: "-" },
  { name: "" },
  { name: "Se débrouiller en pleine nature sauvage (chasse, cueillette, ...)", dd: "10" },
  { name: "Acquérir des bonus aux JdS contre les rigueurs du climat", dd: "15" },
  { name: "Ne pas se perdre et remarquer les dangers naturels", dd: "15" },
  { name: "Prédire les conditions climatiques pour les 24h à venir", dd: "15" },
  { name: "" },
  { name: "Suivre les traces (sol très mou)", dd: "5" },
  { name: "Suivre les traces (mou)", dd: "10" },
  { name: "Suivre les traces (ferme)", dd: "15" },
  { name: "Suivre les traces (dur)", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Survie : ${actors[0].name}`, 
    skillId: "sur",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
