Id: pCypbeI6YdMeIc61
Name: Test : Linguistique
Icon: systems/pf1/icons/skills/light_07.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de linguistique
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de linguistique", dd: "-" },
  { name: "" },
  { name: "Décrypter une page d'un texte incomplet ou rédigé dans une langue inconnue ou archaïque", dd: "20 (simple), 25 (normal), 30 (complexe)" },
  { name: "" },
  { name: "Détecter une contrefaçon", dd: "vs Linguistique du créateur" },
  { name: "Créer une contrefaçon", dd: "vs Linguistique de l'examinateur" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Linguistique : ${actors[0].name}`, 
    skillId: "lin",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
