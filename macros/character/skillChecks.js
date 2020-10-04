Id: GuUAuptdWJhAXFVL
Name: Tests de compétence
Icon: systems/pf1/icons/feats/skill-focus.jpg
------------
///// INFORMATIONS
//
// Cette macro permet d'exécuter n'importe quelle autre macro de test de compétence
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)
//

// OPTION 1: mode basé sur la sélection dans le chat
new MacrosPF1SkillChecksDialog().render(true)

// OPTION 2: mode "à l'aveugle"
// new MacrosPF1SkillChecksDialog(null, { rollMode: "blindroll" } ).render(true)
