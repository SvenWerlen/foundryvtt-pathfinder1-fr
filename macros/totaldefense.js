Id: Tta2l2WwXVnBObxA
Name: Activer Défense Totale
Icon: systems/pf1/icons/feats/shield-slam.jpg
MarkerTooltip: Désactiver Défense Totale
MarkerIcon: systems/pf1/icons/feats/shield-slam.jpg
MarkerColor: #bba8a8
------------
///// INFORMATIONS
//
// Cette macro permet d'activer ou de désactiver la défense totale sur un personnage
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const COMMAND = 'Permuter "Défense totale"'

//// SCRIPT
MacrosPF1.applyBuff(COMMAND)
------------

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  const hero = actors[0];
  const buff = hero.items.find( i => i.type === "buff" && i.name === "Défense totale" )
  return buff && getProperty(buff.data, "data.active")
} 
return false
