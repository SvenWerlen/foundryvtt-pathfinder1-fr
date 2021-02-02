Id: OzMq6G3IsepKW8Ir
Name: MJ - Afficher PV, CA, Perception
Icon: systems/pf1/icons/feats/armor-proficiency-heavy.png
------------
///// INFORMATIONS
//
// Cette macro affiche dans le journal les propriétés les plus fréquemment consultées
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

let content = "<tr><th></th><th>Vit.</th><th>PV</th><th>CA</th><th>co</th><th>dé</th><th>Per</th></tr>"
actors.forEach( a => {
  const shortname = a.name.split(" ")[0]
  let speed = Number(getProperty(a.data, "data.attributes.speed.land.total"))
  const ac = getProperty(a.data, "data.attributes.ac")
  const hp = getProperty(a.data, "data.attributes.hp.value")
  const per = getProperty(a.data, "data.skills.per.mod")
  speed = speed == 5 ? 4 : speed
  content += `<tr><th>${shortname}</th><td>${speed}c</td><td>${hp}</td><th>${ac.normal.total}</th><td>${ac.touch.total}</td><td>${ac.flatFooted.total}</td><td>${per}</td></tr>`
})

let data = {
   flavor: "Vitesse, perception, points de vie, classe d'armure",
   content: `<table>${content}</table>`
}

if(game.settings.get("core", "rollMode") != "roll") {
   data['whisper'] = ChatMessage.getWhisperRecipients("GM")
   data['blind'] = true
}

ChatMessage.create(data);
