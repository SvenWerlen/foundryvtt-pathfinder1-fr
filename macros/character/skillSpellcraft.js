Id: OLXazUWujj7D6Mj7
Name: Test : Art de la magie
Icon: systems/pf1/icons/spells/evil-eye-eerie-2.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'Art de la magie
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'art de la magie", dd: "-" },
  { name: "" },
  { name: "Identifier un sort lorsqu'il est lancé", dd: "15 + niveau du sort" },
  { name: "Apprendre un sort à partir d'un grimoire ou d'un parchemin", dd: "15 + niveau du sort" },
  { name: "Préparer un sort à partir d'un grimoire emprunté", dd: "15 + niveau du sort" },
  { name: "Identifier les propriétés d'un objet magique en utilisant le sort de détection de la magie", dd: "15 + NLS de l'objet magique" },
  { name: "Déchiffrer un parchemin", dd: "20 + niveau du sort" },
  { name: "Fabriquer un objet magique", dd: "Variable selon les objets" },
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
    title: `Art de la magie : ${actors[0].name}`, 
    skillId: "spl",
    checks: CHECKS,
    rollMode: rollMode
  }).render(true)
}
