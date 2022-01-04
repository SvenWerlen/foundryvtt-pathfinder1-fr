Id: 9dfM0ZZ87QjUZY2l
Name: Compendium - Bestiaire
Icon: icons/environment/creatures/gargoyle-grey-stone.webp
------------
///// INFORMATIONS
//
// Cette macro permet de créer ou mettre à jour les données du bestiaire
//
// Base : Foundry VTT (0.7.7)
// Système : Pathfinder 1 (0.77.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION

const PACKNAME = "Bestiaire"
const PACKTYPE = "Actor"
const PACKCOLL = "world.bestiaire"
const URL      = "https://boisdechet.org/fvtt/data/bestiary-fr.txt"

//// SCRIPT
// ugly fix : get class from existing actor
let actorClass = null
for(const a of game.actors) {
  actorClass = a.constructor
  break;
}

async function process(withImages = true) {
  const MSG = "Importation des créatures"

  let response = await fetch(URL);
  if (response.ok) { // if HTTP-status is 200-299
    let pack = game.packs.find(p => p.metadata.label === PACKNAME);
    // create compendium if doesn't exist
    if(!pack) {
      pack = await CompendiumCollection.createCompendium({ collection: PACKCOLL, label: PACKNAME, entity: PACKTYPE })
      MacrosPF1.hideENCompendiums()
    }
    const index = await pack.getIndex()

    // get the response body & import
    SceneNavigation.displayProgressBar({label: "Téléchargement", pct: 0})
    const text = await response.text()
    const lines = text.split("\n");
    let idx = 0;
    let list = {}
    for(const line of lines) {
      if(line.length == 0) continue
      const data = JSON.parse(line)
      if(!withImages) {
        if(data.img) data.img = "icons/svg/mystery-man.svg"
        if(data.img && data.token && data.token.img) data.token.img = "icons/svg/mystery-man.svg"
      }
      list[data._id] = data
    }
    for(const k of Object.keys(list)) {
      SceneNavigation.displayProgressBar({label: MSG, pct: Math.round((idx++ / lines.length)*100)})
      const data = list[k]
      const found = index.find(e => e.name === data.name);
      if(found) {
        //data._id = found._id
        //await pack.importDocument(data);
        console.log(`PF1-fr | ${data.name} existant. Ignoré!`)
      }
      else {
        const actor = await new actorClass(data, {pack: pack})
        await pack.importDocument(actor);
        console.log(`PF1-fr | Ajout de ${data.name}`)
      }
    }
    SceneNavigation.displayProgressBar({label: "Import complété!", pct: 100})

  } else {
    alert("HTTP-Error: " + response.status);
  }
}

const html = `<p>Cette macro génère un compendium <em>${PACKNAME}</em> dans votre monde. Les données sont téléchargées depuis Internet.<ul><li>Si le compendium existe déjà, les monstres manquants seront ajoutés. Les monstres existants seront ignorés.</li><li>Si le compendium n'existe déjà, il sera créé automatiquement.</li><li>Les images NE sont PAS fournies (pour des raisons de droits d'auteur). Vous devez vous les procurer vous-même. Renseignez-vous sur <a href="https://discord.gg/pPSDNJk">Discord</a>. En cas de doute, choisissez l'option "Sans images".</li><li>Le processus peut prendre plusieurs minutes. Attendre la fin de l'import avant d'accéder au compendium ou relancer la macro!</li></ul></p>`

let buttons = {
  withImg: {
    icon: '<i class="fas fa-file-import fa-fw"></i>',
    label: "Avec images",
    callback: () => { process(true) }
  },
  withoutImg: {
    icon: '<i class="fas fa-file-import fa-fw"></i>',
    label: "Sans images",
    callback: () => { process(false) }
  }
}

new Dialog({
    title: "Mise à jour du bestiaire",
    content: html,
    buttons: buttons,
  }).render(true);
