Id: 9ePEn6JQj3f7cB3T
Name: Émettre de la lumière
Icon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerTooltip: Retirer la lumière
MarkerIcon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerColor: #edc412
------------

///// CONFIGURATION
const porteeCourte = 3;
const porteeLongue = 2 * porteeCourte;

///// INFORMATIONS
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.hasPerm(game.user, "OWNER") )

if( tokens.length == 0 ) { ui.notifications.error("Veuillez choisir un token sur la scène!"); }
else {
  tokens.forEach( t => {
    const radius1 = t.brightLightRadius > 0 || t.dimLightRadius > 0 ? 0 : porteeCourte
    const radius2 = t.brightLightRadius > 0 || t.dimLightRadius > 0 ? 0 : porteeLongue
    const hasLight = t.brightLightRadius > 0 || t.dimLightRadius > 0
    t.update({brightLight: radius1, dimLight: radius2});
    MacroMarker.toggle(this);
  })
}

------------

const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.hasPerm(game.user, "OWNER") )
return tokens.length > 0 && (tokens[0].brightLightRadius > 0 || tokens[0].dimLightRadius > 0)
