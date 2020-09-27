Id: ggs7CHiTtN6zzuMC
Name: Test : Natation
Icon: systems/pf1/icons/skills/emerald_05.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de natation
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de natation", dd: "-" },
  { name: "" },
  { name: "Nager dans eaux calmes", dd: "10" },
  { name: "Nager dans eaux agitées", dd: "15" },
  { name: "Nager dans eaux très agitées (par tempête par exemple)", dd: "20" },  
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Natation : ${actors[0].name}`, 
    skillId: "swm",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
