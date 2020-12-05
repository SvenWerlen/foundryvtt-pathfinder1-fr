Id: s16XixMjKJcJYR7t
Name: Mettre à jour les descriptions
Icon: systems/pf1/icons/skills/blue_18.jpg
------------
///// INFORMATIONS
//
// Cette macro met à jour les descriptions de tous les éléments du personnage 
// (race, classe, dons, aptitudes, traits, sorts) à partir des versions des
// compendiums de `pf1-fr`.
// Ne met pas à jour l'équipement.
//
// Base : Foundry VTT (0.7.7)
// Système : Pathfinder 1 (0.76.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// 1 = remplacer par la description complète
// 2 = remplacer par un lien vers l'item dans le compendium
const CONFIG = 2


// SCRIPT

async function updateItems(actor, items, compendium) {
  const pack = game.packs.get(compendium)
  const index = await pack.getIndex()
  let updates = []
  for(let e=0; e<items.length; e++) {
    const item = items[e]
    const found = index.find( idx => idx.name == item.name )
    if( found ) { 
      const el = await pack.getEntity(found._id)
      let link = `@Compendium[${compendium}.${found._id}]{${found.name}}`
      if( CONFIG == 1 ) {
        if( el.type == "spell" ) {
          updates.push( { _id: item._id, data: { shortDescription: getProperty(el.data, "data.shortDescription") } } ) 
        } else {
          updates.push( { _id: item._id, data: { description: { value: getProperty(el.data, "data.description.value") } } } ) 
        }
      } else {
        if( el.type == "spell" ) {
          updates.push( { _id: item._id, data: { shortDescription: link } } ) 
        } else {
          updates.push( { _id: item._id, data: { description: { value: link } } } ) 
        }
      }
    }
  }
  return updates
}


let actors = MacrosPF1.getActors()

if (actors.length < 1) { 
  ui.notifications.error("Veuillez choisir un personnage dans la scène!")
} else {
  let actor = actors[0]

  Dialog.confirm({
    title: "Mise à jour des descriptions",
    content: `Les descriptions de tous les éléments (race, classe, dons, aptitudes, traits et sorts) du personnage <b>${actor.name}</b> seront mise à jour à partir des compendiums. Tout changement manuel à ces descriptions sera perdu. <br/><br/><i>ATTENTION: un bogue non-identifié dans Foundry pourrait engendrer une fuite de mémoire suite à la mise à jour et nécessiter un redémarrage du serveur/application!!</i><br/><br/> Voulez-vous continuer?`,
      yes: function() {

        let promises = []
        let items = actor.items.filter( i => i.type == "race" )
        promises = promises.concat( updateItems(actor, items, "pf1-fr.racesfr") )

        items = actor.items.filter( i => i.type == "class" )
        promises = promises.concat( updateItems(actor, items, "pf1-fr.classesfr"))

        items = actor.items.filter( i => i.type == "feat" && getProperty(i.data, "data.featType") == "feat" )
        promises = promises.concat( updateItems(actor, items, "pf1-fr.featsfr"))

        items = actor.items.filter( i => i.type == "feat" && getProperty(i.data, "data.featType") == "classFeat" )
        promises = promises.concat( updateItems(actor, items, "pf1-fr.classfeaturesfr"))

        items = actor.items.filter( i => i.type == "feat" && ( getProperty(i.data, "data.featType") == "trait" || getProperty(i.data, "data.featType") == "racial" ))
        promises = promises.concat( updateItems(actor, items, "pf1-fr.traitsfr"))

        items = actor.items.filter( i => i.type == "spell" )
        promises = promises.concat( updateItems(actor, items, "pf1-fr.spellsfr"))

        Promise.all(promises).then( p => {
          let updates = []
          p.forEach( el => { 
            if( Array.isArray(el) ) updates = updates.concat(el)
            else updates.push(el)
          })
          actor.updateEmbeddedEntity("OwnedItem", updates);
          ui.notifications.info(`${updates.length} descriptions mises à jour!`)
        });
      },
      no: () => {}
  });
}
