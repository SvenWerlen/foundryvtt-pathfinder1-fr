Id: 9ePEn6JQj3f7cB3T
Name: Émettre de la lumière
Icon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerTooltip: Retirer la lumière
MarkerIcon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerColor: #edc412
------------
///// INFORMATIONS
//
// Cette macro permet d'activer/désactiver de la lumière sur un token
//
// Base : Foundry VTT (0.7.5)
// Système : Pathfinder 1 (0.75.6)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const porteeCourte = 6;
const porteeLongue = 2 * porteeCourte;

///// SCRIPT
const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.hasPerm(game.user, "OWNER") )

if( tokens.length == 0 ) { ui.notifications.error("Veuillez choisir un token sur la scène!"); }
else {
  tokens.forEach( t => {
    const radius1 = t.brightRadius > 0 || t.dimRadius > 0 ? 0 : porteeCourte
    const radius2 = t.brightRadius > 0 || t.dimRadius > 0 ? 0 : porteeLongue
    t.update({brightLight: radius1, dimLight: radius2});
    MacroMarker.toggle(this);
  })
}

------------

const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.hasPerm(game.user, "OWNER") )
return tokens.length > 0 && (tokens[0].brightRadius > 0 || tokens[0].dimRadius > 0)
