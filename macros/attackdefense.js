Id: 1IqmhS75L8bVcNqp
Name: Combattre sur la défensive
Icon: systems/pf1/icons/feats/improved-shield-bash.jpg
MarkerTooltip: Combattre normalement
MarkerIcon: systems/pf1/icons/feats/improved-shield-bash.jpg
MarkerColor: #bba8a8
------------
///// INFORMATIONS
//
// Cette macro permet d'activer ou de désactiver l'attaque sur la défensive (sélection)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const COMMAND = 'Permuter "Combattre sur la défensive"'

//// SCRIPT
MacrosPF1.applyBuff(COMMAND)

------------

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  const hero = actors[0];
  const buff = hero.items.find( i => i.type === "buff" && i.name === "Combattre sur la défensive" )
  return buff && getProperty(buff.data, "data.active")
} 
return false
