Id: qXpQfBSWsrEpDLJR
Name: Test : Artisanat*
Icon: systems/pf1/icons/items/inventory/anvil.jpg
------------
///// INFORMATIONS
//
// Cette macro propose les différentes options pour un test d'artisanat
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const CHECKS = [
  { name: "Effectuer un test d'artisanat", dd: "-" },
  { name: "" },
  { name: "Alchimie: acide", dd: "15" },
  { name: "Alchimie: allume-feu, bâton fumigène ou feu grégeois", dd: "20" },
  { name: "Alchimie: antidote, bâton éclairant, pierre à tonnerre ou sacoche immobilisante", dd: "25" },
  { name: "" },
  { name: "Armures: armure ou bouclier", dd: "10 + bonus CA" },
  { name: "" },
  { name: "Arcs: arc long, arc court ou flèches", dd: "12" },
  { name: "Arcs: arc long composite ou arc court composite", dd: "15" },
  { name: "Arcs: arc composite limite de Force", dd: "15 + (2 x limite)" },
  { name: "" },
  { name: "Pièges: piège mécanique", dd: "variable" },
  { name: "" },
  { name: "Armes: arbalète ou carreaux", dd: "15" },
  { name: "Armes: arme courante (corps à corps ou à distance)", dd: "12" },
  { name: "Armes: arme de guerre (corps à corps ou à distance)", dd: "15" },
  { name: "Armes: arme exotique (corps à corps ou à distance)", dd: "18" },
  { name: "" },
  { name: "Objet très simple (ex: cuillère en bois)", dd: "5" },
  { name: "Objet courant (ex: pot en fer)", dd: "10" },
  { name: "Objet de qualité (ex: cloche)", dd: "15" },
  { name: "Objet complexe ou de qualité supérieure (ex: serrure)", dd: "20" },
]

// keep choice in storage
let specialty = null
if (typeof(Storage) !== "undefined") {
  specialty = localStorage.skillSpecialty
} else {
  specialty = MacrosPF1SkillChecksDialog.skillSpecialty
}

if( !specialty ) { ui.notifications.warn("Aucune spécialité spécifiée pour <i>Artisanat</i> !") }

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  new MacrosPF1SkillCheckDialog(null, {
    actorId: actors[0]._id,
    title: `Artisanat : ${actors[0].name}`, 
    skillId: "crf",
    subSkillId: specialty,
    checks: CHECKS,
    rollMode: "blindroll" // commenter la ligne pour prendre la selection en cours
  }).render(true)
}
