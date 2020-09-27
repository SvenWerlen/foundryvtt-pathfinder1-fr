Id: JgtyZ1IBOjXna75w
Name: Test : Escalade
Icon: systems/pf1/icons/skills/green_31.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'escalade
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'escalade", dd: "-" },
  { name: "Progresser le long d'une pente fortement inclinée ou un mur", dd: "variable" },
  { name: "Pente trop inclinée pour permettre d'avancer en marchant", dd: "0" },
  { name: "Corde à noeuds accrochée près d'un mur contre lequel on peut s'appuyer", dd: "0" },
  { name: "Corde accrochée près d'un mur contre lequel on peut s'appuyer", dd: "5" },
  { name: "Corde à noeuds ou corde crée par le sort corde enchantée", dd: "5" },
  { name: "Surface garnie de corniches où on peut se tenir ou s'accrocher", dd: "10" },
  { name: "Surface comprenant suffisamment de prises (rocher escarpé, arbre, corde sans noeud, rebord)", dd: "15" },
  { name: "Surface inégale comprenant quelques petites prises (ex: mur de donjon)", dd: "20" },
  { name: "Surface rugueuse (paroi rocheuse, mur de briques)", dd: "25" },
  { name: "Dévers ou plafond garnis de prises pour les mains uniquement", dd: "30" },
  { name: "Stopper sa chute dans une pente", dd: "10 + DD de la pente" },
  { name: "Stopper sa chute dans une paroi", dd: "20 + DD de la paroi" },
  { name: "Stopper la chute d'une autre personne", dd: "Att. de contact + DD de la surface + 10" },
]

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Escalade : ${actors[0].name}`, 
    skillId: "clm",
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
