Id: 3LvaO3ZWL5KKhJ8O
Name: Test : Acrobaties
Icon: systems/pf1/icons/feats/acrobatic.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'acrobaties
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'acrobaties", dd: "-" },
  { name: "" },
  { name: "Éviter de tomber en se déplacement (surface > 90 cm)", dd: "0*" },
  { name: "Éviter de tomber en se déplacement (surface 30 à 90 cm)", dd: "5*" },
  { name: "Éviter de tomber en se déplacement (surface 15 à 30 cm)", dd: "10" },
  { name: "Éviter de tomber en se déplacement (surface 5 à 15 cm)", dd: "15" },
  { name: "Éviter de tomber en se déplacement (surface < 5 cm)", dd: "20" },
  { name: "" },
  { name: "Traverser une zone contrôlée par un ennemi", dd: "DMD de l'ennemi" },
  { name: "Traverser une zone occupée par un ennemi", dd: "DMD de l'ennemi + 5" },
  { name: "" },
  { name: "Sauter en longeur (1,5 m)", dd: "5" },
  { name: "Sauter en longeur (3 m)", dd: "10" },
  { name: "Sauter en longeur (4,5 m)", dd: "15" },
  { name: "Sauter en longeur (6 m)", dd: "20" },
  { name: "Sauter en longeur (> 6 m)", dd: "20 +5 par 1,5 m" },
  { name: "" },
  { name: "Sauter en hauteur (30 cm)", dd: "4" },
  { name: "Sauter en hauteur (60 cm)", dd: "8" },
  { name: "Sauter en hauteur (90 cm)", dd: "12" },
  { name: "Sauter en hauteur (120 cm)", dd: "16" },
  { name: "Sauter en hauteur (> 120 cm)", dd: "16 + 4 par 30 cm" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Acrobaties : ${actors[0].name}`, 
    skillId: "acr",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
