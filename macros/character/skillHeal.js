Id: itXZdskOnSbbsbMd
Name: Test : Premiers secours
Icon: systems/pf1/icons/skills/blood_04.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de premiers secours
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de premiers secours", dd: "-" },
  { name: "Stabiliser une personne mourante", dd: "15" },
  { name: "Effectuer des soins suivis pendant un jour ou plus", dd: "15" },
  { name: "Soigner une blessure de chausse-trappe, de croissance d'épines ou de pierres acérées", dd: "15" },
  { name: "Soigner des blessures mortelles", dd: "20" },
  { name: "Soigner un empoisonnement (+4 JdS)", dd: "DD du JS contre le poison" },
  { name: "Soigner une maladie (+4 JdS)", dd: "DD du JS contre la maladie" },
  
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Premiers secours : ${actors[0].name}`, 
    skillId: "hea",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
