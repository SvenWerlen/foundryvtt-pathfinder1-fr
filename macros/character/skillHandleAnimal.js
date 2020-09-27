Id: DBTAPkbdPEMozG1a
Name: Test : Dressage
Icon: systems/pf1/icons/skills/blue_29.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test de dressage
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test de dressage", dd: "-" },
  { name: "Diriger un animal", dd: "10" },
  { name: "Pousser un animal", dd: "25" },
  { name: "Enseigner \"Arrête !\" à un animal", dd: "15" },
  { name: "Enseigner \"Attaque !\" à un animal", dd: "20" },
  { name: "Enseigner \"Attends !\" à un animal", dd: "15" },
  { name: "Enseigner \"Au pied !\" à un animal", dd: "15" },
  { name: "Enseigner \"Cherche !\" à un animal", dd: "15" },
  { name: "Enseigner \"Garde !\" à un animal", dd: "20" },
  { name: "Enseigner \"Joue !\" à un animal", dd: "15" },
  { name: "Enseigner \"Protège !\" à un animal", dd: "20" },
  { name: "Enseigner \"Suis !\" à un animal", dd: "15" },
  { name: "Enseigner \"Travaille !\" à un animal", dd: "15" },
  { name: "Enseigner \"Va chercher !\" à un animal", dd: "15" },
  { name: "Enseigner \"Viens !\" à un animal", dd: "15" },
  { name: "Enseigner la fonction \"Animal de chasse\"", dd: "20" },
  { name: "Enseigner la fonction \"Animal de combat\"", dd: "20" },
  { name: "Enseigner la fonction \"Animal de foire\"", dd: "15" },
  { name: "Enseigner la fonction \"Animal de garde\"", dd: "20" },
  { name: "Enseigner la fonction \"Monture\"", dd: "15" },
  { name: "Enseigner la fonction \"Monture de combat\"", dd: "20" },
  { name: "Enseigner la fonction \"Travailleur de force\"", dd: "15" },
  { name: "Élever un animal sauvage", dd: "15 + DV de l'animal" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Dressage : ${actors[0].name}`, 
    skillId: "han",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
