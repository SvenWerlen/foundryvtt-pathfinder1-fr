Id: EUps3Pi8zpviqA2w
Name: Révéler le dernier message
Icon: systems/pf1/icons/feats/alertness.jpg
------------
///// INFORMATIONS
//
// Cette macro révèle à tous le dernier message non-visible de tous (caché/aveugle/privé)
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)
//

if(game.user.isGM) {
  let messages = game.messages.entries.filter( m => m.data.whisper.length || m.data.blind )
  if( messages.length ) {
    messages[messages.length-1].update({whisper: [], blind: false});
    ui.notifications.info("Le dernier message a été révélé !")
  } else {
    ui.notifications.warn("Aucun message à révéler !")
  }
}
