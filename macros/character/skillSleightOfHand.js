Id: ZYUak80DdjosNPFn
Name: Test : Escamotage
Icon: systems/pf1/icons/items/inventory/pouch-belt.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'escamotage
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'escamotage", dd: "-" },
  { name: "Se saisir discrètement d'un objet de la taille d'une pièce", dd: "10 (vs Perception si vigilence)" },
  { name: "Cacher un objet de taille réduite", dd: "variable" },
  { name: "Dérober un petit objet à une personne", dd: "20 vs Perception" },
 
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Escamotage : ${actors[0].name}`, 
    skillId: "slt",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
