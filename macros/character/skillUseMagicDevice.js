Id: URIhTJGymzETbG9S
Name: Test : Utilisation d'objets magiques
Icon: systems/pf1/icons/items/inventory/wand-star.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'utilisation d'objets magiques
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'utilisation d'objets magiques", dd: "-" },
  { name: "" },
  { name: "Activer un objet par chance", dd: "25" },
  { name: "Déchiffrer un sort écrit", dd: "25 + niveau du sort" },
  { name: "" },
  { name: "Simuler une aptitude de classe", dd: "20" },
  { name: "Simuler une valeur de caractéristique", dd: "voir description" },
  { name: "Simuler une race", dd: "25" },
  { name: "Simuler un alignement", dd: "30" },
  { name: "Simuler un parchemin", dd: "20 + niveau du sort" },
  { name: "Simuler une baguette", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Utilisation d'objets magiques : ${actors[0].name}`, 
    skillId: "umd",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
