Id: Xt3x7zTVYK4ux8cQ
Name: Annoncer l'utilisation d'une aptitude/sort
Icon: systems/pf1/icons/items/inventory/lute.jpg
------------
///// INFORMATIONS
//
// Cette macro permet de réduire le # de préparation restante pour un sort de 1 et
// afficher un message à tous. La macro est préconfigurée pour la représentation bardique
// (configurée en tant que spell-like). À adapter selon les besoins.
//
// Base : Foundry VTT (0.7.8)
// Système : Pathfinder 1 (0.76.8)
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const ABNAME = "Représentation bardique"
const MESSAGE = 
  "<p>Effets magiques activés (## tours restants)</p>" + 
  "<p>@Macro[effet]{Appliquer \"Inspiration vaillante\" au 1 }</p>"

///// SCRIPT
let actors = MacrosPF1.getActors()
if(actors.length == 0) {
  ui.notifications.error("Veuillez choisir un personnage dans la scène!")
} else {

let actor = actors[0]
let item = actor.items.find( i => i.name == ABNAME )
if(item == null) {
  ui.notifications.error(`${actor.name} ne dispose pas de ${ABNAME}`)
} else {
  const prep = item.data.data.preparation
  if(prep.preparedAmount == 0) {
    ui.notifications.error(`${actor.name} ne peut plus utiliser ${ABNAME}`)
  } else {
    const update = { _id: item._id, data: { preparation : { preparedAmount : prep.preparedAmount -1 } } };
    actor.updateEmbeddedEntity("OwnedItem", update);
    ChatMessage.create({
      flavor: ABNAME,
      speaker: ChatMessage.getSpeaker(),
      content: MESSAGE.replace("##", prep.preparedAmount-1 )
    });
  }
}
}
