Id: 9ePEn6JQj3f7cB3T
Name: Émettre de la lumière
Icon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerTooltip: Retirer la lumière
MarkerIcon: systems/pf1/icons/items/inventory/lantern.jpg
MarkerColor: #edc412
------------
///// INFORMATIONS
// Base : Foundry VTT (0.8.6)
// Système : Pathfinder 1 (0.78.9)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const porteeCourte = 3; 
const porteeLongue = 2 * porteeCourte;


const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.hasPerm(game.user, "OWNER") )

if( tokens.length == 0 ) { ui.notifications.error("Veuillez choisir un token sur la scène!"); }
else {
  tokens.forEach( t => {
    const radius1 = t.data.brightLight > 0 || t.data.dimLight > 0 ? 0 : porteeCourte
    const radius2 = t.data.brightLight > 0 || t.data.dimLight > 0 ? 0 : porteeLongue
    const hasLight = t.data.brightLight > 0 || t.data.dimLight > 0
    t.update({brightLight: radius1, dimLight: radius2});
    MacroMarker.toggle(this);
  })
}

------------

const tokens = canvas.tokens.controlled.filter( t => t.actor && t.actor.testUserPermission(game.user, "OWNER") )
return tokens.length > 0 && (tokens[0].data.brightLight > 0 || tokens[0].data.dimLight > 0)
