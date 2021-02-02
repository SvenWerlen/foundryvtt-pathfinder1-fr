Id: aXu88nmGVLqakW3T
Name: MJ - Afficher les richesses
Icon: icons/commodities/currency/coins-plain-stack-gold-yellow.webp
------------
///// INFORMATIONS
//
// Cette macro affiche dans le journal les richesses des personnages joueurs
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

// affichage des valeurs
function format(val) {
  if(val>=1000) return `${format(Math.round(val/1000))}k`
  return val
}

let content = "<tr><th></th><th>pp</th><th>po</th><th>pa</th><th>pb</th><th>équip</th><th>total</th></tr>"
let total = 0
actors.forEach( a => {
  const shortname = a.name.split(" ")[0]
  const pp = Number(getProperty(a.data, "data.currency.pp")) + Number(getProperty(a.data, "data.altCurrency.pp"))
  const po = Number(getProperty(a.data, "data.currency.gp")) + Number(getProperty(a.data, "data.altCurrency.gp"))
  const pa = Number(getProperty(a.data, "data.currency.sp")) + Number(getProperty(a.data, "data.altCurrency.sp"))
  const pc = Number(getProperty(a.data, "data.currency.cp")) + Number(getProperty(a.data, "data.altCurrency.cp"))
  let itemVal = 0
  a.items.forEach( i => {
    if(i.data.data.price) {
      if(i.data.data.uses.max > 0) {
        itemVal += Math.round(Number(getProperty(i.data, "data.price")) * i.data.data.uses.value / i.data.data.uses.max)
      } else {
        itemVal += getProperty(i.data, "data.quantity") * Number(getProperty(i.data, "data.price"))
      }
    }
  })
  const totalActor = itemVal + pp*10 + po + pa/10 + pc/100
  total += totalActor
  content += `<tr><th>${shortname}</th><td>${format(pp)}</td><td>${format(po)}</td><td>${format(pa)}</td><td>${format(pc)}</td><td>${format(itemVal)}</td><th>${format(totalActor)}</th></tr>`
})


let data = {
   flavor: "Richesses",
   content: `<table>${content}</table>Total : ${format(total)}`
}

if(game.settings.get("core", "rollMode") != "roll") {
   data['whisper'] = ChatMessage.getWhisperRecipients("GM")
   data['blind'] = true
}

ChatMessage.create(data);
