Id: VYFOFwkdgiYJHQRI
Name: Test : Équitation
Icon: systems/pf1/icons/feats/animal-affinity.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'équitation
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'équitation", dd: "-" },
  { name: "" },
  { name: "Guider sa monture avec les genoux", dd: "5" },
  { name: "Rester en selle", dd: "5" },
  { name: "Combattre sur une monture entraînée au combat", dd: "10" },
  { name: "Utiliser sa monture pour s'abriter", dd: "15" },
  { name: "Amortir sa chute", dd: "15" },
  { name: "Sauter un obstacle", dd: "15" },
  { name: "Éperonner sa monture", dd: "15" },
  { name: "Contrôler sa monture au combat", dd: "20" },
  { name: "Monter en selle ou descendre de selle rapidement", dd: "20" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Équitation : ${actors[0].name}`, 
    skillId: "rid",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
