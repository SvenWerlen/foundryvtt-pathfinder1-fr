Id: 3iI3VmKWIL1kNQiX
Name: MJ - Afficher les effets actifs
Icon: systems/pf1/icons/spells/heal-royal-1.jpg
------------
///// INFORMATIONS
//
// Cette macro affiche dans le journal tous les effets actifs des joueurs
//
// Base : Foundry VTT (0.7.9)
// Système : Pathfinder 1 (0.77.2)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// CONFIG

// SCRIPT

let actorIds = []
game.users.forEach( function(u) { if( !u.isGM ) { actorIds.push(u.data.character) } } )
const actors = game.actors.filter( a => actorIds.indexOf( a.id ) >= 0 )

let content = ""
let nothing = true
actors.forEach( a => {
  const shortname = a.name.split(" ")[0]
  const effects = a.items.filter( e => e.type == "buff" && getProperty(e.data, "data.active" ));
  if(effects.length > 0) {
    nothing = false
    const buffs = effects.map(function(b){ return b.name;}).join(", ")
    content += `<li><b>${shortname}</b> : ${buffs}</li>`
  }
})

if( !nothing ) {
  let data = {
    flavor: "Effets actifs. Veuillez vérifier!",
    content: `<ul>${content}</ul>`
  }

  if(game.settings.get("core", "rollMode") != "roll") {
    data['whisper'] = ChatMessage.getWhisperRecipients("GM")
    data['blind'] = true
  }

  ChatMessage.create(data);
} else {
  ui.notifications.warn("Aucun effect actif !")
}
