Id: OLXazUWujj7D6Mj7
Name: Test d'Art de la magie
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

const TESTS = [
  { name: "Identifier un sort lorsqu'il est lancé", dd: "15 + niveau du sort" },
  { name: "Apprendre un sort à partir d'un grimoire ou d'un parchemin", dd: "15 + niveau du sort" },
  { name: "Préparer un sort à partir d'un grimoire emprunté", dd: "15 + niveau du sort" },
  { name: "Identifier les propriétés d'un objet magique en utilisant le sort de détection de la magie", dd: "15 + NLS de l'objet magique" },
  { name: "Déchiffrer un parchemin", dd: "20 + niveau du sort" },
  { name: "Fabriquer un objet magique", dd: "Variable selon les objets" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillTestDialog(null, {
    actorId: actors[0]._id,
    title: `Art de la magie : ${actors[0].name}`, 
    skillId: "spl",
    tests: TESTS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
