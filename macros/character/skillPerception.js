Id: T0xfm2PVPsCZJLeM
Name: Test : Perception
Icon: systems/pf1/icons/skills/light_02.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de perception
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de perception", dd: "-" },
  { name: "" },
  { name: "Sentir l'odeur de détritus en putréfaction", dd: "-10" },
  { name: "Sentir l'odeur de la fumée", dd: "0" },
  { name: "" },
  { name: "Déterminer si de la nourriture est avariée", dd: "5" },
  { name: "Identifier les effets d'une potion en la goûtant", dd: "15 + NLS de la potion" },
  { name: "" },
  { name: "Entendre les bruits d'un combat", dd: "-10" },
  { name: "Entendre les détails d'une conversation", dd: "0" },
  { name: "Entendre les pas d'une créature", dd: "10" },
  { name: "Entendre les détails d'une conversation à voix basse", dd: "15" },
  { name: "Entendre le son d'une clef tournant dans une serrure", dd: "20" },
  { name: "Entendre le son d'un arc dont on tend la corde", dd: "25" },
  { name: "" },
  { name: "Voir une créature visible", dd: "0" },
  { name: "Trouver une porte cachée de difficulté moyenne", dd: "15" },
  { name: "Trouver une porte secrète de difficulté moyenne", dd: "20" },
  { name: "Percevoir les vibraton d'une créature souterraine", dd: "25" },
  { name: "Remarquer un pickpocket", dd: "vs Escamotage de l'adversaire" },
  { name: "Remarquer une créature discrète", dd: "vs Discrétion de l'adversaire" },
  { name: "Trouver un piège caché", dd: "variable" },
  
]

// retrieve choice from storage
let rollMode = null
if (typeof(Storage) !== "undefined") {
  rollMode = localStorage.rollMode
} else {
  rollMode = MacrosPF1SkillChecksDialog.rollMode
}

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Perception : ${actors[0].name}`, 
    skillId: "per",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
